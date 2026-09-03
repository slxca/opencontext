"use client";

import { motion } from "framer-motion";

export default function ClaudePage() {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Claude Desktop Integration
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Add OpenContext MCP to your Claude Desktop configuration.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-8"
      >
        <section>
          <div className="mb-8 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <h3 className="text-sm font-medium text-white">
              One-command setup
            </h3>
            <p className="mt-1 text-sm text-zinc-400">
              Using Claude Code? Run{" "}
              <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
                npx -y opencontext-mcp init
              </code>{" "}
              in your project to create{" "}
              <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
                .mcp.json
              </code>{" "}
              with the OpenContext MCP entry automatically. The steps below are
              for Claude Desktop&apos;s global config.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Configuration
          </h2>
          <p className="mb-4 text-zinc-400">
            Edit your{" "}
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
              claude_desktop_config.json
            </code>{" "}
            file:
          </p>

          <div className="mb-4 space-y-2 text-sm text-zinc-400">
            <p>
              <strong className="text-zinc-300">macOS:</strong>{" "}
              <code className="font-mono text-xs text-zinc-300">
                ~/Library/Application Support/Claude/claude_desktop_config.json
              </code>
            </p>
            <p>
              <strong className="text-zinc-300">Windows:</strong>{" "}
              <code className="font-mono text-xs text-zinc-300">
                %APPDATA%\Claude\claude_desktop_config.json
              </code>
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">
                claude_desktop_config.json
              </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>{`{
  "mcpServers": {
    "opencontext": {
      "command": "npx",
      "args": ["-y", "opencontext-mcp"]
    }
  }
}`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">Steps</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-sm font-medium text-zinc-300">
                1
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  Open Claude Desktop config
                </h3>
                <p className="text-sm text-zinc-400">
                  Navigate to the config file location for your OS.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-sm font-medium text-zinc-300">
                2
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  Add MCP configuration
                </h3>
                <p className="text-sm text-zinc-400">
                  Add the mcpServers section as shown above.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-sm font-medium text-zinc-300">
                3
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  Restart Claude Desktop
                </h3>
                <p className="text-sm text-zinc-400">
                  Quit and reopen Claude Desktop to load the MCP server.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">Verify</h2>
          <p className="mb-4 text-zinc-400">
            After restarting, Claude Desktop will have access to OpenContext
            tools. Try asking:
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">example</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>{`"List all available context topics"
"Save our coding conventions under topic coding_rules"`}</code>
            </pre>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
