import { mkdir, readdir, readFile, writeFile, lstat, unlink } from "node:fs/promises";
import * as path from "node:path";
import { UserInputError, isNodeError } from "../shared/errors.js";
import { validateTopic, sanitizeTopicPath } from "../validation/index.js";
import { validateWritePayload } from "../validation/write-guard.js";
import { buildContextIndex } from "./index-builder.js";
import { type ResolvedConfig, DEFAULT_CONFIG } from "../config/index.js";

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
   * Validates the payload using the write guard before writing.
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
   * Rebuilds the auto-generated index.md file in the context directory.
   * @returns The generated index markdown content
   */
  public async rebuildContextIndex(): Promise<string> {
    return buildContextIndex(this.contextDir);
  }
}