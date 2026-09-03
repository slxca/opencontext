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

const CONFIG_FILENAME = ".opencontext.json";

/**
 * Merges a partial config object into a full one, recursing into nested
 * objects (e.g. history, guard) instead of replacing them wholesale.
 */
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
 * Loads configuration from .opencontext.json in the given directory.
 * Falls back to DEFAULT_CONFIG if no file exists or parsing fails.
 */
export async function loadConfig(cwd: string = process.cwd()): Promise<ResolvedConfig> {
  const filePath = path.join(cwd, CONFIG_FILENAME);

  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as OpenContextConfig;
    return deepMerge(DEFAULT_CONFIG, parsed);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return DEFAULT_CONFIG;
    }
    console.error(`OpenContext: failed to parse ${CONFIG_FILENAME}: ${(error as Error).message}`);
    return DEFAULT_CONFIG;
  }
}