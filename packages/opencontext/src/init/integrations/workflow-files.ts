import { readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";
import { isNodeError } from "../../shared/errors.js";
import type { ConfigStatus } from "../../shared/types.js";

/** AGENTS.md — auto-read by OpenCode (and most agent tools). */
export const AGENTS_FILENAME = "AGENTS.md";

/** CLAUDE.md — auto-read by Claude Code. */
export const CLAUDE_FILENAME = "CLAUDE.md";

/** Marker delimiting the managed OpenContext section inside workflow files. */
export const SECTION_START = "<!-- OPENCONTEXT:START -->";
export const SECTION_END = "<!-- OPENCONTEXT:END -->";

export interface WorkflowFileResult {
  status: ConfigStatus;
  message: string;
}

/** Returns the current OpenContext workflow section for AGENTS.md / CLAUDE.md. */
export function workflowSection(): string {
  return `${SECTION_START}
## OpenContext Workflow

OpenContext stores durable project memory as markdown files in \`.opencontext/\`. Check it before and after structural work.

- Before making structural code changes, run \`read_context\` to inspect existing project topics and architectural decisions.
- Whenever a new architectural convention, database schema, or API rule is established or refactored, call \`save_context\` with a concise, topic-scoped markdown summary. Use YAML frontmatter (\`status\`, \`supersedes\`) when updating conventions to track lifecycle changes.
- When a topic becomes obsolete, call \`delete_context\` to remove it. For deprecated topics that should remain visible, set \`status: deprecated\` or \`status: superseded\` in the frontmatter instead of deleting.
${SECTION_END}`;
}

/**
 * Ensures a workflow file (AGENTS.md / CLAUDE.md) carries the current
 * OpenContext section. Existing files are extended, never overwritten: the
 * section is inserted between the OPENCONTEXT markers when present, or
 * appended otherwise. All other content is preserved.
 * @param targetDir - Project root directory
 * @param filename - Workflow file name (AGENTS.md or CLAUDE.md)
 */
export async function upsertWorkflowFile(
  targetDir: string,
  filename: string,
): Promise<WorkflowFileResult> {
  const filePath = path.join(targetDir, filename);
  const section = workflowSection();

  let existing: string;
  try {
    existing = await readFile(filePath, "utf8");
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      await writeFile(filePath, `${section}\n`, "utf8");
      return {
        status: "created",
        message: `${filename} created with the OpenContext workflow.`,
      };
    }
    throw error;
  }

  const startIdx = existing.indexOf(SECTION_START);
  const endIdx = existing.indexOf(SECTION_END);

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    // Replace the managed section with the current content.
    const updated = `${existing.slice(0, startIdx)}${section}${existing.slice(endIdx + SECTION_END.length)}`;
    if (updated === existing) {
      return {
        status: "unchanged",
        message: `${filename} — OpenContext workflow is up to date.`,
      };
    }
    await writeFile(filePath, updated, "utf8");
    return {
      status: "updated",
      message: `${filename} — OpenContext workflow updated.`,
    };
  }

  // No managed section yet — append it, preserving the existing content.
  const trimmed = existing.replace(/\s*$/, "");
  const updated = `${trimmed}\n\n${section}\n`;
  await writeFile(filePath, updated, "utf8");
  return {
    status: "updated",
    message: `${filename} — OpenContext workflow added.`,
  };
}