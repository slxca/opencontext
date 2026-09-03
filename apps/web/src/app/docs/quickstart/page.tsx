"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function QuickstartPage() {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Quickstart
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Get up and running in 5 minutes.
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
            1. Prerequisites
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-zinc-400">
            <li>Node.js 20 or later</li>
            <li>An MCP-compatible client</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            2. One-command setup
          </h2>
          <p className="mb-4 text-zinc-400">
            Run the interactive init command inside your project:
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">terminal</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>npx -y opencontext-mcp init</code>
            </pre>
          </div>
          <p className="mt-4 text-zinc-400">
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
              init
            </code>{" "}
            asks whether to enable OpenCode and Claude Code integration, then
            creates{" "}
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
              .opencontext/
            </code>
            ,{" "}
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
              .opencontext.json
            </code>
            , and wires up the MCP server entries for your clients automatically.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            3. Or configure manually
          </h2>
          <p className="mb-4 text-zinc-400">
            Prefer to wire things up by hand? Choose your client and add the MCP
            configuration:
          </p>

          <div className="space-y-4">
            <Link
              href="/docs/opencode"
              className="block rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800/50"
            >
              <h3 className="text-sm font-medium text-white">OpenCode</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Add to opencode.json configuration
              </p>
            </Link>
            <Link
              href="/docs/cursor"
              className="block rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800/50"
            >
              <h3 className="text-sm font-medium text-white">Cursor</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Add to MCP settings in Cursor
              </p>
            </Link>
            <Link
              href="/docs/claude"
              className="block rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800/50"
            >
              <h3 className="text-sm font-medium text-white">
                Claude Desktop
              </h3>
              <p className="mt-1 text-sm text-zinc-400">
                Add to claude_desktop_config.json
              </p>
            </Link>
            <Link
              href="/docs/windsurf"
              className="block rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800/50"
            >
              <h3 className="text-sm font-medium text-white">Windsurf</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Add to Windsurf MCP configuration
              </p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            4. Restart your client
          </h2>
          <p className="text-zinc-400">
            After the setup, restart your MCP client to load the OpenContext
            server.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            5. Start using
          </h2>
          <p className="mb-4 text-zinc-400">
            Your agent can now save and read context. Try asking:
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-400">example</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>{`"Save our API conventions under topic api-contracts"
"Read the architecture context before changing the routing layer"`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Next Steps
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs/config"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
            >
              Configuration
              <span className="text-zinc-400">→</span>
            </Link>
            <Link
              href="/docs/tools"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
            >
              Tools Reference
              <span className="text-zinc-400">→</span>
            </Link>
            <Link
              href="/docs/agents"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
            >
              Agent Prompts
              <span className="text-zinc-400">→</span>
            </Link>
          </div>
        </section>
      </motion.div>
    </div>
  );
}