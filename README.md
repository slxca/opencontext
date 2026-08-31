<p align="center">
  <a href="https://opencntx.dev">
    <picture>
      <source srcset="apps/web/public/opencontext.png" media="(prefers-color-scheme: dark)">
      <source srcset="apps/web/public/logo_dark.png" media="(prefers-color-scheme: light)">
      <img src="apps/web/public/opencontext.png" alt="OpenContext logo" width="500">
    </picture>
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

Run directly without installation via `npx`:

```bash
npx -y opencontext-mcp

```

### Client Setup

#### OpenCode

Add OpenContext to your project MCP configuration (`opencode.json`):

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
| `save_context` | `topic` *(string)*, `content` *(string)* | Writes or mutates markdown memory inside `.opencontext/<topic>.md` with built-in write guards. |

---

### Agent Workflows

Instruct your agents to automatically leverage project context. Add this snippet to your `.cursorrules`, `CLAUDE.md`, or system prompt:

```markdown
Before making structural code changes, run `read_context` to inspect existing project topics and architectural decisions.

Whenever a new architectural convention, database schema, or API rule is established or refactored, call `save_context` with a concise, topic-scoped markdown summary.

```

---

### Configuration

Customize storage paths and security boundaries with an optional `.opencontext.jsonc` file in your repository root:

```jsonc
{
  // Storage location (default: ".opencontext")
  "path": ".opencontext",

  // Prevent agents from writing or updating files
  "readOnly": false,

  // Auto-generate index.md with topic descriptions
  "autoIndex": true,

  // Write guard & prompt injection defenses
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
