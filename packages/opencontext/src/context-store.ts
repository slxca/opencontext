import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { CONTEXT_DIRECTORY_NAME, UserInputError, isNodeError } from "./types.js";
import { validateTopic, validateWritePayload, sanitizeTopicPath } from "./validation.js";

/**
 * Manages context file storage operations.
 * Handles reading, writing, and listing context files in .opencontext/ directory.
 */
export class ContextStore {
  constructor(private readonly basePath: string = process.cwd()) {}

  /** Returns the absolute path to the .opencontext directory. */
  public getContextDirectory(): string {
    return path.join(this.basePath, CONTEXT_DIRECTORY_NAME);
  }

  /** Returns the absolute path to a topic file. */
  public getTopicFilePath(topic: string): string {
    return path.join(this.getContextDirectory(), `${topic}.md`);
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
    const guardResult = validateWritePayload(topicInput, content);
    if (!guardResult.allowed) {
      console.error(`WriteGuard Rejected: ${guardResult.reason} (Code: ${guardResult.code})`);
      throw new UserInputError(`WriteGuard Rejected: ${guardResult.reason} (Code: ${guardResult.code})`);
    }

    const topic = validateTopic(topicInput);
    const contextDirectory = this.getContextDirectory();
    const filePath = sanitizeTopicPath(this.basePath, topic);

    await mkdir(contextDirectory, { recursive: true });
    await writeFile(filePath, content, "utf8");

    return `Saved context topic "${topic}" to ${CONTEXT_DIRECTORY_NAME}/${topic}.md.`;
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
        const filePath = sanitizeTopicPath(this.basePath, topic);
        return await readFile(filePath, "utf8");
      } catch (error) {
        if (isNodeError(error) && error.code === "ENOENT") {
          throw new UserInputError(
            `No context found for topic "${topic}" at ${CONTEXT_DIRECTORY_NAME}/${topic}.md.`,
          );
        }

        throw error;
      }
    }

    const topics = await this.listTopics();

    if (topics.length === 0) {
      return `No OpenContext topics found in ${CONTEXT_DIRECTORY_NAME}/. Use save_context to create one.`;
    }

    return `Available OpenContext topics:\n\n${topics.map((topic) => `- ${topic}`).join("\n")}`;
  }

  /**
   * Lists all available context topics.
   * Scans .opencontext/ directory for .md files and returns sorted topic names.
   * @returns Sorted array of topic names
   */
  public async listTopics(): Promise<string[]> {
    try {
      const entries = await readdir(this.getContextDirectory(), { withFileTypes: true });

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
}
