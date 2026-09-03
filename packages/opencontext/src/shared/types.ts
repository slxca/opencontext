import type { TopicStatus } from "./constants.js";

/** Outcome of a config/file upsert, used for user-facing status output. */
export type ConfigStatus = "created" | "updated" | "unchanged" | "skipped";

/** Result of writing or updating an agent integration config file. */
export interface ConfigWriteResult {
  status: ConfigStatus;
  message: string;
}

/** Parsed YAML frontmatter from a topic file. All fields optional. */
export interface TopicFrontmatter {
  description?: string;
  status?: TopicStatus;
  /** The topic this one replaces (used by the newer topic). */
  supersedes?: string;
  /** The topic that replaced this one (used by the older topic). */
  superseded_by?: string;
}

/**
 * Creates a standardized MCP tool response object.
 * @param text - Response message
 * @param isError - Whether this is an error response (default: false)
 */
export function textResult(text: string, isError = false) {
  return {
    content: [
      {
        type: "text" as const,
        text,
      },
    ],
    ...(isError ? { isError: true } : {}),
  };
}