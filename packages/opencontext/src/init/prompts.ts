import * as readline from "node:readline/promises";

/**
 * Prompts the user for a yes/no answer.
 * @param rl - Readline interface
 * @param message - Prompt message
 * @param defaultYes - Default answer when the user presses Enter
 * @returns true if user confirms
 */
export async function promptForConfirm(
  rl: readline.Interface,
  message: string,
  defaultYes = false,
): Promise<boolean> {
  const hint = defaultYes ? "Y/n" : "y/N";
  const answer = await rl.question(`${message} (${hint}): `);
  const trimmed = answer.trim().toLowerCase();
  if (trimmed === "") {
    return defaultYes;
  }
  return trimmed === "y" || trimmed === "yes";
}