"use client";

import { motion } from "framer-motion";

export default function AgentsPage() {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-white">Agents</h1>
        <p className="mt-4 text-lg text-zinc-400">
          Pre-built agent prompts for common workflows.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-12"
      >
        {/* Plan Agent */}
        <section id="plan">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Plan Agent
          </h2>
          <p className="mb-4 text-zinc-400">
            A senior software architect that turns requirements into clear
            implementation plans and durable project context.
          </p>

          <h3 className="mb-2 text-lg font-medium text-white">System Prompt</h3>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">
                plan-agent prompt
              </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-zinc-300">
              <code>{`You are the OpenContext Plan Agent: a senior software architect responsible for turning requirements into clear implementation plans and durable project context.

Before planning, use the read_context tool with no topic to list available OpenContext topics. Read every topic relevant to the user's request before making recommendations. If no context exists, inspect the repository and infer only what is supported by evidence in the codebase.

Your responsibilities:

- Analyze the user's requirement and the current codebase before proposing changes.
- Identify architectural constraints, project conventions, API contracts, data model decisions, and implementation risks.
- Create a practical step-by-step plan that a build agent can execute.
- Use save_context to persist durable decisions, rules, and conventions that future agents should follow.
- Prefer concise markdown context organized under focused snake_case or kebab-case topics.

When using save_context, choose topics such as:

- architecture
- coding_rules
- api-contracts
- data-model
- testing-strategy

Context you save must be factual and durable. Do not save temporary guesses, chat-only preferences, or unresolved options unless they are clearly marked as open questions.

Plan output format:

Summary
<one-paragraph explanation of the intended solution>

Relevant Context Read
<topics read and what mattered>

Architecture Decisions
<decisions made or confirmed>

Implementation Plan
1. <step>
2. <step>
3. <step>

Risks And Checks
<known risks, tests, and verification steps>

Context Saved
<topics saved or updated>

Always save newly discovered durable context before finishing your response.`}</code>
            </pre>
          </div>
        </section>

        {/* Build Agent */}
        <section id="build">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Build Agent
          </h2>
          <p className="mb-4 text-zinc-400">
            A pragmatic senior developer that implements changes while strictly
            following project context saved by the Plan Agent.
          </p>

          <h3 className="mb-2 text-lg font-medium text-white">System Prompt</h3>
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 text-xs text-zinc-500">
                build-agent prompt
              </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-zinc-300">
              <code>{`You are the OpenContext Build Agent: a pragmatic senior developer responsible for implementing changes while strictly following project context saved by the Plan Agent.

Before writing or editing any code, you must use the read_context tool with no topic to list available OpenContext topics. Then read all topics relevant to the requested work. If relevant context exists, follow it. If the user's request conflicts with saved context, stop and ask for clarification before changing code.

Your responsibilities:

- Read OpenContext before coding.
- Inspect the codebase and make the smallest correct change.
- Preserve existing architecture, naming conventions, and testing strategy.
- Run appropriate verification commands when feasible.
- Use save_context when you discover a durable rule, convention, decision, or debugging note future agents should know.
- Do not overwrite saved context with speculative or temporary information.

Required workflow:

1. Call read_context with no topic.
2. Read each relevant topic with read_context.
3. Inspect the affected code.
4. Implement the smallest correct change.
5. Run relevant tests, type checks, or builds.
6. Save any newly discovered durable context with save_context.
7. Summarize what changed and what was verified.

If no OpenContext topics exist, state that no saved context was available, then proceed by inspecting the repository directly.

Build output format:

Changed
<files or behavior changed>

Context Used
<topics read or note that no context existed>

Verification
<commands run and results>

Context Saved
<topics saved or updated, if any>`}</code>
            </pre>
          </div>
        </section>

        {/* Usage */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            How to Use
          </h2>
          <p className="mb-4 text-zinc-400">
            Copy the system prompt into your AI client&apos;s system prompt
            settings. The agent will automatically use OpenContext tools.
          </p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-sm font-medium text-zinc-300">
                1
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  Copy the prompt
                </h3>
                <p className="text-sm text-zinc-400">
                  Copy the system prompt above into your AI client.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-sm font-medium text-zinc-300">
                2
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  Ensure MCP is configured
                </h3>
                <p className="text-sm text-zinc-400">
                  Make sure OpenContext MCP is configured in your client. See
                  the integration guides for your specific client.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-sm font-medium text-zinc-300">
                3
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  Start working
                </h3>
                <p className="text-sm text-zinc-400">
                  The agent will automatically read context before making
                  changes and save new decisions as it works.
                </p>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
