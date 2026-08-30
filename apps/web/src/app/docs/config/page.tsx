"use client";

import { motion } from "framer-motion";

const options = [
  {
    name: "path",
    type: "string",
    default: '".opencontext"',
    description: "Directory path for storing context files",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    description: "Disable write operations (save_context)",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Pause all tool access",
  },
  {
    name: "autoIndex",
    type: "boolean",
    default: "true",
    description: "Auto-generate index.md with topic metadata",
  },
  {
    name: "guard.enabled",
    type: "boolean",
    default: "true",
    description: "Enable write guard validation",
  },
  {
    name: "guard.maxFileSizeKb",
    type: "number",
    default: "50",
    description: "Maximum file size in KB",
  },
  {
    name: "guard.strictPatternCheck",
    type: "boolean",
    default: "true",
    description: "Check for forbidden prompt injection patterns",
  },
];

export default function ConfigPage() {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Configuration
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Customize OpenContext with a config file.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-8"
      >
        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">Config File</h2>
          <p className="mb-4 text-zinc-400">
            Create{" "}
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
              .opencontext.jsonc
            </code>{" "}
            or{" "}
            <code className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-sm text-zinc-300">
              .opencontext.json
            </code>{" "}
            in your project root:
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">
                .opencontext.jsonc
              </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm text-zinc-300">
              <code>{`{
  // Custom storage path
  "path": ".opencontext",

  // Disable write operations
  "readOnly": false,

  // Pause all tool access
  "disabled": false,

  // Auto-generate index.md
  "autoIndex": true,

  // Write guard settings
  "guard": {
    "enabled": true,
    "maxFileSizeKb": 50,
    "strictPatternCheck": true
  }
}`}</code>
            </pre>
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            Supports JSONC (JSON with Comments). If no config file exists,
            OpenContext uses sensible defaults.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">Options</h2>
          <div className="overflow-hidden rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Option
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-300">
                    Default
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
                    <td className="px-4 py-2 text-zinc-400">{option.type}</td>
                    <td className="px-4 py-2 font-mono text-xs text-zinc-500">
                      {option.default}
                    </td>
                    <td className="px-4 py-2 text-zinc-400">
                      {option.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Example Configs
          </h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-white">
                Read-only mode
              </h3>
              <pre className="font-mono text-xs text-zinc-400">
                {`{ "readOnly": true }`}
              </pre>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-white">
                Custom path
              </h3>
              <pre className="font-mono text-xs text-zinc-400">
                {`{ "path": ".project-context" }`}
              </pre>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <h3 className="mb-2 text-sm font-medium text-white">
                Strict guard
              </h3>
              <pre className="font-mono text-xs text-zinc-400">
                {`{ "guard": { "maxFileSizeKb": 100, "strictPatternCheck": true } }`}
              </pre>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
