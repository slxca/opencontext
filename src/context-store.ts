import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { CONTEXT_DIRECTORY_NAME, UserInputError, isNodeError } from "./types.js";
import { validateTopic } from "./validation.js";

export class ContextStore {
  constructor(private readonly basePath: string = process.cwd()) {}

  public getContextDirectory(): string {
    return path.join(this.basePath, CONTEXT_DIRECTORY_NAME);
  }

  public getTopicFilePath(topic: string): string {
    return path.join(this.getContextDirectory(), `${topic}.md`);
  }

  public async saveContext(topicInput: string, content: string): Promise<string> {
    const topic = validateTopic(topicInput);
    const contextDirectory = this.getContextDirectory();
    const filePath = this.getTopicFilePath(topic);

    await mkdir(contextDirectory, { recursive: true });
    await writeFile(filePath, content, "utf8");

    return `Saved context topic "${topic}" to ${CONTEXT_DIRECTORY_NAME}/${topic}.md.`;
  }

  public async readContext(topicInput?: string): Promise<string> {
    if (topicInput !== undefined) {
      const topic = validateTopic(topicInput);

      try {
        return await readFile(this.getTopicFilePath(topic), "utf8");
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
