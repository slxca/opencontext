import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdir, rm, readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import {
  upsertWorkflowFile,
  workflowSection,
  SECTION_START,
  SECTION_END,
  AGENTS_FILENAME,
  CLAUDE_FILENAME,
} from "../src/init/integrations/workflow-files.js";

function getTmpDir(): string {
  return path.join(
    os.tmpdir(),
    `opencontext-workflow-files-test-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );
}

describe("workflowSection", () => {
  it("is delimited by the OPENCONTEXT markers", () => {
    const section = workflowSection();
    expect(section.startsWith(SECTION_START)).toBe(true);
    expect(section.endsWith(SECTION_END)).toBe(true);
    expect(section).toContain("read_context");
    expect(section).toContain("save_context");
    expect(section).toContain("delete_context");
  });
});

describe("upsertWorkflowFile", () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = getTmpDir();
    await mkdir(tmpDir, { recursive: true });
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  it("creates AGENTS.md when missing", async () => {
    const result = await upsertWorkflowFile(tmpDir, AGENTS_FILENAME);
    expect(result.status).toBe("created");

    const content = await readFile(path.join(tmpDir, AGENTS_FILENAME), "utf8");
    expect(content).toContain(SECTION_START);
  });

  it("creates CLAUDE.md when missing", async () => {
    const result = await upsertWorkflowFile(tmpDir, CLAUDE_FILENAME);
    expect(result.status).toBe("created");

    const content = await readFile(path.join(tmpDir, CLAUDE_FILENAME), "utf8");
    expect(content).toContain("## OpenContext Workflow");
  });

  it("appends the section to an existing file, preserving content", async () => {
    const filePath = path.join(tmpDir, AGENTS_FILENAME);
    await writeFile(filePath, "# My Project\n\nGuidance.\n", "utf8");

    const result = await upsertWorkflowFile(tmpDir, AGENTS_FILENAME);
    expect(result.status).toBe("updated");

    const content = await readFile(filePath, "utf8");
    expect(content).toContain("# My Project");
    expect(content).toContain("Guidance.");
    expect(content.indexOf("# My Project")).toBeLessThan(content.indexOf(SECTION_START));
  });

  it("reports unchanged when the section is already current", async () => {
    const filePath = path.join(tmpDir, AGENTS_FILENAME);
    await writeFile(filePath, `# Title\n\n${workflowSection()}\n`, "utf8");

    const result = await upsertWorkflowFile(tmpDir, AGENTS_FILENAME);
    expect(result.status).toBe("unchanged");
  });

  it("updates an outdated section between the markers", async () => {
    const filePath = path.join(tmpDir, AGENTS_FILENAME);
    const outdated = `${SECTION_START}\n## OpenContext Workflow\n\nOld outdated instructions.\n${SECTION_END}\n`;
    await writeFile(filePath, outdated, "utf8");

    const result = await upsertWorkflowFile(tmpDir, AGENTS_FILENAME);
    expect(result.status).toBe("updated");

    const content = await readFile(filePath, "utf8");
    expect(content).not.toContain("Old outdated instructions.");
    expect(content).toContain("read_context");
    expect(content.split(SECTION_START).length - 1).toBe(1);
  });

  it("does not duplicate content outside the markers", async () => {
    const filePath = path.join(tmpDir, AGENTS_FILENAME);
    const original = "# Title\n\nStuff.\n";
    await writeFile(filePath, original, "utf8");

    await upsertWorkflowFile(tmpDir, AGENTS_FILENAME);
    await upsertWorkflowFile(tmpDir, AGENTS_FILENAME);

    const content = await readFile(filePath, "utf8");
    expect(content.split(SECTION_START).length - 1).toBe(1);
    expect(content.split("Stuff.").length - 1).toBe(1);
  });
});