import { RESERVED_TOPICS, TOPIC_PATTERN } from "../shared/constants.js";

/**
 * Options for configuring write guard behavior.
 */
export interface GuardOptions {
  /** Maximum payload size in KB (default: 50 KB) */
  maxFileSizeKb?: number;
  /** Whether to allow empty content (default: false) */
  allowEmpty?: boolean;
  /** Whether to check for forbidden patterns (default: true) */
  strictPatternCheck?: boolean;
}

/**
 * Result of write guard validation.
 */
export interface GuardResult {
  /** Whether the write is allowed */
  allowed: boolean;
  /** Human-readable reason for rejection */
  reason?: string;
  /** Error code for programmatic handling */
  code?: "EMPTY_CONTENT" | "PAYLOAD_TOO_LARGE" | "INVALID_TOPIC" | "PATH_TRAVERSAL" | "FORBIDDEN_PATTERN" | "RESERVED_TOPIC";
}

/**
 * Forbidden patterns that indicate prompt injection attempts.
 * These are checked case-insensitively against the content.
 */
const FORBIDDEN_PATTERNS: RegExp[] = [
  /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
  /system\s*:\s*override/i,
  /bypass\s+(safety|guardrails?|system\s+prompt)/i,
];

/**
 * Validates a write payload for context storage.
 * Checks topic validity, content safety, size limits, and forbidden patterns.
 * @param topic - The topic name to validate
 * @param content - The content to validate
 * @param options - Optional configuration for validation behavior
 * @returns GuardResult indicating whether the write is allowed
 */
export function validateWritePayload(
  topic: string,
  content: string,
  options?: GuardOptions,
): GuardResult {
  const opts: Required<GuardOptions> = {
    maxFileSizeKb: options?.maxFileSizeKb ?? 50,
    allowEmpty: options?.allowEmpty ?? false,
    strictPatternCheck: options?.strictPatternCheck ?? true,
  };

  const trimmedTopic = topic.trim();
  if (!TOPIC_PATTERN.test(trimmedTopic)) {
    return {
      allowed: false,
      reason: "Topic must be snake_case or kebab-case using lowercase letters, numbers, underscores, or hyphens.",
      code: "INVALID_TOPIC",
    };
  }

  if (RESERVED_TOPICS.has(trimmedTopic)) {
    return {
      allowed: false,
      reason: `"${trimmedTopic}" is a reserved system topic and cannot be written directly.`,
      code: "RESERVED_TOPIC",
    };
  }

  if (!opts.allowEmpty && content.trim().length === 0) {
    return {
      allowed: false,
      reason: "Content must not be empty or consist solely of whitespace.",
      code: "EMPTY_CONTENT",
    };
  }

  // Convert KB to bytes for size comparison
  const maxBytes = opts.maxFileSizeKb * 1024;
  const contentBytes = Buffer.byteLength(content, "utf8");
  if (contentBytes > maxBytes) {
    return {
      allowed: false,
      reason: `Payload size (${contentBytes} bytes) exceeds maximum allowed size (${maxBytes} bytes).`,
      code: "PAYLOAD_TOO_LARGE",
    };
  }

  if (opts.strictPatternCheck) {
    for (const pattern of FORBIDDEN_PATTERNS) {
      if (pattern.test(content)) {
        return {
          allowed: false,
          reason: `Content contains forbidden pattern: ${pattern.source}`,
          code: "FORBIDDEN_PATTERN",
        };
      }
    }
  }

  return { allowed: true };
}