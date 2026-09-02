"use client";

import { motion } from "framer-motion";

export default function ToolsPage() {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-white">Tools</h1>
        <p className="mt-4 text-lg text-zinc-400">
          MCP tools reference for OpenContext.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-12"
      >
        {/* save_context */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            save_context
          </h2>
          <p className="mb-4 text-zinc-400">
            Saves markdown content to{" "}
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
              .opencontext/&lt;topic&gt;.md
            </code>
            . Existing files are overwritten.
          </p>

          <h3 className="mb-2 text-lg font-medium text-white">Arguments</h3>
          <div className="mb-4 overflow-hidden rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Required
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="px-4 py-2 font-mono text-xs text-zinc-300">
                    topic
                  </td>
                  <td className="px-4 py-2 text-zinc-400">string</td>
                  <td className="px-4 py-2 text-zinc-400">yes</td>
                  <td className="px-4 py-2 text-zinc-400">
                    Lowercase snake_case or kebab-case topic name
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs text-zinc-300">
                    content
                  </td>
                  <td className="px-4 py-2 text-zinc-400">string</td>
                  <td className="px-4 py-2 text-zinc-400">yes</td>
                  <td className="px-4 py-2 text-zinc-400">
                    Markdown content to save
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mb-2 text-lg font-medium text-white">Example</h3>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">user input</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>Save our API conventions under topic api-contracts.</code>
            </pre>
          </div>
        </section>

        {/* read_context */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            read_context
          </h2>
          <p className="mb-4 text-zinc-400">
            Reads one saved topic, or lists all topics when no topic is provided.
          </p>

          <h3 className="mb-2 text-lg font-medium text-white">Arguments</h3>
          <div className="mb-4 overflow-hidden rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Required
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="px-4 py-2 font-mono text-xs text-zinc-300">
                    topic
                  </td>
                  <td className="px-4 py-2 text-zinc-400">string</td>
                  <td className="px-4 py-2 text-zinc-400">no</td>
                  <td className="px-4 py-2 text-zinc-400">
                    Topic to read. Omit to list all saved topics.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mb-2 text-lg font-medium text-white">Example</h3>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">user input</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>
                Read the architecture context before changing the routing layer.
              </code>
            </pre>
          </div>
        </section>

        {/* delete_context */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            delete_context
          </h2>
          <p className="mb-4 text-zinc-400">
            Deletes a saved topic file from disk. Automatically rebuilds the
            index when{" "}
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
              autoIndex
            </code>{" "}
            is enabled.
          </p>

          <h3 className="mb-2 text-lg font-medium text-white">Arguments</h3>
          <div className="mb-4 overflow-hidden rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Required
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="px-4 py-2 font-mono text-xs text-zinc-300">
                    topic
                  </td>
                  <td className="px-4 py-2 text-zinc-400">string</td>
                  <td className="px-4 py-2 text-zinc-400">yes</td>
                  <td className="px-4 py-2 text-zinc-400">
                    Lowercase snake_case or kebab-case topic name to delete
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mb-2 text-lg font-medium text-white">Behaviors</h3>
          <ul className="mb-4 list-disc space-y-1 pl-6 text-zinc-400">
            <li>
              Respects{" "}
              <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
                readOnly
              </code>{" "}
              and{" "}
              <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
                disabled
              </code>{" "}
              config modes.
            </li>
            <li>
              Removes{" "}
              <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
                .opencontext/&lt;topic&gt;.md
              </code>{" "}
              from disk.
            </li>
            <li>
              Triggers index rebuild if{" "}
              <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
                autoIndex
              </code>{" "}
              is true.
            </li>
            <li>
              Throws <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">INVALID_TOPIC</code> for
              malformed topic names.
            </li>
            <li>
              Throws <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">NOT_FOUND</code> if the
              topic does not exist.
            </li>
          </ul>

          <h3 className="mb-2 text-lg font-medium text-white">Example</h3>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">user input</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>
                Remove the deprecated auth-legacy topic since we migrated to
                the new auth flow.
              </code>
            </pre>
          </div>
        </section>

        {/* Version Control */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Version Control
          </h2>
          <p className="mb-4 text-zinc-400">
            You can commit{" "}
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
              .opencontext/
            </code>{" "}
            when it contains team-wide knowledge:
          </p>
          <div className="mb-4 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">terminal</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>git add .opencontext</code>
            </pre>
          </div>
          <p className="mb-4 text-zinc-400">
            Or ignore it when context should stay local:
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">.gitignore</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>.opencontext/</code>
            </pre>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
