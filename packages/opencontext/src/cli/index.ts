import { SERVER_VERSION } from "../shared/constants.js";

export type CliArgs =
  | { command: "server" }
  | { command: "init" }
  | { command: "help" }
  | { command: "version" };

export class CliError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CliError";
  }
}

const USAGE = `Usage: opencontext-mcp [command]

Commands:
  (default)       Start the MCP server (stdio transport)
  init            Initialize OpenContext in the current directory
  --help            Show this help message
  --version         Show version number

Examples:
  opencontext-mcp            Start MCP server
  opencontext-mcp init       Interactive project setup`;

/**
 * Parses command-line arguments into a structured CliArgs object.
 * @param argv - Raw process.argv (defaults to process.argv)
 * @returns Parsed arguments
 * @throws CliError on invalid arguments
 */
export function parseArgs(argv: string[] = process.argv): CliArgs {
  const args = argv.slice(2);

  if (args.length === 0) {
    return { command: "server" };
  }

  const first: string | undefined = args[0];

  if (first === undefined) {
    return { command: "server" };
  }

  if (first === "--help" || first === "-h") {
    return { command: "help" };
  }

  if (first === "--version" || first === "-v") {
    return { command: "version" };
  }

  if (first === "init") {
    return { command: "init" };
  }

  if (first.startsWith("-")) {
    throw new CliError(`Unknown option: ${first}\n\nRun "opencontext-mcp --help" for usage.`);
  }

  throw new CliError(`Unknown command: ${first}\n\nRun "opencontext-mcp --help" for usage.`);
}

export function printHelp(): void {
  process.stdout.write(USAGE + "\n");
}

export function printVersion(): void {
  process.stdout.write(SERVER_VERSION + "\n");
}