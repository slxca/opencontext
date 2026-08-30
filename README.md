# OpenContext MCP

[![MCP](https://img.shields.io/badge/MCP-compatible-2563eb)](https://modelcontextprotocol.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933)](https://nodejs.org/)
[![Website](https://img.shields.io/badge/URL-opencntx.dev-c42f52?link=https%3A%2F%2Fopencntx.dev)](https://opencntx.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

OpenContext MCP gives AI agents persistent, project-local memory.

Most coding agents lose important decisions between sessions: architecture rules, naming conventions, API contracts, migration notes, and hard-won debugging context. OpenContext MCP solves that by exposing a tiny Model Context Protocol server that lets agents save and read markdown files in a local `.opencontext/` directory inside each project.

The result is simple and transparent: your agent gets memory, and you keep full control because the memory is plain markdown committed or ignored however you choose.

## Features

- `save_context`: save markdown context to `.opencontext/<topic>.md`
- `read_context`: read one saved topic or list all available topics
- **Auto-Index**: automatic `index.md` generation with topic metadata
- **Write Guard**: input validation, size limits, and prompt injection protection
- **Config System**: customizable via `.opencontext.jsonc` or `.opencontext.json`
- Project-specific storage based on the client's current working directory
- No database, account, cloud sync, or hidden state
- Works with MCP-compatible clients over stdio
- Built with strict TypeScript and the official `@modelcontextprotocol/sdk`

## Installation

You normally do not need to install OpenContext MCP manually. Configure your MCP client to run it with `npx`:

```bash
npx -y opencontext-mcp
```

For local development in this repository:

```bash
pnpm install
pnpm build
pnpm start
```

## MCP Client Setup

### OpenCode

Add OpenContext MCP to your OpenCode MCP configuration:

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

### Cursor / Claude Desktop

Cursor and Claude Desktop use the same MCP server configuration:

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

Restart your MCP client after updating the configuration.

## Configuration

OpenContext can be customized with a config file in your project root. Create `.opencontext.jsonc` or `.opencontext.json`:

```jsonc
{
  // Custom storage path (default: ".opencontext")
  "path": ".opencontext",

  // Disable write operations
  "readOnly": false,

  // Pause all tool access
  "disabled": false,

  // Auto-generate index.md with topic metadata
  "autoIndex": true,

  // Write guard settings
  "guard": {
    "enabled": true,
    "maxFileSizeKb": 50,
    "strictPatternCheck": true
  },

  // History backup settings (coming soon)
  "history": {
    "enabled": false,
    "maxBackupsPerTopic": 5,
    "retentionDays": 7
  }
}
```

### Guard System

The write guard protects against:

- **Empty content**: prevents saving blank or whitespace-only files
- **Payload too large**: configurable max file size (default 50KB)
- **Invalid topics**: enforces snake_case or kebab-case naming
- **Path traversal**: blocks `..`, absolute paths, and directory escapes
- **Reserved topics**: prevents overwriting system files like `index.md`
- **Prompt injection**: detects and blocks common injection patterns

## Available Tools

### `save_context`

Saves markdown content to `.opencontext/<topic>.md`. Existing files are overwritten.

Arguments:

| Name      | Type   | Required | Description                                   |
| --------- | ------ | -------- | --------------------------------------------- |
| `topic`   | string | yes      | Lowercase snake_case or kebab-case topic name |
| `content` | string | yes      | Markdown content to save                      |

Example use:

```text
Save our API conventions under topic api-contracts.
```

### `read_context`

Reads one saved topic, or lists all topics when no topic is provided.

Arguments:

| Name    | Type   | Required | Description   |
| ------- | ------ | -------- | ------------- |
| `topic` | string | no       | Topic to read |

Example use:

```text
Read the architecture context before changing the routing layer.
```

## How To Instruct Agents

MCP tools are most useful when your agent is explicitly told when to use them. Add instructions like these to your system prompt or project rules:

```text
Always use read_context before making code changes. First list available topics, then read any topic relevant to the task.

Use save_context whenever you learn a durable project rule, architectural decision, convention, API contract, or debugging note that future agents should know.

Prefer small, focused context topics in snake_case or kebab-case. Keep the content concise, factual, and written in markdown.
```

Recommended workflow:

1. Ask an architect or planning agent to analyze the project and save durable decisions with `save_context`.
2. Ask build agents to call `read_context` before coding.
3. Let agents update context when they discover something that should survive the current chat.
4. Review `.opencontext/` files like normal project documentation.

For pre-built agent prompts, see the [documentation](https://opencntx.dev/docs/agents).

## Version Control

You can commit `.opencontext/` when it contains team-wide knowledge:

```bash
git add .opencontext
```

Or ignore it when context should stay local:

```gitignore
.opencontext/
```

Because files are plain markdown, both approaches are safe and easy to audit.

## Project Structure

```text
opencontext/
├── packages/
│   └── opencontext/         # MCP server package
│       ├── src/
│       │   ├── index.ts           # CLI entrypoint (stdio transport)
│       │   ├── server.ts          # McpServer factory and tool registration
│       │   ├── config.ts          # Config loading (.opencontext.jsonc)
│       │   ├── context-store.ts   # Filesystem operations for .opencontext/
│       │   ├── validation.ts      # Topic validation and write guard
│       │   └── types.ts           # Shared constants and error helpers
│       └── test/
│           ├── context-store.test.ts
│           ├── validation.test.ts
│           ├── guard.test.ts
│           └── auto-index.test.ts
├── apps/
│   └── web/                 # Website (Next.js)
│       └── src/
│           ├── app/
│           │   ├── page.tsx        # Landing page
│           │   ├── docs/           # Documentation
│           │   ├── imprint/
│           │   └── privacy-policy/
│           └── components/
├── CONTRIBUTING.md
├── SECURITY.md
└── README.md
```

## Development

```bash
pnpm install
pnpm build        # compile all packages
pnpm typecheck    # type-check without emitting
pnpm test         # run vitest suite
```

## License

MIT
