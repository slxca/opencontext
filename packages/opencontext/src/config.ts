import { readFile } from "node:fs/promises";
import * as path from "node:path";

export interface OpenContextConfig {
  $schema?: string;
  path?: string;
  readOnly?: boolean;
  disabled?: boolean;
  autoIndex?: boolean;
  history?: {
    enabled?: boolean;
    maxBackupsPerTopic?: number;
    retentionDays?: number;
  };
  guard?: {
    enabled?: boolean;
    maxFileSizeKb?: number;
    strictPatternCheck?: boolean;
  };
}

export type ResolvedConfig = Required<Omit<OpenContextConfig, "$schema">>;

export const DEFAULT_CONFIG: ResolvedConfig = {
  path: ".opencontext",
  readOnly: false,
  disabled: false,
  autoIndex: true,
  history: {
    enabled: false,
    maxBackupsPerTopic: 5,
    retentionDays: 7,
  },
  guard: {
    enabled: true,
    maxFileSizeKb: 50,
    strictPatternCheck: true,
  },
};

const CONFIG_CANDIDATES = [".opencontext.jsonc", ".opencontext.json"] as const;

/**
 * Strips JSONC content into parseable JSON by removing comments and trailing commas.
 * Handles single-line (//), multi-line (/* * /), and trailing commas.
 * Trailing comma removal is token-aware to avoid modifying string literals.
 */
function stripJsonComments(raw: string): string {
  let result = "";
  let i = 0;
  const len = raw.length;

  while (i < len) {
    const ch = raw[i];

    // Strings: copy verbatim (including escaped characters)
    if (ch === '"') {
      result += ch;
      i++;
      while (i < len && raw[i] !== '"') {
        if (raw[i] === "\\") {
          result += raw[i];
          i++;
        }
        if (i < len) {
          result += raw[i];
          i++;
        }
      }
      if (i < len) {
        result += raw[i]; // closing quote
        i++;
      }
      continue;
    }

    // Single-line comment: skip until newline
    if (ch === "/" && i + 1 < len && raw[i + 1] === "/") {
      while (i < len && raw[i] !== "\n") {
        i++;
      }
      continue;
    }

    // Multi-line comment: skip until */
    if (ch === "/" && i + 1 < len && raw[i + 1] === "*") {
      i += 2;
      while (i < len - 1 && !(raw[i] === "*" && raw[i + 1] === "/")) {
        i++;
      }
      i += 2; // skip */
      continue;
    }

    // Trailing comma: skip comma if followed by optional whitespace/comments then } or ]
    if (ch === ",") {
      let j = i + 1;
      // Skip whitespace and comments to find the next meaningful token
      while (j < len) {
        if (raw[j] === " " || raw[j] === "\t" || raw[j] === "\n" || raw[j] === "\r") {
          j++;
        } else if (raw[j] === "/" && j + 1 < len && raw[j + 1] === "/") {
          while (j < len && raw[j] !== "\n") j++;
        } else if (raw[j] === "/" && j + 1 < len && raw[j + 1] === "*") {
          j += 2;
          while (j < len - 1 && !(raw[j] === "*" && raw[j + 1] === "/")) j++;
          j += 2;
        } else {
          break;
        }
      }
      if (j < len && (raw[j] === "}" || raw[j] === "]")) {
        i = j; // skip comma and whitespace/comments, continue from closing bracket
        continue;
      }
      // Not a trailing comma — keep it
      result += ch;
      i++;
      continue;
    }

    result += ch;
    i++;
  }

  return result;
}

function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const key of Object.keys(source) as Array<keyof T>) {
    const sourceVal = source[key];
    const targetVal = result[key];
    if (
      sourceVal !== null &&
      typeof sourceVal === "object" &&
      !Array.isArray(sourceVal) &&
      targetVal !== null &&
      typeof targetVal === "object" &&
      !Array.isArray(targetVal)
    ) {
      (result as Record<string, unknown>)[key as string] = deepMerge(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>,
      );
    } else if (sourceVal !== undefined) {
      result[key] = sourceVal as T[typeof key];
    }
  }
  return result;
}

/**
 * Loads configuration from .opencontext.jsonc or .opencontext.json in the given directory.
 * Falls back to DEFAULT_CONFIG if no file exists or parsing fails.
 */
export async function loadConfig(cwd: string = process.cwd()): Promise<ResolvedConfig> {
  for (const filename of CONFIG_CANDIDATES) {
    const filePath = path.join(cwd, filename);
    try {
      const raw = await readFile(filePath, "utf8");
      const cleaned = stripJsonComments(raw);
      const parsed = JSON.parse(cleaned) as OpenContextConfig;
      return deepMerge(DEFAULT_CONFIG, parsed);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        continue; // file doesn't exist, try next candidate
      }
      console.error(`OpenContext: failed to parse ${filename}: ${(error as Error).message}`);
      return DEFAULT_CONFIG;
    }
  }

  return DEFAULT_CONFIG;
}
