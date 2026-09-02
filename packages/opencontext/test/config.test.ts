import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdir, rm, writeFile } from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { loadConfig, DEFAULT_CONFIG } from "../src/config.js";

function getTmpDir(): string {
  return path.join(
    os.tmpdir(),
    `opencontext-config-test-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );
}

describe("loadConfig", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = getTmpDir();
    await mkdir(tmpDir, { recursive: true });
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  it("returns DEFAULT_CONFIG when no config file exists", async () => {
    const config = await loadConfig(tmpDir);
    expect(config).toEqual(DEFAULT_CONFIG);
  });

  it("gives .opencontext.jsonc precedence over .opencontext.json", async () => {
    await writeFile(
      path.join(tmpDir, ".opencontext.json"),
      JSON.stringify({ readOnly: false }),
      "utf8",
    );
    await writeFile(
      path.join(tmpDir, ".opencontext.jsonc"),
      JSON.stringify({ readOnly: true }),
      "utf8",
    );

    const config = await loadConfig(tmpDir);
    expect(config.readOnly).toBe(true);
  });

  it("parses single-line comments, multi-line comments, and trailing commas", async () => {
    const jsonc = `{
      // This is a comment
      "readOnly": true,
      /* block comment */
      "guard": {
        "maxFileSizeKb": 100,  // trailing comma
      },
    }`;

    await writeFile(path.join(tmpDir, ".opencontext.jsonc"), jsonc, "utf8");

    const config = await loadConfig(tmpDir);
    expect(config.readOnly).toBe(true);
    expect(config.guard.maxFileSizeKb).toBe(100);
  });

  it("deep merges partial config with defaults", async () => {
    const partial = {
      guard: {
        maxFileSizeKb: 60,
      },
    };

    await writeFile(
      path.join(tmpDir, ".opencontext.json"),
      JSON.stringify(partial),
      "utf8",
    );

    const config = await loadConfig(tmpDir);
    expect(config.guard.maxFileSizeKb).toBe(60);
    expect(config.guard.strictPatternCheck).toBe(true); // preserved from defaults
    expect(config.readOnly).toBe(false); // preserved from defaults
    expect(config.path).toBe(".opencontext"); // preserved from defaults
  });

  it("returns defaults and logs to stderr on corrupted JSON", async () => {
    const consoleSpy = await import("vitest").then((v) =>
      v.vi.spyOn(console, "error").mockImplementation(() => {}),
    );

    await writeFile(
      path.join(tmpDir, ".opencontext.json"),
      "{ invalid json content }}}",
      "utf8",
    );

    const config = await loadConfig(tmpDir);
    expect(config).toEqual(DEFAULT_CONFIG);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("failed to parse .opencontext.json"),
    );

    consoleSpy.mockRestore();
  });

  it("does not strip commas inside string values", async () => {
    const jsonc = `{
      "path": "a,b}",
      "readOnly": true
    }`;

    await writeFile(path.join(tmpDir, ".opencontext.jsonc"), jsonc, "utf8");

    const config = await loadConfig(tmpDir);
    expect(config.path).toBe("a,b}");
    expect(config.readOnly).toBe(true);
  });
});
