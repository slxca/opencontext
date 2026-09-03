import { readdir } from "node:fs/promises";
import { CONFIG_FILENAME, CONTEXT_DIR_NAME } from "./constants.js";

/** Result of inspecting the target directory. */
export interface InspectionResult {
  /** Absolute path to the target directory. */
  targetDir: string;
  /** Whether .opencontext.json already exists. */
  hasConfigFile: boolean;
  /** Whether .opencontext/ directory already exists. */
  hasContextDir: boolean;
  /** Whether the directory is non-empty (excluding dotfiles). */
  isNonEmpty: boolean;
  /** Detected package manager, if any. */
  packageManager: string | null;
  /** Node.js version string. */
  nodeVersion: string;
}

/**
 * Inspects the target directory for existing configuration and environment.
 * @param targetDir - Absolute path to inspect
 * @returns InspectionResult with findings
 */
export async function inspectTargetDir(targetDir: string): Promise<InspectionResult> {
  let entries: string[] = [];
  try {
    entries = await readdir(targetDir);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      // Directory doesn't exist — that's fine, we'll create it
      return {
        targetDir,
        hasConfigFile: false,
        hasContextDir: false,
        isNonEmpty: false,
        packageManager: null,
        nodeVersion: process.version,
      };
    }
    throw error;
  }

  const hasConfigFile = entries.includes(CONFIG_FILENAME);
  const hasContextDir = entries.includes(CONTEXT_DIR_NAME);

  // Filter out dotfiles and common non-user files for emptiness check
  const userFiles = entries.filter(
    (e) => !e.startsWith(".") && e !== "node_modules",
  );
  const isNonEmpty = userFiles.length > 0;

  const packageManager = detectPackageManager(entries);

  return {
    targetDir,
    hasConfigFile,
    hasContextDir,
    isNonEmpty,
    packageManager,
    nodeVersion: process.version,
  };
}

function detectPackageManager(entries: string[]): string | null {
  if (entries.includes("pnpm-lock.yaml")) return "pnpm";
  if (entries.includes("yarn.lock")) return "yarn";
  if (entries.includes("package-lock.json")) return "npm";
  if (entries.includes("bun.lockb")) return "bun";
  if (entries.includes("Cargo.toml")) return "cargo";
  if (entries.includes("go.mod")) return "go";
  return null;
}