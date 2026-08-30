"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, FileText, PlugZap, TerminalSquare } from "lucide-react";
import CopyButton from "./CopyButton";

const steps = [
  { id: 0, label: "Configure Client" },
  { id: 1, label: "Verify Connection" },
  { id: 2, label: "Ingest Codebase" },
] as const;

const clients = [
  {
    id: "opencode",
    label: "OpenCode",
    path: "opencode.json / project MCP settings",
    code: `{
  "mcp": {
    "opencontext": {
      "type": "local",
      "command": ["npx", "-y", "opencontext-mcp"],
      "enabled": true
    }
  }
}`,
  },
  {
    id: "cursor",
    label: "Cursor",
    path: "~/.cursor/mcp.json",
    code: `{
  "mcpServers": {
    "opencontext": {
      "command": "npx",
      "args": ["-y", "opencontext-mcp"]
    }
  }
}`,
  },
  {
    id: "claude",
    label: "Claude Desktop",
    path: "claude_desktop_config.json",
    code: `{
  "mcpServers": {
    "opencontext": {
      "command": "npx",
      "args": ["-y", "opencontext-mcp"]
    }
  }
}`,
  },
] as const;

const bootstrapPrompt = `You are an expert software architect. Your task is to analyze this entire codebase and document its core architectural rules, patterns, and decisions using OpenContext MCP.

Execute the following steps:
1. Scan the project structure, configuration files (e.g. package.json, tsconfig, env examples), dependencies, and core directories.
2. Identify durable architectural patterns:
   - Primary tech stack and runtime conventions
   - Coding standards and file naming conventions
   - State management, API contracts, and database patterns
   - Authentication/authorization flows (if present)
3. For each core topic identified, call the \`save_context\` tool to persist the findings under clear kebab-case topic names (e.g., \`tech-stack\`, \`code-style\`, \`architecture\`, \`api-conventions\`).
4. Keep the documentation concise, factual, and strictly in Markdown.

Begin your analysis now.`;

const diagnosticLines = [
  "[MCP] Initializing StdioServerTransport...",
  '[MCP] Server "opencontext-mcp" v0.1.0 online.',
  "[MCP] Registered tools: save_context, read_context",
];

