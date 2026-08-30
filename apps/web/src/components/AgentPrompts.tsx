"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileCode, Hammer } from "lucide-react";
import CodeBlock from "./CodeBlock";

const prompts = [
  {
    id: "plan",
    icon: FileCode,
    label: "Plan Agent (Architect)",
    subtitle: "Analyze requirements, shape the plan, then persist durable rules",
    prompt: `You are a Plan Agent. Your job is to analyze requirements, inspect the codebase, and save durable project decisions through OpenContext MCP.

## Instructions

1. Start by calling \`read_context\` to load existing architecture, conventions, and saved rules.
2. Build a step-by-step plan before implementation work begins.
3. When you establish a durable architectural rule, call \`save_context\` under the appropriate topic.
4. Always document the **why**, tradeoffs, and constraints, not just the outcome.

## Save Guidelines

- Use descriptive topic names: \`architecture\`, \`api-contracts\`, \`coding_rules\`, \`auth-flow\`
- Format as concise markdown with headings, bullets, and short examples
- Overwrite existing topics only when the decision has actually changed

## Example

\`\`\`
save_context({
  topic: "auth-flow",
  content: "# Authentication\\n\\nWe use JWT with refresh tokens...\\n\\n## Access Token\\n- 15min expiry\\n- Stored in memory\\n\\n## Refresh Token\\n- 7-day expiry\\n- HttpOnly cookie"
})
\`\`\`

Your goal is to create a living project memory that future agents can rely on immediately.`,
  },
  {
    id: "build",
    icon: Hammer,
    label: "Build Agent (Developer)",
    subtitle: "Read context first, then generate code that matches project rules",
    prompt: `You are a Build Agent. You write code, implement features, and fix bugs. You NEVER generate code without first understanding the project's conventions.

## Critical Rules

1. **ALWAYS call \`read_context\` first** at the start of every session to load project conventions.
2. **NEVER skip reading context** — even if you think you know the answer.
3. If \`read_context\` returns no results, ask the user before proceeding.

## Context-Driven Development

- **Before writing code**: Read \`coding_rules\`, \`architecture\`, and any relevant topic.
- **Before creating files**: Read \`api-contracts\` to understand interfaces.
- **After major changes**: Call \`save_context\` to update the knowledge base.

## Code Generation Rules

- Follow the exact patterns found in existing code.
- Respect naming conventions documented in \`coding_rules\`.
- Use the same libraries and frameworks — do not introduce new dependencies.
- Mirror the project's error handling and logging patterns.

## Example

\`\`\`
// Start of session
read_context()  // Load all topics

// When implementing a new endpoint
read_context({ topic: "api-contracts" })  // Check existing contracts

// After implementing
save_context({
  topic: "api-contracts",
  content: "# API Contracts\\n\\n... (updated with new endpoint)"
})
\`\`\`

Your goal is to write code that is consistent, maintainable, and aligned with every decision made by the team.`,
  },
];

export default function AgentPrompts() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const universalSnippet =
    "Always use read_context before modifying code. Use save_context when establishing durable rules or API contracts.";

  return (
    <section id="agents" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Agent Workflows & Ready Prompts
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            OpenContext becomes useful when your agents are explicitly told when
            to read and write durable memory. Drop these prompts into your
            planning and implementation workflows.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mx-auto mb-8 max-w-3xl"
        >
          <CodeBlock
            label="universal-system-instruction.txt"
            code={universalSnippet}
            preClassName="whitespace-pre-wrap text-sm"
          />
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-4">
          {prompts.map((prompt, i) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40"
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === prompt.id ? null : prompt.id)
                }
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-zinc-900/60"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800">
                    <prompt.icon className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      {prompt.label}
                    </h3>
                    <p className="text-xs text-zinc-500">{prompt.subtitle}</p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-zinc-500 transition-transform duration-300 ${
                    expandedId === prompt.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {expandedId === prompt.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-zinc-800/80 bg-zinc-950 p-6">
                      <CodeBlock
                        label={`${prompt.id}.prompt.md`}
                        code={prompt.prompt}
                        className="rounded-lg border-zinc-800/60 bg-zinc-900/50"
                        preClassName="whitespace-pre-wrap text-xs leading-6"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
