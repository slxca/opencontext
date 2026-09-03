import { describe, it, expect } from "vitest";
import { parseArgs, CliError } from "../src/cli/index.js";
import { DEFAULT_HTTP_HOST, DEFAULT_HTTP_PORT } from "../src/shared/constants.js";

function argv(...args: string[]): string[] {
  return ["node", "opencontext-mcp", ...args];
}

describe("parseArgs", () => {
  describe("default (server) command", () => {
    it("returns server command with stdio defaults when no args given", () => {
      expect(parseArgs(argv())).toEqual({
        command: "server",
        transport: "stdio",
        port: DEFAULT_HTTP_PORT,
        host: DEFAULT_HTTP_HOST,
      });
    });

    it("treats empty string as unknown command", () => {
      expect(() => parseArgs(argv(""))).toThrow(CliError);
    });
  });

  describe("server command", () => {
    it("parses bare server", () => {
      expect(parseArgs(argv("server"))).toEqual({
        command: "server",
        transport: "stdio",
        port: DEFAULT_HTTP_PORT,
        host: DEFAULT_HTTP_HOST,
      });
    });

    it("enables http transport", () => {
      expect(parseArgs(argv("--http"))).toEqual({
        command: "server",
        transport: "http",
        port: DEFAULT_HTTP_PORT,
        host: DEFAULT_HTTP_HOST,
      });
      expect(parseArgs(argv("server", "--http"))).toEqual({
        command: "server",
        transport: "http",
        port: DEFAULT_HTTP_PORT,
        host: DEFAULT_HTTP_HOST,
      });
    });

    it("parses --port and --host", () => {
      expect(parseArgs(argv("--http", "--port", "8787", "--host", "0.0.0.0"))).toEqual({
        command: "server",
        transport: "http",
        port: 8787,
        host: "0.0.0.0",
      });
    });

    it("throws when --port is not numeric", () => {
      expect(() => parseArgs(argv("--port", "abc"))).toThrow("--port requires a numeric value");
    });

    it("throws when --port has no value", () => {
      expect(() => parseArgs(argv("--port"))).toThrow("--port requires a numeric value");
    });
  });

  describe("help command", () => {
    it("parses --help", () => {
      expect(parseArgs(argv("--help"))).toEqual({ command: "help" });
    });

    it("parses -h", () => {
      expect(parseArgs(argv("-h"))).toEqual({ command: "help" });
    });
  });

  describe("version command", () => {
    it("parses --version", () => {
      expect(parseArgs(argv("--version"))).toEqual({ command: "version" });
    });

    it("parses -v", () => {
      expect(parseArgs(argv("-v"))).toEqual({ command: "version" });
    });
  });

  describe("init command", () => {
    it("parses bare init", () => {
      expect(parseArgs(argv("init"))).toEqual({ command: "init" });
    });

    it("ignores any extra arguments after init", () => {
      expect(parseArgs(argv("init", "--yes", "--dir", "./my-project"))).toEqual({
        command: "init",
      });
    });
  });

  describe("error handling", () => {
    it("throws on unknown command", () => {
      expect(() => parseArgs(argv("unknown"))).toThrow(CliError);
      expect(() => parseArgs(argv("unknown"))).toThrow("Unknown command: unknown");
    });

    it("throws on unknown flag", () => {
      expect(() => parseArgs(argv("--unknown"))).toThrow(CliError);
      expect(() => parseArgs(argv("--unknown"))).toThrow("Unknown option: --unknown");
    });
  });
});
