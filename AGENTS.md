<!-- OPENCONTEXT:START -->
## OpenContext Workflow

OpenContext stores durable project memory as markdown files in `.opencontext/`. Check it before and after structural work.

- Before making structural code changes, run `read_context` to inspect existing project topics and architectural decisions.
- Whenever a new architectural convention, database schema, or API rule is established or refactored, call `save_context` with a concise, topic-scoped markdown summary. Use YAML frontmatter (`status`, `supersedes`) when updating conventions to track lifecycle changes.
- When a topic becomes obsolete, call `delete_context` to remove it. For deprecated topics that should remain visible, set `status: deprecated` or `status: superseded` in the frontmatter instead of deleting.
<!-- OPENCONTEXT:END -->
