import {
  createServer,
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from "node:http";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { SERVER_NAME, SERVER_VERSION } from "../shared/constants.js";
import { getErrorMessage } from "../shared/errors.js";

export interface HttpServerOptions {
  host: string;
  port: number;
  buildServer: () => Promise<McpServer>;
}

export interface HttpServerHandle {
  /** Fully-qualified MCP endpoint URL, e.g. http://127.0.0.1:3001/mcp */
  url: string;
  close: () => Promise<void>;
}

/**
 * Serves an MCP server over HTTP using the Streamable HTTP transport.
 *
 * Each request gets a fresh server instance and a stateless transport, matching
 * the MCP Streamable HTTP reference pattern: no sessions are tracked in memory.
 *
 * @param options - Host, port, and a server factory
 * @returns The endpoint URL and a close handle
 */
export async function startHttpServer(options: HttpServerOptions): Promise<HttpServerHandle> {
  const handleRequest = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    if (req.method === "GET" && req.url === "/") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ name: SERVER_NAME, version: SERVER_VERSION }));
      return;
    }

    try {
      const mcpServer = await options.buildServer();
      // Omitting sessionIdGenerator puts the transport in stateless mode.
      const transport = new StreamableHTTPServerTransport();
      await mcpServer.connect(transport as Transport);
      try {
        await transport.handleRequest(req, res);
      } finally {
        await mcpServer.close();
      }
    } catch (error) {
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            jsonrpc: "2.0",
            error: { code: -32603, message: getErrorMessage(error) },
            id: null,
          }),
        );
      }
    }
  };

  const server: Server = createServer(handleRequest);

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(options.port, options.host, () => {
      server.off("error", reject);
      resolve();
    });
  });

  const address = server.address();
  const boundPort = typeof address === "object" && address !== null ? address.port : options.port;
  const displayHost =
    options.host === "0.0.0.0" || options.host === "::" ? "localhost" : options.host;
  const url = `http://${displayHost}:${boundPort}/mcp`;

  return {
    url,
    close: async () => {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    },
  };
}