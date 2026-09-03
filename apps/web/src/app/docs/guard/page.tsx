"use client";

import { motion } from "framer-motion";

const validations = [
  {
    title: "Empty Content",
    description: "Prevents saving blank or whitespace-only files",
  },
  {
    title: "Payload Too Large",
    description: "Configurable max file size (default 50KB)",
  },
  {
    title: "Invalid Topics",
    description: "Enforces snake_case or kebab-case naming",
  },
  {
    title: "Path Traversal",
    description: 'Blocks "..", absolute paths, and directory escapes',
  },
  {
    title: "Reserved Topics",
    description: "Prevents overwriting system files like index.md",
  },
  {
    title: "Prompt Injection",
    description: "Detects and blocks common injection patterns",
  },
];

const errorCodes = [
  { code: "EMPTY_CONTENT", description: "Content is empty or whitespace only" },
  {
    code: "PAYLOAD_TOO_LARGE",
    description: "Content exceeds maxFileSizeKb",
  },
  {
    code: "INVALID_TOPIC",
    description: "Topic name doesn't match required pattern",
  },
  {
    code: "PATH_TRAVERSAL",
    description: "Topic contains path traversal attempts",
  },
  {
    code: "RESERVED_TOPIC",
    description: "Topic is reserved by the system",
  },
  {
    code: "FORBIDDEN_PATTERN",
    description: "Content contains prompt injection patterns",
  },
];

export default function GuardPage() {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Guard System
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Input validation and protection for your context storage.
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
            What It Protects
          </h2>
          <p className="mb-4 text-zinc-400">
            The write guard validates all inputs before saving context. Enable
            or disable it in your config:
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">
                .opencontext.json
              </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>{`{
  "guard": {
    "enabled": true,
    "maxFileSizeKb": 50,
    "strictPatternCheck": true
  }
}`}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">Validations</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {validations.map((validation, i) => (
              <motion.div
                key={validation.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
              >
                <h3 className="mb-1 text-sm font-medium text-white">
                  {validation.title}
                </h3>
                <p className="text-sm text-zinc-400">{validation.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">Error Codes</h2>
          <div className="overflow-hidden rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Code
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {errorCodes.map((error) => (
                  <tr key={error.code}>
                    <td className="px-4 py-2 font-mono text-xs text-zinc-300">
                      {error.code}
                    </td>
                    <td className="px-4 py-2 text-zinc-400">
                      {error.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Forbidden Patterns
          </h2>
          <p className="mb-4 text-zinc-400">
            When <code>strictPatternCheck</code> is enabled, the guard detects
            these prompt injection patterns:
          </p>
          <div className="space-y-2">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
              <code className="text-sm text-zinc-300">
                ignore (all) (previous|prior) instructions
              </code>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
              <code className="text-sm text-zinc-300">
                system: override
              </code>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
              <code className="text-sm text-zinc-300">
                bypass (safety|guardrails?|system prompt)
              </code>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
