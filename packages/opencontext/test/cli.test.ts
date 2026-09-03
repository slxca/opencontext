import { describe, it, expect } from "vitest";
import { parseArgs, CliError } from "../src/cli/index.js";

function argv(...args: string[]): string[] {
  return ["node", "opencontext-mcp", ...args];
}

describe("parseArgs", () => {
  describe("default (server) command", () => {
    it("returns server command when no args given", () => {
      expect(parseArgs(argv())).toEqual({ command: "server" });
    });

    it("treats empty string as unknown command", () => {
      expect(() => parseArgs(argv(""))).toThrow(CliError);
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
