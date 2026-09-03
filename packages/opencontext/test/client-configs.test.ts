import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdir, rm, readFile, writeFile, access } from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import {
  upsertOpenCodeConfig,
  openCodeMcpEntry,
  OPENCODE_CONFIG_FILENAME,
} from "../src/init/integrations/opencode.js";
import {
  upsertClaudeConfig,
  claudeMcpEntry,
  CLAUDE_MCP_FILENAME,
} from "../src/init/integrations/claude.js";

function getTmpDir(): string {
  return path.join(
    os.tmpdir(),
    `opencontext-client-configs-test-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );
}

describe("upsertOpenCodeConfig", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = getTmpDir();
    await mkdir(tmpDir, { recursive: true });
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  it("creates opencode.json when missing", async () => {
    const result = await upsertOpenCodeConfig(tmpDir);
    expect(result.status).toBe("created");

    const config = JSON.parse(await readFile(path.join(tmpDir, OPENCODE_CONFIG_FILENAME), "utf8"));
    expect(config.$schema).toBe("https://opencode.ai/config.json");
    expect(config.mcp.opencontext).toEqual(openCodeMcpEntry());
  });

  it("extends an existing config and preserves other keys", async () => {
    await writeFile(
      path.join(tmpDir, OPENCODE_CONFIG_FILENAME),
      JSON.stringify({ username: "slxca", mcp: { other: { type: "local", command: ["foo"] } } }),
      "utf8",
    );

    const result = await upsertOpenCodeConfig(tmpDir);
    expect(result.status).toBe("updated");

    const config = JSON.parse(await readFile(path.join(tmpDir, OPENCODE_CONFIG_FILENAME), "utf8"));
    expect(config.username).toBe("slxca");
    expect(config.mcp.other).toEqual({ type: "local", command: ["foo"] });
    expect(config.mcp.opencontext).toEqual(openCodeMcpEntry());
  });

  it("leaves a current config unchanged", async () => {
    const current = {
      $schema: "https://opencode.ai/config.json",
      mcp: { opencontext: openCodeMcpEntry() },
    };
    await writeFile(path.join(tmpDir, OPENCODE_CONFIG_FILENAME), JSON.stringify(current), "utf8");

    const result = await upsertOpenCodeConfig(tmpDir);
    expect(result.status).toBe("unchanged");
  });

  it("updates an outdated MCP entry to the current shape", async () => {
    await writeFile(
      path.join(tmpDir, OPENCODE_CONFIG_FILENAME),
      JSON.stringify({
        mcp: { opencontext: { type: "local", command: ["opencontext-mcp"] } },
      }),
      "utf8",
    );

    const result = await upsertOpenCodeConfig(tmpDir);
    expect(result.status).toBe("updated");

    const config = JSON.parse(await readFile(path.join(tmpDir, OPENCODE_CONFIG_FILENAME), "utf8"));
    expect(config.mcp.opencontext).toEqual(openCodeMcpEntry());
  });

  it("preserves a custom $schema from an existing config", async () => {
    await writeFile(
      path.join(tmpDir, OPENCODE_CONFIG_FILENAME),
      JSON.stringify({ $schema: "https://custom.example/schema.json" }),
      "utf8",
    );

    await upsertOpenCodeConfig(tmpDir);

    const config = JSON.parse(await readFile(path.join(tmpDir, OPENCODE_CONFIG_FILENAME), "utf8"));
    expect(config.$schema).toBe("https://custom.example/schema.json");
    expect(config.mcp.opencontext).toEqual(openCodeMcpEntry());
  });

  it("skips a malformed existing config without touching it", async () => {
    await writeFile(path.join(tmpDir, OPENCODE_CONFIG_FILENAME), "{ not json", "utf8");

    const result = await upsertOpenCodeConfig(tmpDir);
    expect(result.status).toBe("skipped");
    expect(await readFile(path.join(tmpDir, OPENCODE_CONFIG_FILENAME), "utf8")).toBe("{ not json");
  });
});

describe("upsertClaudeConfig", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = getTmpDir();
    await mkdir(tmpDir, { recursive: true });
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  it("creates .mcp.json when missing", async () => {
    const result = await upsertClaudeConfig(tmpDir);
    expect(result.status).toBe("created");

    const config = JSON.parse(await readFile(path.join(tmpDir, CLAUDE_MCP_FILENAME), "utf8"));
    expect(config.mcpServers.opencontext).toEqual(claudeMcpEntry());
  });

  it("extends an existing config and preserves other servers", async () => {
    await writeFile(
      path.join(tmpDir, CLAUDE_MCP_FILENAME),
      JSON.stringify({ mcpServers: { github: { command: "npx", args: ["-y", "@modelcontextprotocol/server-github"] } } }),
      "utf8",
    );

    const result = await upsertClaudeConfig(tmpDir);
    expect(result.status).toBe("updated");

    const config = JSON.parse(await readFile(path.join(tmpDir, CLAUDE_MCP_FILENAME), "utf8"));
    expect(config.mcpServers.github).toEqual({
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-github"],
    });
    expect(config.mcpServers.opencontext).toEqual(claudeMcpEntry());
  });

  it("leaves a current config unchanged", async () => {
    await writeFile(
      path.join(tmpDir, CLAUDE_MCP_FILENAME),
      JSON.stringify({ mcpServers: { opencontext: claudeMcpEntry() } }),
      "utf8",
    );

    const result = await upsertClaudeConfig(tmpDir);
    expect(result.status).toBe("unchanged");
  });

  it("updates an outdated MCP entry to the current shape", async () => {
    await writeFile(
      path.join(tmpDir, CLAUDE_MCP_FILENAME),
      JSON.stringify({ mcpServers: { opencontext: { command: "npx", args: ["opencontext-mcp"] } } }),
      "utf8",
    );

    const result = await upsertClaudeConfig(tmpDir);
    expect(result.status).toBe("updated");

    const config = JSON.parse(await readFile(path.join(tmpDir, CLAUDE_MCP_FILENAME), "utf8"));
    expect(config.mcpServers.opencontext).toEqual(claudeMcpEntry());
  });

  it("skips a malformed existing config without touching it", async () => {
    await writeFile(path.join(tmpDir, CLAUDE_MCP_FILENAME), "nope", "utf8");

    const result = await upsertClaudeConfig(tmpDir);
    expect(result.status).toBe("skipped");
    expect(await readFile(path.join(tmpDir, CLAUDE_MCP_FILENAME), "utf8")).toBe("nope");
  });
});