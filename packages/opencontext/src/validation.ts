import { TOPIC_PATTERN, UserInputError } from "./types.js";

export function validateTopic(topicInput: string): string {
  const topic = topicInput.trim();

  if (!TOPIC_PATTERN.test(topic)) {
    throw new UserInputError(
      "Topic must be snake_case or kebab-case using lowercase letters, numbers, underscores, or hyphens.",
    );
  }

  return topic;
}
