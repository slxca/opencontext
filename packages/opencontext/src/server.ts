import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContextStore } from "./context-store.js";
import { SERVER_NAME, SERVER_VERSION, getErrorMessage, textResult } from "./types.js";
import { loadConfig, type ResolvedConfig } from "./config.js";

/**
 * Creates and configures the OpenContext MCP server.
 * Registers all available tools (save_context, read_context).
 * @param basePath - Optional base directory (defaults to cwd)
 * @param config - Optional pre-loaded config (loads from disk if omitted)
 */
export async function createOpenContextServer(
  basePath?: string,
  config?: ResolvedConfig,
): Promise<McpServer> {
  const resolvedConfig = config ?? await loadConfig(basePath);
  const store = new ContextStore(basePath, resolvedConfig);

  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });

  server.registerTool(
    "save_context",
    {
      title: "Save Context",
      description: `Persist markdown project context, architectural rules, or decisions into ${resolvedConfig.path}/<topic>.md in the current working directory.`,
      inputSchema: {
        topic: z
          .string()
          .min(1)
          .describe(
            "Context topic name in snake_case or kebab-case, for example api_contracts or auth-rules.",
          ),
        content: z.string().min(1).describe("Markdown content to save for this project topic."),
      },
    },
    async ({ topic, content }) => {
      if (resolvedConfig.disabled) {
        return textResult("OpenContext is currently paused. Tool access is disabled via configuration.");
      }
      if (resolvedConfig.readOnly) {
        return textResult("OpenContext is in read-only mode. Write operations are disabled via configuration.", true);
      }
      try {
        const result = await store.saveContext(topic, content);
        return textResult(result);
      } catch (error) {
        return textResult(`OpenContext error: ${getErrorMessage(error)}`, true);
      }
    },
  );

  server.registerTool(
    "read_context",
    {
      title: "Read Context",
      description:
        "Read a saved OpenContext topic, or list all available topics when no topic is provided.",
      inputSchema: {
        topic: z
          .string()
          .min(1)
          .optional()
          .describe(
            "Optional topic name in snake_case or kebab-case. Omit to list all saved topics.",
          ),
      },
    },
    async ({ topic }) => {
      if (resolvedConfig.disabled) {
        return textResult("OpenContext is currently paused. Tool access is disabled via configuration.");
      }
      try {
        const result = await store.readContext(topic);
        return textResult(result);
      } catch (error) {
        return textResult(`OpenContext error: ${getErrorMessage(error)}`, true);
      }
    },
  );

  return server;
}
