<p align="center">
  <a href="https://opencntx.dev">
    <img src="https://github.com/slxca/opencontext/blob/master/apps/web/public/opencontext.png?raw=true" alt="OpenContext logo" width="500">
  </a>
</p>

<p align="center"><b>Persistent, project-local memory for AI coding agents.</b></p>

<p align="center">
  <a href="https://opencntx.dev"><img alt="Website" src="https://img.shields.io/badge/website-opencntx.dev-191919?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/opencontext-mcp"><img alt="npm version" src="https://img.shields.io/npm/v/opencontext-mcp?style=flat-square" /></a>
  <a href="https://github.com/slxca/opencontext/actions"><img alt="CI status" src="https://img.shields.io/github/actions/workflow/status/slxca/opencontext/ci.yml?style=flat-square&branch=master" /></a>
</p>

---

Most coding agents lose critical decisions between sessions: architecture invariants, API contracts, rejected patterns, and setup quirks. OpenContext solves context loss through a lightweight Model Context Protocol (MCP) server that lets agents read and mutate durable markdown files inside `.opencontext/`.

No vector databases, no cloud subscriptions, and no hidden state. Memory is plain markdown tracked directly in Git.

---

### Quickstart

Run the MCP server directly without installation via `npx`:

```bash
npx -y opencontext-mcp

```

### One-Command Setup

Scaffold OpenContext in the current project interactively:

```bash
npx -y opencontext-mcp init
```

`init` walks you through the setup (enabling OpenCode and Claude Code integration) and generates everything you need:

- `.opencontext/` — directory that holds your context topic files
- `.opencontext.json` — configuration template
- `opencode.json` — MCP server entry for OpenCode
- `.mcp.json` — MCP server entry for Claude Code
- `AGENTS.md` / `CLAUDE.md` — workflow reminders for your agents

The `init` command takes no arguments: it always runs in the current directory, prompts interactively, and never overwrites an existing config.

### Client Setup

#### OpenCode

Add OpenContext to your project MCP configuration (`opencode.json`) — or let `opencontext-mcp init` do it for you:

```json
{
  "mcp": {
    "opencontext": {
      "type": "local",
      "command": ["npx", "-y", "opencontext-mcp"],
      "enabled": true
    }
  }
}

```

#### Cursor / Claude Desktop / Windsurf

Add OpenContext to your MCP settings file (`claude_desktop_config.json` or Cursor MCP settings):

```json
{
  "mcpServers": {
    "opencontext": {
      "command": "npx",
      "args": ["-y", "opencontext-mcp"]
    }
  }
}

```

---

### Core Tools

| Tool | Parameters | Description |
| --- | --- | --- |
| `read_context` | `topic?` *(optional string)* | Reads a specific context topic, or returns the lightweight topic index (~100 tokens) if omitted. |
| `save_context` | `topic` *(string)*, `content` *(string)* | Writes or mutates markdown memory inside `.opencontext/<topic>.md` with built-in write guards and symlink protections. |
| `delete_context` | `topic` *(string)* | Removes an obsolete topic file and automatically rebuilds the topic index. |

---

### ADR Lifecycle & Frontmatter

Topics support optional YAML frontmatter to track lifecycle status — useful when architectural decisions evolve and old context should be visible but clearly flagged as outdated.

````markdown
---
description: OAuth2 + PKCE authentication flow
status: active
supersedes: auth_v1
---

# Authentication v2

Migrated from JWT to OAuth2 with PKCE.
````

**Supported frontmatter keys:**

| Key | Values | Description |
| --- | --- | --- |
| `description` | string | Short summary used in the auto-generated index. |
| `status` | `active` \| `deprecated` \| `superseded` | Lifecycle status. Defaults to `active` when omitted. |
| `supersedes` | string | Topic name this topic replaces *(set on the newer topic)*. |
| `superseded_by` | string | Topic name that replaced this one *(set on the older topic)*. |

Non-active topics automatically receive `[DEPRECATED]` or `[SUPERSEDED]` badges in the auto-generated `index.md`, along with cross-references showing which topic replaced or was replaced.

---

### Agent Workflows

Instruct your agents to automatically leverage project context. Add this snippet to your `.cursorrules`, `CLAUDE.md`, or system prompt:

```markdown
Before making structural code changes, run `read_context` to inspect existing project topics and architectural decisions.

Whenever a new architectural convention, database schema, or API rule is established or refactored, call `save_context` with a concise, topic-scoped markdown summary. Use YAML frontmatter (status, supersedes) when updating conventions to track lifecycle changes.

When a topic becomes obsolete, call `delete_context` to remove it. For deprecated topics that should remain visible, set status: deprecated or status: superseded in the frontmatter instead of deleting.
```

---

### Configuration

Customize storage paths and security boundaries with an optional `.opencontext.json` file in your repository root (plain JSON — comments are not supported):

```json
{
  "path": ".opencontext",
  "readOnly": false,
  "autoIndex": true,
  "guard": {
    "enabled": true,
    "maxFileSizeKb": 50,
    "strictPatternCheck": true
  }
}
```

---

### Local Development

```bash
# Clone and install dependencies
git clone [https://github.com/slxca/opencontext.git](https://github.com/slxca/opencontext.git)
cd opencontext
pnpm install

# Build & run tests
pnpm build
pnpm test

```

---

### Documentation

For advanced setup guides, guard parameters, and agent prompt templates, visit **[opencntx.dev/docs](https://www.google.com/search?q=https://opencntx.dev/docs)**.

### Contributing

Contributions are welcome. Please ensure all unit tests and typechecks pass before submitting a pull request:

```bash
pnpm typecheck && pnpm test

```
