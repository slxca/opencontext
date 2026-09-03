import {
  SERVER_VERSION,
  DEFAULT_HTTP_HOST,
  DEFAULT_HTTP_PORT,
} from "../shared/constants.js";

export interface ServerCliArgs {
  command: "server";
  transport: "stdio" | "http";
  port: number;
  host: string;
}

export type CliArgs =
  | ServerCliArgs
  | { command: "init" }
  | { command: "help" }
  | { command: "version" };

export class CliError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CliError";
  }
}

const USAGE = `Usage: opencontext-mcp [command] [options]

Commands:
  (default)        Start the MCP server (stdio transport)
  server           Start the MCP server (alias of the default)
  init             Initialize OpenContext in the current directory
  --help, -h       Show this help message
  --version, -v    Show version number

Server options:
  --http               Serve over HTTP using the Streamable HTTP transport
  --port <port>        HTTP port (default: 3032)
  --host <host>        Interface to bind (default: 127.0.0.1)

Examples:
  opencontext-mcp                       Start MCP server over stdio
  opencontext-mcp --http                Serve over HTTP at http://127.0.0.1:3032/mcp
  opencontext-mcp server --http --port 8787`;

/**
 * Parses command-line arguments into a structured CliArgs object.
 * @param argv - Raw process.argv (defaults to process.argv)
 * @returns Parsed arguments
 * @throws CliError on invalid arguments
 */
export function parseArgs(argv: string[] = process.argv): CliArgs {
  const args = argv.slice(2);

  if (args.length === 0) {
    return { command: "server", transport: "stdio", port: DEFAULT_HTTP_PORT, host: DEFAULT_HTTP_HOST };
  }

  const first: string | undefined = args[0];

  if (first === undefined) {
    return { command: "server", transport: "stdio", port: DEFAULT_HTTP_PORT, host: DEFAULT_HTTP_HOST };
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

  let index = first === "server" ? 1 : 0;

  let transport: "stdio" | "http" = "stdio";
  let port = DEFAULT_HTTP_PORT;
  let host = DEFAULT_HTTP_HOST;

  while (index < args.length) {
    const arg = args[index];
    if (arg === undefined) {
      break;
    }

    switch (arg) {
      case "--http":
        transport = "http";
        index += 1;
        break;

      case "--port": {
        const value = args[index + 1];
        if (value === undefined || !/^\d+$/.test(value)) {
          throw new CliError("--port requires a numeric value");
        }
        port = Number(value);
        index += 2;
        break;
      }

      case "--host": {
        const value = args[index + 1];
        if (value === undefined) {
          throw new CliError("--host requires a value");
        }
        host = value;
        index += 2;
        break;
      }

      default:
        if (arg.startsWith("-")) {
          throw new CliError(`Unknown option: ${arg}\n\nRun "opencontext-mcp --help" for usage.`);
        }
        throw new CliError(`Unknown command: ${arg}\n\nRun "opencontext-mcp --help" for usage.`);
    }
  }

  return { command: "server", transport, port, host };
}

export function printHelp(): void {
  process.stdout.write(USAGE + "\n");
}

export function printVersion(): void {
  process.stdout.write(SERVER_VERSION + "\n");
}