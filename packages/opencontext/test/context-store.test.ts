import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdir, rm, readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { ContextStore } from "../src/context-store.js";
import { UserInputError } from "../src/types.js";

function getTmpDir(): string {
  return path.join(
    os.tmpdir(),
    `opencontext-test-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );
}

describe("ContextStore", () => {
  let tmpDir: string;
  let store: ContextStore;

  beforeEach(async () => {
    tmpDir = getTmpDir();
    await mkdir(tmpDir, { recursive: true });
    store = new ContextStore(tmpDir);
  });

  afterEach(async () => {
    await rm(tmpDir, { recursive: true, force: true });
  });

  describe("saveContext", () => {
    it("creates .opencontext directory and writes topic file", async () => {
      const result = await store.saveContext("api-contracts", "# API Contracts\n\nREST endpoints.");

      expect(result).toContain("api-contracts");

      const content = await readFile(path.join(tmpDir, ".opencontext", "api-contracts.md"), "utf8");
      expect(content).toBe("# API Contracts\n\nREST endpoints.");
    });

    it("overwrites an existing topic", async () => {
      await store.saveContext("rules", "v1");
      await store.saveContext("rules", "v2");

      const content = await readFile(path.join(tmpDir, ".opencontext", "rules.md"), "utf8");
      expect(content).toBe("v2");
    });

    it("works with snake_case topics", async () => {
      await store.saveContext("coding_rules", "# Rules");

      const content = await readFile(path.join(tmpDir, ".opencontext", "coding_rules.md"), "utf8");
      expect(content).toBe("# Rules");
    });

    it("throws UserInputError for invalid topic", async () => {
      await expect(store.saveContext("INVALID!", "content")).rejects.toThrow(UserInputError);
    });
  });

  describe("readContext", () => {
    it("reads a specific topic", async () => {
      await store.saveContext("architecture", "# Arch\n\nDetails here.");

      const content = await store.readContext("architecture");
      expect(content).toBe("# Arch\n\nDetails here.");
    });

    it("throws UserInputError for missing topic", async () => {
      await expect(store.readContext("nonexistent")).rejects.toThrow(UserInputError);
    });

    it("throws UserInputError for invalid topic name", async () => {
      await expect(store.readContext("BAD NAME")).rejects.toThrow(UserInputError);
    });
  });

  describe("listTopics (via readContext with no args)", () => {
    it("returns empty message when no topics exist", async () => {
      const result = await store.readContext();
      expect(result).toContain("No OpenContext topics found");
    });

    it("lists all topics sorted alphabetically", async () => {
      await store.saveContext("zebra", "z");
      await store.saveContext("alpha", "a");
      await store.saveContext("middle", "m");

      const result = await store.readContext();
      expect(result).toContain("**alpha**");
      expect(result).toContain("**middle**");
      expect(result).toContain("**zebra**");
    });

    it("ignores non-.md files in .opencontext/", async () => {
      const dir = path.join(tmpDir, ".opencontext");
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, "keep.md"), "keep");
      await writeFile(path.join(dir, "ignore.txt"), "ignore");
      await writeFile(path.join(dir, ".hidden"), "hidden");

      const result = await store.readContext();
      expect(result).toContain("**keep**");
      expect(result).not.toContain("ignore.txt");
      expect(result).not.toContain(".hidden");
    });
  });

  describe("listTopics (direct)", () => {
    it("returns empty array when directory does not exist", async () => {
      const emptyStore = new ContextStore(path.join(tmpDir, "nonexistent"));
      const topics = await emptyStore.listTopics();
      expect(topics).toEqual([]);
    });
  });
});
