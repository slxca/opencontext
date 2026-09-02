/** MCP server identifier used in protocol handshakes. */
export const SERVER_NAME = "opencontext-mcp";

/** Current server version for compatibility checks. */
export const SERVER_VERSION = "1.2.1";

/** Filename for the auto-generated context index. */
export const INDEX_FILENAME = "index.md";

/** Topic names reserved by the system — cannot be written by external agents. */
export const RESERVED_TOPICS: ReadonlySet<string> = new Set(["index"]);

/** Allowed values for the topic status field in YAML frontmatter. */
export type TopicStatus = "active" | "deprecated" | "superseded";

/** Parsed YAML frontmatter from a topic file. All fields optional. */
export interface TopicFrontmatter {
  description?: string;
  status?: TopicStatus;
  /** The topic this one replaces (used by the newer topic). */
  supersedes?: string;
  /** The topic that replaced this one (used by the older topic). */
  superseded_by?: string;
}

/** Badge prefix used in index.md for non-active topics. */
export const STATUS_BADGES: ReadonlyMap<TopicStatus, string> = new Map([
  ["deprecated", "[DEPRECATED]"],
  ["superseded", "[SUPERSEDED]"],
]);

/**
 * Regex pattern for validating topic names.
 * Allows lowercase alphanumeric with single hyphens or underscores as separators.
 * Examples: "api_contracts", "auth-rules", "migration-v2"
 */
export const TOPIC_PATTERN = /^[a-z0-9]+(?:[_-][a-z0-9]+)*$/;

/**
 * Custom error class for user input validation errors.
 * Thrown when topic names, content, or other user inputs fail validation.
 */
export class UserInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserInputError";
  }
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

/**
 * Safely extracts error message from unknown error types.
 * Handles Error objects, strings, and unknown values.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred.";
}

/**
 * Type guard to check if an error is a Node.js filesystem error.
 * Useful for handling ENOENT, EACCES, etc. from fs operations.
 */
export function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}
