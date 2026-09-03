import * as path from "node:path";
import { TOPIC_PATTERN } from "../shared/constants.js";
import { UserInputError } from "../shared/errors.js";

/**
 * Validates a topic string for safe filesystem operations.
 * @param topicInput - The topic string to validate
 * @returns The trimmed, validated topic
 * @throws UserInputError if the topic is invalid
 */
export function validateTopic(topicInput: string): string {
  const topic = topicInput.trim();

  if (!TOPIC_PATTERN.test(topic)) {
    throw new UserInputError(
      "Topic must be snake_case or kebab-case using lowercase letters, numbers, underscores, or hyphens.",
    );
  }

  return topic;
}

/**
 * Sanitizes a topic path to prevent path traversal attacks.
 * Ensures the resolved path stays within the context directory.
 * @param contextDir - The absolute path to the context directory
 * @param topic - The topic name
 * @returns The sanitized absolute path to the topic file
 * @throws UserInputError if path traversal is detected
 */
export function sanitizeTopicPath(contextDir: string, topic: string): string {
  // Quick rejection of obvious path traversal attempts
  if (topic.includes("..") || path.isAbsolute(topic) || topic.startsWith(".") || topic.includes("/")) {
    throw new UserInputError("Path traversal detected: topic must not contain '..', '/', or absolute paths.");
  }

  const filePath = path.join(contextDir, `${topic}.md`);
  const resolvedPath = path.resolve(filePath);
  const resolvedContextDir = path.resolve(contextDir);

  // Double-check resolved path is still within .opencontext directory
  if (!resolvedPath.startsWith(resolvedContextDir + path.sep) && resolvedPath !== resolvedContextDir) {
    throw new UserInputError("Path traversal detected: topic must not contain '..' or absolute paths.");
  }

  return resolvedPath;
}