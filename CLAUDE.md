<!-- OPENCONTEXT:START -->
## CRITICAL MEMORY SYSTEM: OpenContext Protocol

You have access to persistent project context via OpenContext MCP tools (`.opencontext/`). Adherence to this protocol is mandatory for consistency across sessions.

### 1. Mandatory Pre-Flight: Inspect Context
Before editing, refactoring, or generating code that affects:
- Architecture, module boundaries, or dependency graph
- Database schemas, migrations, or models
- API contracts, route handlers, or DTOs
- Authentication, authorization, or security rules

**Action Required:** Execute `read_context` FIRST to check existing conventions, past design decisions, and project rules. Do NOT assume architectural patterns without reading relevant context topics.

### 2. Post-Implementation: Persist Changes
Immediately after introducing, altering, or deprecating conventions, run the corresponding OpenContext tool:

* **Save/Update (`save_context`):**
    - **When:** You add or change an architectural pattern, schema, shared utility rule, or tech stack decision.
    - **Format:** Concise, topic-scoped Markdown summary.
    - **Lifecycle Frontmatter:** When updating an existing convention, you MUST include YAML frontmatter:
      ```yaml
      ---
      status: active | superseded | deprecated
      supersedes: previous_topic_slug
      ---
      ```
* **Deprecate vs. Delete (`delete_context`):**
    - Use `status: deprecated` or `status: superseded` in YAML frontmatter if historical context is valuable.
    - Call `delete_context` ONLY when a topic is fully obsolete or entirely removed from the codebase.

### 3. Execution Rules
- **Never skip:** Do not bypass `read_context` on multi-file or cross-cutting tasks to save tokens.
- **Fail-safe:** If unsure whether an architectural decision exists, invoke `read_context` before taking action.
<!-- OPENCONTEXT:END -->