export default function GetStartedWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeClient, setActiveClient] = useState<(typeof clients)[number]["id"]>(
    "opencode",
  );

  const currentClient = clients.find((client) => client.id === activeClient) ?? clients[0];
  const canGoBack = activeStep > 0;
  const canGoForward = activeStep < steps.length - 1;

  return (
    <section id="quickstart" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center sm:mb-12"
        >
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Get Started in 3 Steps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-400 sm:text-base">
            Go from zero-install setup to a codebase with durable, searchable
            memory in one guided workflow.
          </p>
        </motion.div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-3 sm:rounded-3xl sm:p-4 md:p-6">
          {/* Step nav */}
          <div className="grid grid-cols-3 gap-1.5 border-b border-zinc-800/80 pb-3 sm:gap-3 sm:pb-4">
            {steps.map((step, index) => {
              const isActive = activeStep === index;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`rounded-xl border px-2 py-2 text-left transition-colors sm:rounded-2xl sm:px-4 sm:py-3 ${
                    isActive
                      ? "border-zinc-700 bg-black text-white"
                      : "border-zinc-800 bg-zinc-950/60 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                  }`}
                >
                  <div className="font-mono text-[10px] tracking-[0.18em] sm:text-xs">
                    {String(index + 1).padStart(2, "0")}.
                  </div>
                  <div className="mt-1 text-xs font-medium sm:mt-2 sm:text-sm">
                    {step.label}
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="pt-4 sm:pt-6"
            >
              {activeStep === 0 && (
                <div className="space-y-3 sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2 lg:gap-6">
                  {/* Left card */}
                  <div className="rounded-xl border border-zinc-800 bg-black/40 p-3 sm:rounded-2xl sm:p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
                      Step 01
                    </p>
                    <h3 className="mt-1.5 text-base font-semibold text-zinc-100 sm:mt-3 sm:text-2xl">
                      Add OpenContext to your MCP Client
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-zinc-400 sm:mt-4 sm:text-sm sm:leading-7">
                      Add the OpenContext MCP entry to your client configuration.
                      No global install is required. Your client launches the
                      server via <code className="font-mono text-zinc-300">npx</code>
                      {" "}over <code className="font-mono text-zinc-300">stdio</code>.
                    </p>
                    <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950/70 p-2.5 sm:mt-6 sm:rounded-xl sm:p-4">
                      <p className="font-mono text-[10px] text-zinc-500 sm:text-xs">Core command</p>
                      <code className="mt-1 block font-mono text-xs text-zinc-200 sm:mt-2 sm:text-sm">
                        {'["npx", "-y", "opencontext-mcp"]'}
                      </code>
                    </div>
                  </div>

                  {/* Right card */}
                  <div className="rounded-xl border border-zinc-800 bg-black/40 p-3 sm:rounded-2xl sm:p-6">
                    <div className="mb-2 flex flex-wrap gap-1 sm:mb-4 sm:gap-2">
                      {clients.map((client) => {
                        const isActive = client.id === activeClient;

                        return (
                          <button
                            key={client.id}
                            onClick={() => setActiveClient(client.id)}
                            className={`rounded-lg border px-2.5 py-1 text-[11px] transition-colors sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm ${
                              isActive
                                ? "border-zinc-700 bg-black text-white"
                                : "border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                            }`}
                          >
                            {client.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mb-2 rounded-lg border border-zinc-800 bg-zinc-950/70 p-2.5 sm:mb-4 sm:rounded-xl sm:p-4">
                      <p className="font-mono text-[10px] text-zinc-500 sm:text-xs">Config path</p>
                      <p className="mt-0.5 break-all text-[11px] text-zinc-300 sm:mt-1 sm:text-sm">{currentClient.path}</p>
                      <span className="mt-1.5 inline-block rounded-full border border-zinc-800 bg-black px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500 sm:mt-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
                        Transport: stdio
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/70 sm:rounded-xl">
                      <div className="flex items-center justify-between border-b border-zinc-800/80 px-2.5 py-1.5 sm:px-4 sm:py-3">
                        <span className="font-mono text-[10px] text-zinc-500 sm:text-xs">
                          {currentClient.label} config
                        </span>
                        <CopyButton
                          text={currentClient.code}
                          label="Copy JSON"
                          copiedLabel="Copied!"
                        />
                      </div>
                      <pre className="overflow-x-auto p-2.5 font-mono text-[11px] leading-4 text-zinc-400 sm:p-5 sm:text-sm sm:leading-6">
                        {currentClient.code}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="space-y-3 sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2 lg:gap-6">
                  <div className="rounded-xl border border-zinc-800 bg-black/40 p-3 sm:rounded-2xl sm:p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
                      Step 02
                    </p>
                    <h3 className="mt-1.5 text-base font-semibold text-zinc-100 sm:mt-3 sm:text-2xl">
                      Restart & Verify Connection
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-zinc-400 sm:mt-4 sm:text-sm sm:leading-7">
                      Restart your MCP client. Your AI agent should automatically
                      discover the two native tools <code className="font-mono text-zinc-300">save_context</code>
                      {" "}and <code className="font-mono text-zinc-300">read_context</code>.
                    </p>
                    <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950/70 p-2.5 sm:mt-6 sm:rounded-xl sm:p-4">
                      <p className="font-mono text-[10px] text-zinc-500 sm:text-xs">Quick test</p>
                      <p className="mt-1 text-xs leading-5 text-zinc-300 sm:mt-2 sm:text-sm sm:leading-7">
                        Ask your agent:{" "}
                        <span className="font-mono">
                          {`"Which MCP tools do you have available?"`}
                        </span>
                        {" "}to confirm registration.
                      </p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/70 sm:rounded-2xl">
                    <div className="flex items-center justify-between border-b border-zinc-800/80 px-2.5 py-1.5 sm:px-4 sm:py-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <PlugZap className="h-3.5 w-3.5 text-zinc-500 sm:h-4 sm:w-4" />
                        <span className="font-mono text-[10px] text-zinc-500 sm:text-xs">
                          connection.log
                        </span>
                      </div>
                      <span className="rounded-full border border-zinc-800 bg-black px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500 sm:px-2.5 sm:py-1 sm:text-[10px]">
                        Connected
                      </span>
                    </div>
                    <div className="space-y-1.5 p-2.5 font-mono text-[11px] leading-5 text-zinc-300 sm:space-y-3 sm:p-5 sm:text-sm sm:leading-7">
                      {diagnosticLines.map((line) => (
                        <div key={line} className="flex gap-1.5 sm:gap-3">
                          <TerminalSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-600 sm:h-4 sm:w-4" />
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-3 sm:space-y-0 sm:grid sm:gap-4 sm:grid-cols-2 lg:gap-6">
                  <div className="rounded-xl border border-zinc-800 bg-black/40 p-3 sm:rounded-2xl sm:p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
                      Step 03
                    </p>
                    <h3 className="mt-1.5 text-base font-semibold text-zinc-100 sm:mt-3 sm:text-2xl">
                      Bootstrap Codebase Context
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-zinc-400 sm:mt-4 sm:text-sm sm:leading-7">
                      Run this one-time ingestion prompt to let your agent
                      inspect the repository and generate the initial
                      <code className="ml-1 font-mono text-zinc-300">.opencontext/</code>
                      {" "}topics.
                    </p>
                    <div className="mt-3 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/70 p-2.5 sm:mt-6 sm:rounded-xl sm:p-4">
                      <p className="font-mono text-[10px] text-zinc-500 sm:text-xs">Generated topics</p>
                      <pre className="mt-1.5 font-mono text-[11px] leading-5 text-zinc-300 sm:mt-3 sm:text-sm sm:leading-7">
                        <span className="text-zinc-100">.opencontext/</span>
                        {"\n"}
                        <span className="inline-flex items-center gap-1.5">
                          <FileText className="h-3 w-3 text-zinc-600" />
                          <span>tech-stack.md</span>
                        </span>
                        {"\n"}
                        <span className="inline-flex items-center gap-1.5">
                          <FileText className="h-3 w-3 text-zinc-600" />
                          <span>architecture.md</span>
                        </span>
                        {"\n"}
                        <span className="inline-flex items-center gap-1.5">
                          <FileText className="h-3 w-3 text-zinc-600" />
                          <span>coding-rules.md</span>
                        </span>
                      </pre>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/70 sm:rounded-2xl">
                    <div className="flex items-center justify-between gap-2 border-b border-zinc-800/80 px-2.5 py-1.5 sm:px-4 sm:py-3">
                      <span className="truncate rounded-md border border-zinc-800 bg-black px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 sm:px-3 sm:py-1 sm:text-xs">
                        bootstrap-prompt.md
                      </span>
                      <CopyButton
                        text={bootstrapPrompt}
                        label="Copy"
                        copiedLabel="Copied!"
                        className="border-zinc-800 bg-white text-black hover:border-zinc-700 hover:bg-zinc-200 hover:text-black"
                      />
                    </div>
                    <div className="overflow-x-auto p-2.5 font-mono text-[11px] leading-5 text-zinc-300 sm:p-5 sm:text-sm sm:leading-7">
                      {bootstrapPrompt.split("\n").map((line, index) => (
                        <div key={`${index}-${line}`} className="flex">
                          <span className="mr-2 inline-block w-5 shrink-0 select-none text-right text-zinc-600 sm:mr-4 sm:w-8">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="whitespace-pre">
                            {line || " "}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          <div className="mt-4 flex items-center justify-between border-t border-zinc-800/80 pt-3 sm:mt-6 sm:pt-4">
            <button
              onClick={() => canGoBack && setActiveStep((step) => step - 1)}
              disabled={!canGoBack}
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-black disabled:cursor-not-allowed disabled:opacity-40 sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
            >
              <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Previous
            </button>
            <button
              onClick={() => canGoForward && setActiveStep((step) => step + 1)}
              disabled={!canGoForward}
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-800 bg-white px-3 py-1.5 text-xs text-black transition-colors hover:border-zinc-700 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:bg-zinc-900 disabled:text-zinc-500 sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
