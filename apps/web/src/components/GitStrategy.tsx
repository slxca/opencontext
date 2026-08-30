"use client";

import { motion } from "framer-motion";
import { GitBranch, Lock } from "lucide-react";

const cards = [
  {
    icon: GitBranch,
    title: "Shared Team Memory",
    code: "git add .opencontext",
    description:
      "Commit plain markdown rules to the repository so architecture decisions, API contracts, and coding conventions stay visible to the whole team and can be reviewed in CI.",
  },
  {
    icon: Lock,
    title: "Local Private Notes",
    code: ".opencontext/",
    description:
      "Keep scratchpads, debugging notes, and developer-specific rules local by adding the directory to .gitignore. The workflow stays transparent without sharing personal context.",
  },
];

export default function GitStrategy() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Git Strategy
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Choose whether OpenContext becomes shared project memory or a purely
            local working layer.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 transition-colors hover:border-zinc-700 hover:bg-zinc-900/70"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800">
                  <card.icon className="h-5 w-5 text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100">
                    {card.title}
                  </h3>
                  <code className="font-mono text-xs text-zinc-500">
                    {card.code}
                  </code>
                </div>
              </div>
              <p className="text-sm leading-7 text-zinc-400">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
