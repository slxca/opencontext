"use client";

import { motion } from "framer-motion";
import { Save, BookOpen } from "lucide-react";

const tools = [
  {
    icon: Save,
    name: "save_context",
    description:
      "Persists a markdown context entry under .opencontext/ with the given topic name. Auto-creates the directory if it doesn't exist. Overwrites existing files with the same topic name.",
    params: [
      {
        name: "topic",
        type: "string",
        desc: "Topic name used as the filename. Use kebab-case or snake_case (e.g. \"architecture\" creates architecture.md).",
      },
      {
        name: "content",
        type: "string",
        desc: "Full markdown content to write. Supports headers, lists, code blocks, and all standard markdown.",
      },
    ],
    note: "File is overwritten on each call. Latest state always wins.",
  },
  {
    icon: BookOpen,
    name: "read_context",
    description:
      "Reads a specific topic file or discovers all available topics when called without arguments. Returns raw markdown content.",
    params: [
      {
        name: "topic",
        type: "string (optional)",
        desc: "Topic name to retrieve. Omit entirely to list all available topic filenames.",
      },
    ],
    note: "Returns markdown string or array of topic names.",
  },
];

export default function ToolsGrid() {
  return (
    <section id="tools" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Two Lightweight MCP Tools
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Minimal surface area. Maximum utility. Every tool your agent needs.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 transition-colors group-hover:border-zinc-600 group-hover:bg-zinc-800/80">
                  <tool.icon className="h-5 w-5 text-zinc-400 group-hover:text-zinc-200" />
                </div>
                <h3 className="font-mono text-lg font-semibold text-zinc-100">
                  {tool.name}
                </h3>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                {tool.description}
              </p>

              <div className="mb-4 space-y-3">
                {tool.params.map((param) => (
                  <div key={param.name} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <code className="rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-xs text-zinc-300">
                        {param.name}
                      </code>
                      <span className="font-mono text-[10px] text-zinc-600">
                        {param.type}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500">{param.desc}</p>
                  </div>
                ))}
              </div>

              {tool.note && (
                <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-500">
                  {tool.note}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
