import type { ConfigStatus } from "../shared/types.js";

/**
 * Prints a step indicator to stderr.
 * @param label - Step label
 * @param done - Whether to show a checkmark (done) or spinner text
 */
export function printStep(label: string, done = true): void {
  const icon = done ? "\x1b[32m✓\x1b[0m" : "\x1b[36m●\x1b[0m";
  process.stderr.write(`  ${icon} ${label}\n`);
}

/** Maps a config result to a terminal status icon. */
function statusIcon(status: ConfigStatus): string {
  switch (status) {
    case "created":
      return "\x1b[32m✓\x1b[0m";
    case "updated":
      return "\x1b[33m~ \x1b[0m";
    case "unchanged":
      return "\x1b[36m✓\x1b[0m";
    case "skipped":
      return "\x1b[90m-\x1b[0m";
  }
}

/** Prints a config/generation result line to stderr. */
export function printResult(status: ConfigStatus | "invalid", message: string): void {
  const icon = status === "invalid" ? "\x1b[31m!\x1b[0m" : statusIcon(status);
  process.stderr.write(`  ${icon} ${message}\n`);
}