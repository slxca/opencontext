import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ContextStore } from "./context-store.js";
import { SERVER_NAME, SERVER_VERSION, getErrorMessage, textResult } from "./types.js";

export function createOpenContextServer(basePath?: string): McpServer {
  const store = new ContextStore(basePath);

  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });

  server.registerTool(
    "save_context",
    {
      title: "Save Context",
      description:
        "Persist markdown project context, architectural rules, or decisions into .opencontext/<topic>.md in the current working directory.",
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
