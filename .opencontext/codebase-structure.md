# Codebase Structure (packages/opencontext)

The MCP package source is organized by domain into subfolders under `src/`:

- `src/index.ts` — CLI entry point (routing: server / init / help / version)
- `src/cli/` — argument parsing, help, version (`parseArgs`, `CliError`)
- `src/server/` — MCP tool registration (`createOpenContextServer`: save_context, read_context, delete_context)
- `src/config/` — config loading (`loadConfig`, `DEFAULT_CONFIG`, `deepMerge`). Reads `.opencontext.json` only — plain JSON, no JSONC/comment stripping.
- `src/store/` — context persistence (`context-store.ts`: `ContextStore`; `index-builder.ts`: frontmatter parsing, description extraction, index.md generation)
- `src/validation/` — safety checks (`index.ts`: `validateTopic`, `sanitizeTopicPath`; `write-guard.ts`: `validateWritePayload` + prompt-injection patterns)
- `src/init/` — `opencontext-mcp init` command (`index.ts` orchestration, `inspect.ts`, `prompts.ts`, `files.ts`, `display.ts`, `constants.ts`). Generates `.opencontext.json` (valid JSON template).
- `src/init/integrations/` — agent config writers (`opencode.ts`, `claude.ts`, `workflow-files.ts` for AGENTS.md / CLAUDE.md)
- `src/shared/` — cross-cutting constants (`constants.ts`), errors (`errors.ts`), types (`types.ts`)

CLI: only three subcommands — `server` (default), `init`, `help`, `version`. The `init` command takes no arguments: it always runs in the current directory, always prompts interactively (never non-interactive), never force-overwrites, and enables OpenCode/Claude integrations based on the prompts.

Config format: `.opencontext.json` (plain JSON, no comments or trailing commas). No JSONC support anywhere.

Convention: imports use `.js` extension (NodeNext). Keep each folder's `index.ts` as the public surface for its domain.