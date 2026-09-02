#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createOpenContextServer } from "./server.js";
import { SERVER_NAME, SERVER_VERSION, getErrorMessage } from "./types.js";

/**
 * Main entry point for the OpenContext MCP server.
 * Creates server instance and connects to stdio transport.
 */
async function main(): Promise<void> {
  const server = await createOpenContextServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);

  if (process.env.OPENCONTEXT_TELEMETRY_DISABLED !== "1" && process.env.DO_NOT_TRACK !== "1") {
    process.stderr.write(`[opencontext] v${SERVER_VERSION} active. https://github.com/slxca/opencontext\n`);
  }
}

main().catch((error: unknown) => {
  console.error(`Failed to start ${SERVER_NAME}: ${getErrorMessage(error)}`);
  process.exit(1);
});
