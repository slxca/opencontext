import { mkdir, readdir, unlink } from "node:fs/promises";
import * as path from "node:path";
import * as readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { inspectTargetDir } from "./inspect.js";
import { promptForConfirm } from "./prompts.js";
import { atomicWrite, validateConfigFile } from "./files.js";
import { printStep, printResult } from "./display.js";
import { CONFIG_FILENAME, CONTEXT_DIR_NAME, CONFIG_CONTENT } from "./constants.js";
import {
  upsertOpenCodeConfig,
  OPENCODE_CONFIG_FILENAME,
} from "./integrations/opencode.js";
import {
  upsertClaudeConfig,
  CLAUDE_MCP_FILENAME,
} from "./integrations/claude.js";
import {
  upsertWorkflowFile,
  AGENTS_FILENAME,
  CLAUDE_FILENAME,
} from "./integrations/workflow-files.js";

/**
 * Runs the init command.
 * Inspects the current directory, prompts for configuration, and generates files.
 * Existing configs are extended, never overwritten.
 */
export async function runInit(): Promise<void> {
  const targetDir = path.resolve(".");
  let opencode = true;
  let claude = true;

  // Step 1: Inspect
  printStep("Inspecting directory", false);
  const inspection = await inspectTargetDir(targetDir);
  printStep("Inspecting directory");

  // Show environment info
  process.stderr.write(`\n  Node.js ${inspection.nodeVersion}`);
  if (inspection.packageManager) {
    process.stderr.write(` | ${inspection.packageManager}`);
  }
  process.stderr.write("\n\n");

  // Step 2: Interactive selection
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    if (inspection.isNonEmpty) {
      const proceed = await promptForConfirm(
        rl,
        "  Directory is not empty. Continue anyway?",
      );
      if (!proceed) {
        process.stderr.write("  Aborted.\n");
        return;
      }
    }

    opencode = await promptForConfirm(
      rl,
      "  Enable OpenCode integration?",
      true,
    );
    if (!opencode) {
      printResult("skipped", "OpenCode integration skipped");
    }

    claude = await promptForConfirm(
      rl,
      "  Enable Claude Code integration?",
      true,
    );
    if (!claude) {
      printResult("skipped", "Claude Code integration skipped");
    }
  } finally {
    rl.close();
  }

  // Step 3: Create directories + files
  const createdFiles: string[] = [];
  const createdDirs: string[] = [];

  try {
    // Ensure target directory exists
    await mkdir(targetDir, { recursive: true });

    // Create .opencontext/ directory
    const contextDirPath = path.join(targetDir, CONTEXT_DIR_NAME);
    await mkdir(contextDirPath, { recursive: true });
    createdDirs.push(contextDirPath);

    // Step 4: OpenContext config — create when missing, preserve otherwise
    const configPath = path.join(targetDir, CONFIG_FILENAME);
    if (!inspection.hasConfigFile) {
      await atomicWrite(configPath, CONFIG_CONTENT);
      createdFiles.push(CONFIG_FILENAME);
      printResult("created", `${CONFIG_FILENAME} created.`);
    } else {
      const valid = await validateConfigFile(configPath);
      if (valid) {
        printResult("unchanged", `${CONFIG_FILENAME} already exists and is valid — preserved.`);
      } else {
        printResult("invalid", `${CONFIG_FILENAME} already exists but is malformed — left untouched.`);
      }
    }

    // Step 5: AI client configs — always extended, never overwritten
    if (opencode) {
      const result = await upsertOpenCodeConfig(targetDir);
      printResult(result.status, result.message);
      if (result.status === "created") {
        createdFiles.push(OPENCODE_CONFIG_FILENAME);
      }
    } else {
      printResult("skipped", "OpenCode config skipped.");
    }

    if (claude) {
      const result = await upsertClaudeConfig(targetDir);
      printResult(result.status, result.message);
      if (result.status === "created") {
        createdFiles.push(CLAUDE_MCP_FILENAME);
      }
    } else {
      printResult("skipped", "Claude Code config skipped.");
    }

    // Step 6: Workflow files — AGENTS.md for OpenCode, CLAUDE.md for Claude Code
    if (opencode) {
      const result = await upsertWorkflowFile(targetDir, AGENTS_FILENAME);
      printResult(result.status, result.message);
      if (result.status === "created") {
        createdFiles.push(AGENTS_FILENAME);
      }
    }

    if (claude) {
      const result = await upsertWorkflowFile(targetDir, CLAUDE_FILENAME);
      printResult(result.status, result.message);
      if (result.status === "created") {
        createdFiles.push(CLAUDE_FILENAME);
      }
    }

    // Done
    process.stderr.write("\n");

    // Summary
    process.stderr.write("  Created:\n");
    for (const file of createdFiles) {
      process.stderr.write(`    ${file}\n`);
    }
    for (const dir of createdDirs) {
      process.stderr.write(`    ${CONTEXT_DIR_NAME}/\n`);
    }

    process.stderr.write("\n  Next steps:\n");
    process.stderr.write(`    cd ${path.relative(process.cwd(), targetDir) || "."}\n`);
    process.stderr.write("    Restart OpenCode / Claude Code to load the OpenContext MCP server.\n");
  } catch (error) {
    // Rollback: remove created files and directories
    process.stderr.write("\n  Generation failed. Cleaning up...\n");
    for (const file of createdFiles) {
      try {
        await unlink(path.join(targetDir, file));
      } catch {
        // Ignore cleanup errors
      }
    }
    // Only remove context dir if we created it and it's empty
    for (const dir of createdDirs) {
      try {
        const entries = await readdir(dir);
        if (entries.length === 0) {
          const { rmdir } = await import("node:fs/promises");
          await rmdir(dir);
        }
      } catch {
        // Ignore cleanup errors
      }
    }
    throw error;
  }
}