import { readFile, writeFile, unlink, rename } from "node:fs/promises";

/**
 * Writes a file atomically using a temp-then-rename pattern.
 * @param filePath - Target file path
 * @param content - File content
 */
export async function atomicWrite(filePath: string, content: string): Promise<void> {
  const tmpPath = filePath + ".tmp";
  try {
    await writeFile(tmpPath, content, "utf8");
    await rename(tmpPath, filePath);
  } catch (error) {
    // Clean up temp file on failure
    try {
      await unlink(tmpPath);
    } catch {
      // Ignore cleanup errors
    }
    throw error;
  }
}

/**
 * Validates an existing .opencontext.json file.
 * Leaves the file content untouched; only reports whether it parses.
 * @returns true when the existing config is parseable JSON
 */
export async function validateConfigFile(filePath: string): Promise<boolean> {
  try {
    const raw = await readFile(filePath, "utf8");
    JSON.parse(raw);
    return true;
  } catch {
    return false;
  }
}