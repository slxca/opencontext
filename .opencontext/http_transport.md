# HTTP Transport

The MCP server can run over the network in addition to stdio. HTTP only — no TLS/HTTPS support.

- CLI: `opencontext-mcp --http [--port N] [--host H]` (default port 3001, host 127.0.0.1). Parsed in `src/cli/index.ts` (`parseArgs`).
- Implementation: `src/server/http.ts` -> `startHttpServer(options)` builds a Node `http` server and wires the MCP tools through `StreamableHTTPServerTransport`.
- Transport is **stateless** (per the MCP Streamable HTTP reference pattern): each request gets a fresh `McpServer` instance from the `buildServer` factory and a fresh stateless transport, then `mcpServer.close()` runs in a `finally`. No sessions are tracked in memory. This avoids the SDK's single-connected-transport limit.
- Endpoint: `http://<host>:<port>/mcp`. `GET /` returns `{ name, version }` info JSON. URL is printed to stderr on startup, always (not gated by the telemetry env vars).
- Type quirks: under `exactOptionalPropertyTypes` the SDK's `StreamableHTTPServerTransport` must be cast to `Transport` before `mcpServer.connect()`. Stateless mode = omit `sessionIdGenerator` entirely.
- Note: `GET /mcp` with `Accept: text/event-stream` opens an SSE stream (held by its own per-request server); `POST` requires `Accept: application/json, text/event-stream` + `Content-Type: application/json`.