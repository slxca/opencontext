import { mkdir, readdir, readFile, writeFile, stat, lstat, unlink } from "node:fs/promises";
import * as path from "node:path";
import { INDEX_FILENAME, UserInputError, isNodeError, STATUS_BADGES, type TopicFrontmatter, type TopicStatus } from "./types.js";
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

    // Reject writes to existing symlinks — prevents symlink traversal attacks
    try {
      const fileStat = await lstat(filePath);
      if (fileStat.isSymbolicLink()) {
        throw new UserInputError(
          `Refusing to overwrite symlink at ${this.config.path}/${topic}.md. Delete the symlink first.`,
        );
      }
    } catch (error) {
      if (isNodeError(error) && error.code === "ENOENT") {
        // File does not exist yet — normal case, continue
      } else {
        throw error;
      }
    }

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

    if (!this.config.autoIndex) {
      return topics.map((t) => `- ${t}`).join("\n");
    }

    return this.rebuildContextIndex();
  }

  /**
   * Deletes a context topic file from the context directory.
   * @param topicInput - Topic name to delete
   * @returns Success message with confirmation
   * @throws UserInputError if topic doesn't exist or is invalid
   */
  public async deleteContext(topicInput: string): Promise<string> {
    const topic = validateTopic(topicInput);
    const filePath = sanitizeTopicPath(this.contextDir, topic);

    try {
      await unlink(filePath);
    } catch (error) {
      if (isNodeError(error) && error.code === "ENOENT") {
        throw new UserInputError(
          `No context found for topic "${topic}" at ${this.config.path}/${topic}.md.`,
        );
      }
      throw error;
    }

    if (this.config.autoIndex) {
      await this.rebuildContextIndex();
    }

    return `Deleted context topic "${topic}" from ${this.config.path}/${topic}.md.`;
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
   * Parses YAML frontmatter from markdown content.
   * Returns extracted fields or empty object if no frontmatter found.
   * Uses simple line-by-line parsing — no external YAML dependency.
   */
  private parseFrontmatter(content: string): TopicFrontmatter {
    const trimmed = content.trim();
    if (!trimmed.startsWith("---")) {
      return {};
    }

    const endIdx = trimmed.indexOf("---", 3);
    if (endIdx === -1) {
      return {};
    }

    const block = trimmed.slice(3, endIdx);
    const result: TopicFrontmatter = {};

    for (const line of block.split("\n")) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith("#")) continue;

      const colonIdx = trimmedLine.indexOf(":");
      if (colonIdx === -1) continue;

      const key = trimmedLine.slice(0, colonIdx).trim();
      let value = trimmedLine.slice(colonIdx + 1).trim();

      // Strip surrounding quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (key === "description") {
        result.description = value;
      } else if (
        key === "status" &&
        (value === "active" || value === "deprecated" || value === "superseded")
      ) {
        result.status = value;
      } else if (key === "supersedes") {
        result.supersedes = value;
      } else if (key === "superseded_by") {
        result.superseded_by = value;
      }
    }

    return result;
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

    // Use structured frontmatter parser
    const fm = this.parseFrontmatter(content);
    if (fm.description) {
      return fm.description.slice(0, 120);
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
      status: TopicStatus | undefined;
      supersedes: string | undefined;
      superseded_by: string | undefined;
    }> = [];

    for (const entry of topicFiles) {
      const filePath = path.join(this.contextDir, entry.name);
      const content = await readFile(filePath, "utf8");
      const fileStat = await stat(filePath);
      const topic = entry.name.slice(0, -".md".length);
      const description = this.extractDescription(content);
      const date = fileStat.mtime.toISOString().slice(0, 10);
      const sizeBytes = Buffer.byteLength(content, "utf8");
      const fm = this.parseFrontmatter(content);

      topicEntries.push({
        topic,
        filename: entry.name,
        description,
        date,
        sizeBytes,
        status: fm.status,
        supersedes: fm.supersedes,
        superseded_by: fm.superseded_by,
      });
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
      const badge = t.status && t.status !== "active"
        ? ` ${STATUS_BADGES.get(t.status) ?? `[${t.status.toUpperCase()}]`}`
        : "";
      const supersedesNote = t.supersedes
        ? ` (supersedes: \`${t.supersedes}\`)`
        : "";
      const supersededByNote = t.superseded_by
        ? ` (superseded by: \`${t.superseded_by}\`)`
        : "";
      lines.push(`- **${t.topic}**${badge} (\`${t.filename}\`) - Updated: ${t.date} (${sizeStr})${supersedesNote}${supersededByNote}`);
      lines.push(`  > ${t.description}`);
    }

    lines.push("");
    lines.push("---");
    lines.push("*To read a specific context topic, call `read_context` with the topic name.*");
    lines.push("");
    lines.push("*OpenContext is open-source. Consider starring on [GitHub](https://github.com/slxca/opencontext).*");

    const indexContent = lines.join("\n");
    const indexPath = path.join(this.contextDir, INDEX_FILENAME);
    await writeFile(indexPath, indexContent, "utf8");

    return indexContent;
  }
}
