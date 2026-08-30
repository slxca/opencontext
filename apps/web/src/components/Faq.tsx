"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is OpenContext?",
    answer:
      "OpenContext is a Model Context Protocol (MCP) server that gives AI coding agents persistent, project-local memory. It lets agents save and read markdown files in a .opencontext/ directory inside each project.",
  },
  {
    question: "How does it work?",
    answer:
      "OpenContext exposes two tools via MCP: save_context and read_context. Agents use these to persist architectural decisions, coding rules, API contracts, and other durable knowledge as plain markdown files.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No installation is required. Configure your MCP client to run npx -y opencontext-mcp and it will start automatically.",
  },
  {
    question: "Which clients are supported?",
    answer:
      "OpenContext works with any MCP-compatible client including OpenCode, Cursor, Claude Desktop, and Windsurf.",
  },
  {
    question: "Is my data sent to the cloud?",
    answer:
      "No. All data stays local in your project's .opencontext/ directory. There is no cloud sync, no database, and no external accounts required.",
  },
  {
    question: "Can I commit .opencontext/ to git?",
    answer:
      "Yes. The files are plain markdown, so you can commit them for team-wide knowledge or add .opencontext/ to .gitignore for local-only context.",
  },
  {
    question: "What are the available tools?",
    answer:
      "save_context saves markdown content to .opencontext/<topic>.md. read_context reads a specific topic or lists all available topics when called without arguments.",
  },
  {
    question: "How do I configure OpenContext?",
    answer:
      "Create a .opencontext.jsonc or .opencontext.json file in your project root. You can customize the storage path, enable read-only mode, configure the write guard, and more.",
  },
];

export default function Faq() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Everything you need to know about OpenContext.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, i) => {
            const id = `faq-${i}`;
            const isExpanded = expandedId === id;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40"
              >
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : id)
                  }
                  className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-zinc-900/60"
                >
                  <span className="text-sm font-medium text-zinc-100">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-zinc-800/80 bg-zinc-950 p-5">
                        <p className="text-sm leading-relaxed text-zinc-400">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
