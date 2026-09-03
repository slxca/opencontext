"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    title: "save_context",
    description: "Save markdown context to .opencontext/<topic>.md",
    href: "/docs/tools",
  },
  {
    title: "read_context",
    description: "Read one saved topic or list all available topics",
    href: "/docs/tools",
  },
  {
    title: "Auto-Index",
    description: "Automatic index.md generation with topic metadata",
    href: "/docs/config",
  },
  {
    title: "Write Guard",
    description: "Input validation, size limits, and prompt injection protection",
    href: "/docs/guard",
  },
  {
    title: "Remote Access (HTTP)",
    description: "Serve the MCP server over the network",
    href: "/docs/http",
  },
];

const integrations = [
  { name: "OpenCode", href: "/docs/opencode" },
  { name: "Cursor", href: "/docs/cursor" },
  { name: "Claude Desktop", href: "/docs/claude" },
  { name: "Windsurf", href: "/docs/windsurf" },
];

export default function DocsPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-white">
          OpenContext Docs
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Persistent, project-local memory for AI coding agents.
        </p>
        <p className="mt-2 text-zinc-500">
          Most coding agents lose important decisions between sessions.
          OpenContext solves that by exposing a lightweight MCP server that lets
          agents save and read markdown files in a local{" "}
          <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
            .opencontext/
          </code>{" "}
          directory.
        </p>
      </motion.div>

      {/* Quick Start */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="mb-4 text-xl font-semibold text-white">Quick Start</h2>
        <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="ml-2 text-xs text-zinc-500">terminal</span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
            <code>npx -y opencontext-mcp</code>
          </pre>
        </div>
        <Link
          href="/docs/quickstart"
          className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200"
        >
          Full quickstart guide
          <span className="text-zinc-600">→</span>
        </Link>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="mb-4 text-xl font-semibold text-white">Features</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            >
              <Link
                href={feature.href}
                className="block rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800/50"
              >
                <h3 className="mb-1 text-sm font-medium text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400">{feature.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Integrations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="mb-4 text-xl font-semibold text-white">Integrations</h2>
        <div className="flex flex-wrap gap-3">
          {integrations.map((integration, i) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
            >
              <Link
                href={integration.href}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
              >
                {integration.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How it works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="mb-4 text-xl font-semibold text-white">How It Works</h2>
        <div className="space-y-4 text-zinc-400">
          <p>
            OpenContext stores files relative to the process working directory
            used by your MCP client:
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">project</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>{`your-project/
  .opencontext/
    architecture.md
    api-contracts.md
    coding_rules.md`}</code>
            </pre>
          </div>
          <p>
            Topics must be lowercase{" "}
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
              snake_case
            </code>{" "}
            or{" "}
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
              kebab-case
            </code>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
