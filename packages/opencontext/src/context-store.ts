import { mkdir, readdir, readFile, writeFile, stat } from "node:fs/promises";
import * as path from "node:path";
import { INDEX_FILENAME, UserInputError, isNodeError } from "./types.js";
import { validateTopic, validateWritePayload, sanitizeTopicPath } from "./validation.js";
import { type ResolvedConfig, DEFAULT_CONFIG } from "./config.js";

/**
 * Manages context file storage operations.
 * Handles reading, writing, and listing context files in the configured directory.
 */
export class ContextStore {
  private readonly contextDir: string;

  constructor(
    private readonly basePath: string = process.cwd(),
    private readonly config: ResolvedConfig = DEFAULT_CONFIG,
  ) {
    this.contextDir = path.join(this.basePath, this.config.path);
  }

  /** Returns the absolute path to the context directory. */
  public getContextDirectory(): string {
    return this.contextDir;
  }

  /** Returns the absolute path to a topic file. */
  public getTopicFilePath(topic: string): string {
    return path.join(this.contextDir, `${topic}.md`);
  }

  /**
   * Saves context content to a topic file.
   * Validates payload using WriteGuard before writing.
   * @param topicInput - Topic name (will be validated and trimmed)
   * @param content - Markdown content to save
   * @returns Success message with file location
   * @throws UserInputError if validation fails
   */
  public async saveContext(topicInput: string, content: string): Promise<string> {
    const guardResult = validateWritePayload(topicInput, content, {
      maxFileSizeKb: this.config.guard.maxFileSizeKb as number,
      strictPatternCheck: this.config.guard.strictPatternCheck as boolean,
    });
    if (!guardResult.allowed) {
      console.error(`WriteGuard Rejected: ${guardResult.reason} (Code: ${guardResult.code})`);
      throw new UserInputError(`WriteGuard Rejected: ${guardResult.reason} (Code: ${guardResult.code})`);
    }

    const topic = validateTopic(topicInput);
    const filePath = sanitizeTopicPath(this.contextDir, topic);

    await mkdir(this.contextDir, { recursive: true });
    await writeFile(filePath, content, "utf8");

    return `Saved context topic "${topic}" to ${this.config.path}/${topic}.md.`;
  }

  /**
   * Reads context content from a topic file, or lists all topics if none specified.
   * @param topicInput - Optional topic name to read
   * @returns Topic content or list of available topics
   * @throws UserInputError if topic doesn't exist or is invalid
   */
  public async readContext(topicInput?: string): Promise<string> {
    if (topicInput !== undefined) {
      const topic = validateTopic(topicInput);

      try {
        const filePath = sanitizeTopicPath(this.contextDir, topic);
        return await readFile(filePath, "utf8");
      } catch (error) {
        if (isNodeError(error) && error.code === "ENOENT") {
          throw new UserInputError(
            `No context found for topic "${topic}" at ${this.config.path}/${topic}.md.`,
          );
        }

        throw error;
      }
    }

    const topics = await this.listTopics();

    if (topics.length === 0) {
      return `No OpenContext topics found in ${this.config.path}/. Use save_context to create one.`;
    }

    return this.rebuildContextIndex();
  }

  /**
   * Lists all available context topics.
   * Scans the context directory for .md files and returns sorted topic names.
   * @returns Sorted array of topic names
   */
  public async listTopics(): Promise<string[]> {
    try {
      const entries = await readdir(this.contextDir, { withFileTypes: true });

      return entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
        .map((entry) => entry.name.slice(0, -".md".length))
        .sort((a, b) => a.localeCompare(b));
    } catch (error) {
      if (isNodeError(error) && error.code === "ENOENT") {
        return [];
      }

      throw error;
    }
  }

  /**
   * Extracts a short description from markdown content.
   * Strategy: frontmatter description → first heading → first paragraph → fallback.
   * @param content - Raw markdown content
   * @returns Truncated description (max 120 chars)
   */
  private extractDescription(content: string): string {
    const trimmed = content.trim();
    if (!trimmed) {
      return "No summary available.";
    }

    // Strategy A: YAML frontmatter with description key
    if (trimmed.startsWith("---")) {
      const endIdx = trimmed.indexOf("---", 3);
      if (endIdx !== -1) {
        const frontmatter = trimmed.slice(3, endIdx);
        const descMatch = frontmatter.match(/description:\s*["']?(.+?)["']?\s*$/m);
        if (descMatch?.[1]) {
          return descMatch[1].slice(0, 120);
        }
      }
    }

    const lines = trimmed.split("\n");

    // Strategy B: First heading
    for (const line of lines) {
      const headingMatch = line.match(/^#\s+(.+)$/);
      if (headingMatch?.[1]) {
        return headingMatch[1].slice(0, 120);
      }
    }

    // Strategy C: First non-empty paragraph line
    for (const line of lines) {
      const stripped = line.trim();
      if (stripped && !stripped.startsWith("#")) {
        return stripped.length > 120 ? stripped.slice(0, 120) + "..." : stripped;
      }
    }

    return "No summary available.";
  }

  /**
   * Rebuilds the auto-generated index.md file in the context directory.
   * Scans all topic files, extracts metadata, and writes a compact index.
   * @returns The generated index markdown content
   */
  public async rebuildContextIndex(): Promise<string> {
    let entries;
    try {
      entries = await readdir(this.contextDir, { withFileTypes: true });
    } catch (error) {
      if (isNodeError(error) && error.code === "ENOENT") {
        return "";
      }
      throw error;
    }

    const topicFiles = entries
      .filter(
        (entry) =>
          entry.isFile() &&
          entry.name.endsWith(".md") &&
          entry.name !== INDEX_FILENAME &&
          entry.name !== "README.md",
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    if (topicFiles.length === 0) {
      return "";
    }

    const topicEntries: Array<{
      topic: string;
      filename: string;
      description: string;
      date: string;
      sizeBytes: number;
    }> = [];

    for (const entry of topicFiles) {
      const filePath = path.join(this.contextDir, entry.name);
      const content = await readFile(filePath, "utf8");
      const fileStat = await stat(filePath);
      const topic = entry.name.slice(0, -".md".length);
      const description = this.extractDescription(content);
      const date = fileStat.mtime.toISOString().slice(0, 10);
      const sizeBytes = Buffer.byteLength(content, "utf8");

      topicEntries.push({ topic, filename: entry.name, description, date, sizeBytes });
    }

    const lines: string[] = [
      "# Project Context Index",
      "<!-- AUTO-GENERATED BY OPENCONTEXT - DO NOT EDIT MANUALLY -->",
      "",
      "Available context topics in this project:",
      "",
    ];

    for (const t of topicEntries) {
      const sizeStr = t.sizeBytes >= 1024
        ? `${(t.sizeBytes / 1024).toFixed(1)} KB`
        : `${t.sizeBytes} B`;
      lines.push(`- **${t.topic}** (\`${t.filename}\`) - Updated: ${t.date} (${sizeStr})`);
      lines.push(`  > ${t.description}`);
    }

    lines.push("");
    lines.push("---");
    lines.push("*To read a specific context topic, call `read_context` with the topic name.*");
    lines.push("");

    const indexContent = lines.join("\n");
    const indexPath = path.join(this.contextDir, INDEX_FILENAME);
    await writeFile(indexPath, indexContent, "utf8");

    return indexContent;
  }
}
