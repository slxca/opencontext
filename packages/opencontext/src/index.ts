#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createOpenContextServer } from "./server/index.js";
import { SERVER_NAME, SERVER_VERSION } from "./shared/constants.js";
import { getErrorMessage } from "./shared/errors.js";
import { parseArgs, printHelp, printVersion, CliError } from "./cli/index.js";
import { runInit } from "./init/index.js";

/**
 * Main entry point for the OpenContext CLI.
 * Routes to the appropriate command based on CLI arguments.
 */
async function main(): Promise<void> {
  let args;
  try {
    args = parseArgs();
  } catch (error) {
    if (error instanceof CliError) {
      process.stderr.write(`Error: ${error.message}\n`);
      process.exit(1);
    }
    throw error;
  }

  switch (args.command) {
    case "help":
      printHelp();
      return;

    case "version":
      printVersion();
      return;

    case "init":
      await runInit();
      return;

    case "server":
    default: {
      const server = await createOpenContextServer();
      const transport = new StdioServerTransport();
      await server.connect(transport);

      if (
        process.env.OPENCONTEXT_TELEMETRY_DISABLED !== "1" &&
        process.env.DO_NOT_TRACK !== "1"
      ) {
        process.stderr.write(
          `[opencontext] v${SERVER_VERSION} active. https://github.com/slxca/opencontext\n`,
        );
      }
      break;
    }
  }
}

// Clean exit on SIGINT — no orphaned temp files
process.on("SIGINT", () => {
  process.exit(0);
});

main().catch((error: unknown) => {
  console.error(`Failed to start ${SERVER_NAME}: ${getErrorMessage(error)}`);
  process.exit(1);
});