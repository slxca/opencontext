"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function GuidePage() {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Agent Guide
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          How to implement OpenContext in your AI agents.
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
            System Prompt Instructions
          </h2>
          <p className="mb-4 text-zinc-400">
            Add these instructions to your agent&apos;s system prompt to enable
            OpenContext usage:
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">system prompt</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>{`Always use read_context before making code changes.
First list available topics, then read any topic
relevant to the task.

Use save_context whenever you learn a durable
project rule, architectural decision, convention,
API contract, or debugging note that future agents
should know.

Prefer small, focused context topics in snake_case
or kebab-case. Keep the content concise, factual,
and written in markdown.`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Recommended Workflow
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-sm font-medium text-zinc-300">
                1
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  Analyze & Save Context
                </h3>
                <p className="text-sm text-zinc-400">
                  Ask an architect agent to analyze the project and save durable
                  decisions with <code>save_context</code>.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-sm font-medium text-zinc-300">
                2
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  Read Before Coding
                </h3>
                <p className="text-sm text-zinc-400">
                  Ask build agents to call <code>read_context</code> before
                  making changes.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-sm font-medium text-zinc-300">
                3
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  Update When Learning
                </h3>
                <p className="text-sm text-zinc-400">
                  Let agents update context when they discover something that
                  should survive the current chat.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-sm font-medium text-zinc-300">
                4
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  Review Like Docs
                </h3>
                <p className="text-sm text-zinc-400">
                  Review{" "}
                  <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-xs text-zinc-300">
                    .opencontext/
                  </code>{" "}
                  files like normal project documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Common Patterns
          </h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-white">
                Architecture Decisions
              </h3>
              <pre className="font-mono text-xs text-zinc-400">
                {`Topic: architecture
Content: "We use Next.js App Router with server components
by default. Client components only when interactions
require useState/useEffect."`}
              </pre>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-white">
                API Contracts
              </h3>
              <pre className="font-mono text-xs text-zinc-400">
                {`Topic: api-contracts
Content: "All API routes return { data, error } format.
Use 400 for validation, 401 for auth, 500 for server
errors. Pagination uses cursor-based approach."`}
              </pre>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-white">
                Coding Rules
              </h3>
              <pre className="font-mono text-xs text-zinc-400">
                {`Topic: coding_rules
Content: "- Use const over let when possible
- Prefer early returns over nested ifs
- Name booleans with is/has/can prefix
- Keep functions under 30 lines"`}
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Pre-built Agents
          </h2>
          <p className="mb-4 text-zinc-400">
            We provide ready-to-use agent prompts for common workflows:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs/agents#plan"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
            >
              Plan Agent
              <span className="text-zinc-500">→</span>
            </Link>
            <Link
              href="/docs/agents#build"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
            >
              Build Agent
              <span className="text-zinc-500">→</span>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Topic Lifecycle &amp; ADR-Style Frontmatter
          </h2>
          <p className="mb-4 text-zinc-400">
            Topics support optional YAML frontmatter to track their lifecycle
            status — useful when decisions evolve over time and old context
            should be visible but clearly flagged as outdated.
          </p>

          <h3 className="mb-2 text-lg font-medium text-white">
            Frontmatter Fields
          </h3>
          <div className="mb-4 overflow-hidden rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Field
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="px-4 py-2 font-mono text-xs text-zinc-300">
                    description
                  </td>
                  <td className="px-4 py-2 text-zinc-400">string</td>
                  <td className="px-4 py-2 text-zinc-400">
                    Short summary used in the auto-generated index
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs text-zinc-300">
                    status
                  </td>
                  <td className="px-4 py-2 text-zinc-400">
                    active | deprecated | superseded
                  </td>
                  <td className="px-4 py-2 text-zinc-400">
                    Lifecycle status. Defaults to active when omitted.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs text-zinc-300">
                    supersedes
                  </td>
                  <td className="px-4 py-2 text-zinc-400">string</td>
                  <td className="px-4 py-2 text-zinc-400">
                    Topic name this topic replaces (used by the newer topic)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs text-zinc-300">
                    superseded_by
                  </td>
                  <td className="px-4 py-2 text-zinc-400">string</td>
                  <td className="px-4 py-2 text-zinc-400">
                    Topic name that replaced this one (used by the older topic)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mb-2 text-lg font-medium text-white">Example</h3>
          <div className="mb-4 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">
                auth-v2.md (newer topic)
              </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>{`---
description: OAuth2 + PKCE authentication flow
status: active
supersedes: auth-legacy
---

# Authentication v2

Migrated from JWT to OAuth2 with PKCE.`}</code>
            </pre>
          </div>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">
                auth-legacy.md (older topic)
              </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>{`---
description: JWT-based authentication (no longer used)
status: superseded
superseded_by: auth-v2
---

# Legacy Auth

Deprecated in favor of auth-v2.`}</code>
            </pre>
          </div>

          <p className="mt-4 text-zinc-400">
            The auto-generated{" "}
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
              index.md
            </code>{" "}
            will display badges like{" "}
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
              [DEPRECATED]
            </code>{" "}
            and{" "}
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
              [SUPERSEDED]
            </code>{" "}
            next to non-active topics, along with cross-references showing
            which topic replaced or was replaced.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
