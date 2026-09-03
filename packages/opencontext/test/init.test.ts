import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mkdir, rm, readFile, writeFile, access, stat } from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { inspectTargetDir } from "../src/init/inspect.js";
import { runInit } from "../src/init/index.js";
import { promptForConfirm } from "../src/init/prompts.js";

vi.mock("../src/init/prompts.js", () => ({
  promptForConfirm: vi.fn(),
}));

const promptMock = vi.mocked(promptForConfirm);

function getTmpDir(): string {
  return path.join(
    os.tmpdir(),
    `opencontext-init-test-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );
}

describe("inspectTargetDir", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = getTmpDir();
    await mkdir(tmpDir, { recursive: true });
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  it("reports empty directory", async () => {
    const result = await inspectTargetDir(tmpDir);
    expect(result.hasConfigFile).toBe(false);
    expect(result.hasContextDir).toBe(false);
    expect(result.isNonEmpty).toBe(false);
    expect(result.packageManager).toBeNull();
    expect(result.nodeVersion).toBe(process.version);
  });

  it("detects .opencontext.json", async () => {
    await writeFile(path.join(tmpDir, ".opencontext.json"), "{}", "utf8");
    const result = await inspectTargetDir(tmpDir);
    expect(result.hasConfigFile).toBe(true);
  });

  it("detects .opencontext/ directory", async () => {
    await mkdir(path.join(tmpDir, ".opencontext"), { recursive: true });
    const result = await inspectTargetDir(tmpDir);
    expect(result.hasContextDir).toBe(true);
  });

  it("detects non-empty directory", async () => {
    await writeFile(path.join(tmpDir, "index.ts"), "export {}", "utf8");
    const result = await inspectTargetDir(tmpDir);
    expect(result.isNonEmpty).toBe(true);
  });

  it("ignores dotfiles for emptiness check", async () => {
    await writeFile(path.join(tmpDir, ".gitignore"), "node_modules", "utf8");
    const result = await inspectTargetDir(tmpDir);
    expect(result.isNonEmpty).toBe(false);
  });

  it("ignores node_modules for emptiness check", async () => {
    await mkdir(path.join(tmpDir, "node_modules"), { recursive: true });
    const result = await inspectTargetDir(tmpDir);
    expect(result.isNonEmpty).toBe(false);
  });

  it("detects pnpm", async () => {
    await writeFile(path.join(tmpDir, "pnpm-lock.yaml"), "", "utf8");
    const result = await inspectTargetDir(tmpDir);
    expect(result.packageManager).toBe("pnpm");
  });

  it("detects yarn", async () => {
    await writeFile(path.join(tmpDir, "yarn.lock"), "", "utf8");
    const result = await inspectTargetDir(tmpDir);
    expect(result.packageManager).toBe("yarn");
  });

  it("detects npm", async () => {
    await writeFile(path.join(tmpDir, "package-lock.json"), "", "utf8");
    const result = await inspectTargetDir(tmpDir);
    expect(result.packageManager).toBe("npm");
  });

  it("detects bun", async () => {
    await writeFile(path.join(tmpDir, "bun.lockb"), "", "utf8");
    const result = await inspectTargetDir(tmpDir);
    expect(result.packageManager).toBe("bun");
  });

  it("detects cargo", async () => {
    await writeFile(path.join(tmpDir, "Cargo.toml"), "", "utf8");
    const result = await inspectTargetDir(tmpDir);
    expect(result.packageManager).toBe("cargo");
  });

  it("detects go", async () => {
    await writeFile(path.join(tmpDir, "go.mod"), "", "utf8");
    const result = await inspectTargetDir(tmpDir);
    expect(result.packageManager).toBe("go");
  });

  it("handles non-existent directory gracefully", async () => {
    const nonexistent = path.join(tmpDir, "does-not-exist");
    const result = await inspectTargetDir(nonexistent);
    expect(result.hasConfigFile).toBe(false);
    expect(result.hasContextDir).toBe(false);
    expect(result.isNonEmpty).toBe(false);
  });
});

describe("runInit", () => {
  let tmpDir: string;
  let originalCwd: string;

  /** Answers the interactive prompts. Defaults to confirming everything. */
  function setPrompts({ opencode = true, claude = true } = {}): void {
    promptMock.mockImplementation(async (_rl, message) => {
      if (message.includes("OpenCode")) return opencode;
      if (message.includes("Claude")) return claude;
      return true; // "Directory is not empty. Continue anyway?"
    });
  }

  beforeEach(async () => {
    tmpDir = getTmpDir();
    await mkdir(tmpDir, { recursive: true });
    originalCwd = process.cwd();
    process.chdir(tmpDir);
    setPrompts();
  });

  afterEach(async () => {
    process.chdir(originalCwd);
    await rm(tmpDir, { recursive: true, force: true });
    promptMock.mockReset();
  });

  it("creates .opencontext.json config file", async () => {
    await runInit();

    const configPath = path.join(tmpDir, ".opencontext.json");
    const content = await readFile(configPath, "utf8");

    expect(content).toContain('"path"');
    expect(content).toContain('".opencontext"');
    expect(content).toContain('"readOnly"');
    expect(content).toContain('"autoIndex"');
    expect(content).toContain('"guard"');
    expect(content).toContain('"enabled"');
  });

  it("creates .opencontext/ directory", async () => {
    await runInit();

    const contextDir = path.join(tmpDir, ".opencontext");
    const statResult = await stat(contextDir);
    expect(statResult.isDirectory()).toBe(true);
  });

  it("creates config file with valid JSON", async () => {
    await runInit();

    const configPath = path.join(tmpDir, ".opencontext.json");
    const content = await readFile(configPath, "utf8");

    expect(() => JSON.parse(content)).not.toThrow();
  });

  it("creates target directory if it does not exist", async () => {
    const newDir = path.join(tmpDir, "new-project");
    await mkdir(newDir, { recursive: true });
    process.chdir(newDir);
    await runInit();

    const configPath = path.join(newDir, ".opencontext.json");
    await expect(access(configPath)).resolves.toBeUndefined();
  });

  it("preserves an existing config file", async () => {
    const configPath = path.join(tmpDir, ".opencontext.json");
    const originalContent = '{"readOnly": true}';
    await writeFile(configPath, originalContent, "utf8");

    const consoleSpy = await import("vitest").then((v) =>
      v.vi.spyOn(process.stderr, "write").mockImplementation(() => true),
    );

    await runInit();

    const content = await readFile(configPath, "utf8");
    expect(content).toBe(originalContent);

    consoleSpy.mockRestore();
  });

  it("handles existing .opencontext/ directory gracefully", async () => {
    await mkdir(path.join(tmpDir, ".opencontext"), { recursive: true });
    await writeFile(path.join(tmpDir, ".opencontext", "existing.md"), "content", "utf8");

    await runInit();

    // Existing directory and files should be preserved
    const content = await readFile(path.join(tmpDir, ".opencontext", "existing.md"), "utf8");
    expect(content).toBe("content");

    // Config should still be created
    const configPath = path.join(tmpDir, ".opencontext.json");
    await expect(access(configPath)).resolves.toBeUndefined();
  });

  it("creates valid .opencontext/ directory that can be used as context store", async () => {
    await runInit();

    const contextDir = path.join(tmpDir, ".opencontext");
    const entries = await import("node:fs/promises").then((fs) =>
      fs.readdir(contextDir),
    );
    // Empty directory — ready for use
    expect(entries).toEqual([]);
  });

  it("creates opencode.json with a current MCP server entry", async () => {
    await runInit();

    const content = await readFile(path.join(tmpDir, "opencode.json"), "utf8");
    const config = JSON.parse(content);

    expect(config.mcp.opencontext).toEqual({
      type: "local",
      command: ["npx", "-y", "opencontext-mcp"],
      enabled: true,
    });
  });

  it("creates .mcp.json (Claude Code) with a current MCP server entry", async () => {
    await runInit();

    const content = await readFile(path.join(tmpDir, ".mcp.json"), "utf8");
    const config = JSON.parse(content);

    expect(config.mcpServers.opencontext).toEqual({
      command: "npx",
      args: ["-y", "opencontext-mcp"],
    });
  });

  it("extends existing opencode.json instead of overwriting it", async () => {
    const configPath = path.join(tmpDir, "opencode.json");
    const original = JSON.stringify({ username: "slxca", mcp: { other: { type: "local", command: ["foo"] } } });
    await writeFile(configPath, original, "utf8");

    await runInit();

    const config = JSON.parse(await readFile(configPath, "utf8"));
    expect(config.username).toBe("slxca");
    expect(config.mcp.other).toEqual({ type: "local", command: ["foo"] });
    expect(config.mcp.opencontext).toEqual({
      type: "local",
      command: ["npx", "-y", "opencontext-mcp"],
      enabled: true,
    });
  });

  it("extends existing .mcp.json instead of overwriting it", async () => {
    const configPath = path.join(tmpDir, ".mcp.json");
    const original = JSON.stringify({
      mcpServers: { github: { command: "npx", args: ["-y", "server-github"] } },
    });
    await writeFile(configPath, original, "utf8");

    await runInit();

    const config = JSON.parse(await readFile(configPath, "utf8"));
    expect(config.mcpServers.github).toEqual({ command: "npx", args: ["-y", "server-github"] });
    expect(config.mcpServers.opencontext).toEqual({
      command: "npx",
      args: ["-y", "opencontext-mcp"],
    });
  });

  it("skips OpenCode files when the OpenCode prompt is declined", async () => {
    setPrompts({ opencode: false });
    await runInit();

    await expect(access(path.join(tmpDir, "opencode.json"))).rejects.toThrow();
    await expect(access(path.join(tmpDir, "AGENTS.md"))).rejects.toThrow();
  });

  it("skips Claude Code files when the Claude prompt is declined", async () => {
    setPrompts({ claude: false });
    await runInit();

    await expect(access(path.join(tmpDir, ".mcp.json"))).rejects.toThrow();
    await expect(access(path.join(tmpDir, "CLAUDE.md"))).rejects.toThrow();
  });

  it("creates AGENTS.md with the OpenContext workflow", async () => {
    await runInit();

    const content = await readFile(path.join(tmpDir, "AGENTS.md"), "utf8");
    expect(content).toContain("OPENCONTEXT:START");
    expect(content).toContain("OPENCONTEXT:END");
    expect(content).toContain("read_context");
    expect(content).toContain("save_context");
  });

  it("creates CLAUDE.md with the OpenContext workflow", async () => {
    await runInit();

    const content = await readFile(path.join(tmpDir, "CLAUDE.md"), "utf8");
    expect(content).toContain("OPENCONTEXT:START");
    expect(content).toContain("read_context");
    expect(content).toContain("delete_context");
  });

  it("extends an existing AGENTS.md without overwriting it", async () => {
    const filePath = path.join(tmpDir, "AGENTS.md");
    const original = "# My Project\n\nSome existing guidance.\n";
    await writeFile(filePath, original, "utf8");

    await runInit();

    const content = await readFile(filePath, "utf8");
    expect(content).toContain("# My Project");
    expect(content).toContain("Some existing guidance.");
    expect(content).toContain("OPENCONTEXT:START");
  });

  it("extends an existing CLAUDE.md without overwriting it", async () => {
    const filePath = path.join(tmpDir, "CLAUDE.md");
    const original = "# My Project\n\nBuild with npm.\n";
    await writeFile(filePath, original, "utf8");

    await runInit();

    const content = await readFile(filePath, "utf8");
    expect(content).toContain("# My Project");
    expect(content).toContain("Build with npm.");
    expect(content).toContain("OPENCONTEXT:START");
  });

  it("does not duplicate the workflow section on a second run", async () => {
    await runInit();
    await runInit();

    const content = await readFile(path.join(tmpDir, "AGENTS.md"), "utf8");
    const occurrences = content.split("OPENCONTEXT:START").length - 1;
    expect(occurrences).toBe(1);
  });
});