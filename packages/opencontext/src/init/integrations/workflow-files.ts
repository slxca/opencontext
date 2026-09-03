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
  return `
${SECTION_START}
## CRITICAL MEMORY SYSTEM: OpenContext Protocol

You have access to persistent project context via OpenContext MCP tools (\`.opencontext/\`). Adherence to this protocol is mandatory for consistency across sessions.

### 1. Mandatory Pre-Flight: Inspect Context
Before editing, refactoring, or generating code that affects:
- Architecture, module boundaries, or dependency graph
- Database schemas, migrations, or models
- API contracts, route handlers, or DTOs
- Authentication, authorization, or security rules

**Action Required:** Execute \`read_context\` FIRST to check existing conventions, past design decisions, and project rules. Do NOT assume architectural patterns without reading relevant context topics.

### 2. Post-Implementation: Persist Changes
Immediately after introducing, altering, or deprecating conventions, run the corresponding OpenContext tool:

* **Save/Update (\`save_context\`):**
  - **When:** You add or change an architectural pattern, schema, shared utility rule, or tech stack decision.
  - **Format:** Concise, topic-scoped Markdown summary.
  - **Lifecycle Frontmatter:** When updating an existing convention, you MUST include YAML frontmatter:
    \`\`\`yaml
    ---
    status: active | superseded | deprecated
    supersedes: previous_topic_slug
    ---
    \`\`\`
* **Deprecate vs. Delete (\`delete_context\`):**
  - Use \`status: deprecated\` or \`status: superseded\` in YAML frontmatter if historical context is valuable.
  - Call \`delete_context\` ONLY when a topic is fully obsolete or entirely removed from the codebase.

### 3. Execution Rules
- **Never skip:** Do not bypass \`read_context\` on multi-file or cross-cutting tasks to save tokens.
- **Fail-safe:** If unsure whether an architectural decision exists, invoke \`read_context\` before taking action.
${SECTION_END}
  `;
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