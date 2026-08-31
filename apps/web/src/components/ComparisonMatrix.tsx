"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

type CellValue = string | { icon: boolean; label: string };

const features: { name: string; opencontext: CellValue; cursorrules: CellValue; vectorRAG: CellValue; agentMemory: CellValue }[] = [
  {
    name: "Storage Layer",
    opencontext: "Local Markdown (.opencontext/)",
    cursorrules: "Single giant config file",
    vectorRAG: "Cloud / Local Vector DB",
    agentMemory: "Hidden session cache",
  },
  {
    name: "Token Consumption",
    opencontext: "~100 token index (on-demand)",
    cursorrules: "Wastes tokens on every prompt",
    vectorRAG: "Varies (large raw chunks)",
    agentMemory: "Unpredictable context bloat",
  },
  {
    name: "Determinism & Edits",
    opencontext: "100% deterministic (Git diffs)",
    cursorrules: "Static only",
    vectorRAG: "Hallucinates outdated vectors",
    agentMemory: "Stale / lost on restart",
  },
  {
    name: "Git & PR Reviewable",
    opencontext: { icon: true, label: "Native commit history" },
    cursorrules: { icon: true, label: "Monolithic file only" },
    vectorRAG: { icon: false, label: "Opaque external database" },
    agentMemory: { icon: false, label: "Ephemeral memory" },
  },
  {
    name: "Zero Cloud / Privacy",
    opencontext: { icon: true, label: "100% Local (Stdio MCP)" },
    cursorrules: { icon: true, label: "Local file" },
    vectorRAG: { icon: false, label: "Requires third-party APIs" },
    agentMemory: { icon: false, label: "Tied to vendor platform" },
  },
];

function CellValue({ value }: { value: CellValue }) {
  if (typeof value === "object") {
    return (
      <span className="inline-flex items-center gap-2">
        {value.icon ? (
          <Check className="h-4 w-4 shrink-0 text-emerald-400" />
        ) : (
          <X className="h-4 w-4 shrink-0 text-zinc-500" />
        )}
        <span className="text-sm text-zinc-300">{value.label}</span>
      </span>
    );
  }
  return <span className="text-sm text-zinc-300">{value}</span>;
}

export default function ComparisonMatrix() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            How OpenContext Compares
          </h2>
          <p className="mt-3 text-lg text-zinc-400">
            A technical breakdown of architecture trade-offs.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-800/80">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/80">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Feature / Architecture
                </th>
                <th className="border-zinc-700 bg-zinc-900/30 px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-300">
                  OpenContext
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Massive .cursorrules
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Vector RAG Plugins
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Internal Agent Memory
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {features.map((feature) => (
                <tr key={feature.name} className="transition-colors hover:bg-zinc-900/20">
                  <td className="px-6 py-4 text-sm font-medium text-white">
                    {feature.name}
                  </td>
                  <td className="border-l border-zinc-700 bg-zinc-900/30 px-6 py-4">
                    <CellValue value={feature.opencontext} />
                  </td>
                  <td className="px-6 py-4">
                    <CellValue value={feature.cursorrules} />
                  </td>
                  <td className="px-6 py-4">
                    <CellValue value={feature.vectorRAG} />
                  </td>
                  <td className="px-6 py-4">
                    <CellValue value={feature.agentMemory} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  );
}
