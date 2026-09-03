/** MCP server identifier used in protocol handshakes. */
export const SERVER_NAME = "opencontext-mcp";

/** Current server version for compatibility checks. */
export const SERVER_VERSION = "1.2.1";

/** Filename for the auto-generated context index. */
export const INDEX_FILENAME = "index.md";

/** Package name published on npm, launched via npx in generated configs. */
export const OPENCONTEXT_MCP_PACKAGE = "opencontext-mcp";

/** Default host the HTTP(S) server binds to. */
export const DEFAULT_HTTP_HOST = "127.0.0.1";

/** Default port the HTTP(S) server listens on. */
export const DEFAULT_HTTP_PORT = 3032;

/** Topic names reserved by the system — cannot be written by external agents. */
export const RESERVED_TOPICS: ReadonlySet<string> = new Set(["index"]);

/**
 * Allowed values for the topic status field in YAML frontmatter.
 * Kept next to the badges so both stay in sync.
 */
export type TopicStatus = "active" | "deprecated" | "superseded";

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