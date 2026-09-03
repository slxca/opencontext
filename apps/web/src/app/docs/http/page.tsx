"use client";

import { motion } from "framer-motion";

const options = [
  {
    name: "--http",
    description: "Serve over HTTP using the Streamable HTTP transport",
  },
  {
    name: "--port <port>",
    description: "HTTP port (default: 3032)",
  },
  {
    name: "--host <host>",
    description: "Interface to bind (default: 127.0.0.1)",
  },
];

export default function HttpPage() {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Remote Access (HTTP)
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Expose the OpenContext MCP server over the network.
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
            Start the Server
          </h2>
          <p className="mb-4 text-zinc-400">
            By default OpenContext runs over stdio. Pass{" "}
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
              --http
            </code>{" "}
            to serve the MCP endpoint over HTTP. The endpoint URL is printed to
            stderr on startup:
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">terminal</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>{`opencontext-mcp --http
[opencontext] v1.2.1 active. http://127.0.0.1:3032/mcp`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">Options</h2>
          <div className="overflow-hidden rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Flag
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {options.map((option) => (
                  <tr key={option.name}>
                    <td className="px-4 py-2 font-mono text-xs text-zinc-300">
                      {option.name}
                    </td>
                    <td className="px-4 py-2 text-zinc-400">
                      {option.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-white">
                Custom port
              </h3>
              <pre className="font-mono text-xs text-zinc-400">
                {`opencontext-mcp server --http --port 8787`}
              </pre>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-white">
                Bind to all interfaces
              </h3>
              <pre className="font-mono text-xs text-zinc-400">
                {`opencontext-mcp server --http --host 0.0.0.0`}
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Endpoint &amp; Behavior
          </h2>
          <p className="mb-4 text-zinc-400">
            The server listens at{" "}
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
              {"http://<host>:<port>/mcp"}
            </code>{" "}
            using the stateless Streamable HTTP transport — each request is
            handled in isolation, no sessions are tracked in memory.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-400">
            <li>
              <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-xs text-zinc-300">
                POST /mcp
              </code>{" "}
              — send JSON-RPC messages (initialize, tools/list, tools/call).
            </li>
            <li>
              <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-xs text-zinc-300">
                GET /
              </code>{" "}
              — returns basic server info, handy for a browser health check.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Connect an MCP Client
          </h2>
          <p className="mb-4 text-zinc-400">
            Point any MCP client that supports the Streamable HTTP transport at
            the printed URL. OpenCode:
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">opencode.json</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>{`{
  "mcp": {
    "opencontext": {
      "type": "http",
      "url": "http://127.0.0.1:3032/mcp",
      "enabled": true
    }
  }
}`}</code>
            </pre>
          </div>
          <p className="mt-4 mb-4 text-zinc-400">
            Claude Desktop / Cursor:
          </p>
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
      "type": "http",
      "url": "http://127.0.0.1:3032/mcp"
    }
  }
}`}</code>
            </pre>
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            Run the server with{" "}
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-xs text-zinc-300">
              --host 0.0.0.0
            </code>{" "}
            to make it reachable from other machines on your network.
          </p>
        </section>
      </motion.div>
    </div>
  );
}