"use client";

import { motion } from "framer-motion";

export default function WindsurfPage() {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Windsurf Integration
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Add OpenContext MCP to your Windsurf configuration.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-8"
      >
        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Configuration
          </h2>
          <p className="mb-4 text-zinc-400">
            Open Windsurf Settings → MCP and add a new MCP server:
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">mcp.json</span>
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
                  Open Windsurf Settings
                </h3>
                <p className="text-sm text-zinc-400">
                  Go to Settings → MCP in Windsurf.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-sm font-medium text-zinc-300">
                2
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  Add MCP Server
                </h3>
                <p className="text-sm text-zinc-400">
                  Click &quot;Add new MCP server&quot; and paste the JSON
                  configuration.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-sm font-medium text-zinc-300">
                3
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  Enable the server
                </h3>
                <p className="text-sm text-zinc-400">
                  Toggle the OpenContext server to enabled.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">Verify</h2>
          <p className="mb-4 text-zinc-400">
            After enabling, your agent can use OpenContext. Try asking:
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
