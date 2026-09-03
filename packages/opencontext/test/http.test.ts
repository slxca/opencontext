import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { startHttpServer, type HttpServerHandle } from "../src/server/index.js";

function buildTestServer(): McpServer {
  const server = new McpServer({ name: "opencontext-mcp", version: "1.2.1" });
  server.registerTool("ping", { inputSchema: {} }, async () => ({
    content: [{ type: "text", text: "pong" }],
  }));
  return server;
}

/** Response bodies may be plain JSON or an SSE stream (data: lines). */
function parseMcpResponse(raw: string): unknown {
  const dataLines = raw.split("\n").filter((line) => line.startsWith("data:"));
  if (dataLines.length > 0) {
    return JSON.parse(
      dataLines
        .map((line) => line.slice("data:".length).trim())
        .join(""),
    );
  }
  return JSON.parse(raw);
}

async function mcpPost(
  url: string,
  body: unknown,
  extraHeaders: Record<string, string> = {},
): Promise<{ status: number; body: unknown }> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  });
  const raw = await res.text();
  return { status: res.status, body: parseMcpResponse(raw) };
}

describe("startHttpServer", () => {
  let handle: HttpServerHandle;

  beforeAll(async () => {
    handle = await startHttpServer({
      host: "127.0.0.1",
      port: 0,
      buildServer: buildTestServer,
    });
  });

  afterAll(async () => {
    await handle.close();
  });

  it("reports the endpoint URL", () => {
    expect(handle.url).toMatch(/^http:\/\/127\.0\.0\.1:\d+\/mcp$/);
  });

  it("serves server info on GET /", async () => {
    const res = await fetch(new URL("/", handle.url).toString());
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ name: "opencontext-mcp" });
  });

  it("handles MCP initialize over HTTP", async () => {
    const init = await mcpPost(handle.url, {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-06-18",
        capabilities: {},
        clientInfo: { name: "test-client", version: "1.0.0" },
      },
    });

    expect(init.status).toBe(200);
    expect(init.body).toMatchObject({
      jsonrpc: "2.0",
      id: 1,
      result: { serverInfo: { name: "opencontext-mcp", version: "1.2.1" } },
    });
  });

  it("answers tools/list with registered tools", async () => {
    const tools = await mcpPost(
      handle.url,
      { jsonrpc: "2.0", id: 2, method: "tools/list" },
      { "Mcp-Protocol-Version": "2025-06-18" },
    );

    expect(tools.status).toBe(200);
    expect(tools.body).toMatchObject({
      jsonrpc: "2.0",
      id: 2,
      result: { tools: [{ name: "ping" }] },
    });
  });

  it("rejects requests with a malformed body", async () => {
    const res = await fetch(handle.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      },
      body: "not json",
    });
    expect(res.status).toBe(400);
  });
});