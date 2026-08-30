"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Brain,
  HelpCircle,
  FileText,
  CheckCircle,
  GitBranch,
} from "lucide-react";

const problems = [
  {
    icon: Brain,
    title: "Session context vanishes",
    description:
      "Agents lose all memory of prior decisions, conventions, and architecture between sessions.",
  },
  {
    icon: AlertTriangle,
    title: "Architectural rules get broken",
    description:
      "Without persistent rules, agents re-implement patterns that conflict with your codebase.",
  },
  {
    icon: HelpCircle,
    title: "Agents re-ask conventions",
    description:
      '"Should I use Zod or Yup?" — the same question, every session, no memory of past answers.',
  },
];

const solutions = [
  {
    icon: FileText,
    title: "Plain .md storage in your repo",
    description:
      "Plain markdown files that persist across every session. Agents read before acting.",
  },
  {
    icon: CheckCircle,
    title: "Zero cloud or account lock-in",
    description:
      "Open any .opencontext/ file in your editor. Human-readable, machine-readable, no magic.",
  },
  {
    icon: GitBranch,
    title: "Team-wide alignment via Git",
    description:
      "Commit shared rules to your repo, or .gitignore for private local context. Your choice.",
  },
];

export default function ValueProp() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Without vs. With OpenContext
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            AI agents are powerful — but only if they remember what matters.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Without */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800">
                <AlertTriangle className="h-5 w-5 text-zinc-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100">
                Without Memory
              </h3>
            </div>
            <div className="space-y-6">
              {problems.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900">
                    <item.icon className="h-3.5 w-3.5 text-zinc-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-200">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 text-sm leading-relaxed text-zinc-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* With */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-zinc-700 bg-zinc-900/50 p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-600 bg-zinc-800">
                <CheckCircle className="h-5 w-5 text-zinc-200" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100">
                With OpenContext
              </h3>
            </div>
            <div className="space-y-6">
              {solutions.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800">
                    <item.icon className="h-3.5 w-3.5 text-zinc-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-200">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 text-sm leading-relaxed text-zinc-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
