"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {FileText, ExternalLink, FolderTree, BookIcon, BookOpenIcon, GitBranch} from "lucide-react";
import CopyButton from "./CopyButton";
import Link from "next/link";

const markdownLines = [
  "# Architecture",
  "",
  "## Authentication",
  "",
  "We use **JWT with refresh tokens**.",
  "",
  "### Access Token",
  "- 15-minute expiry",
  "- Stored in memory only",
  "",
  "### Refresh Token",
  "- 7-day expiry",
  "- HttpOnly secure cookie",
  "- Rotated on each use",
];

export default function Hero() {
  const [typedChars, setTypedChars] = useState(0);
  const cmd = "npx -y opencontext-mcp";

  useEffect(() => {
    if (typedChars < cmd.length) {
      const t = setTimeout(() => setTypedChars(typedChars + 1), 50);
      return () => clearTimeout(t);
    }
  }, [typedChars, cmd.length]);

  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap justify-center gap-3"
        >
          <Link href={"https://github.com/slxca/opencontext/releases/tag/v1.2.0"} target={"_blank"} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800/80 sm:text-[11px]">
            <GitBranch className="h-3 w-3" />
            v1.2.0 Released — Structured Frontmatter & Context Deletion
          </Link>
        </motion.div>

        {/* Headline */}
        <motion.h1
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-3xl text-center text-4xl font-bold tracking-tight text-white md:text-6xl md:leading-[1.1]"
        >
            <span className="block text-base md:text-lg font-mono text-black font-medium mb-3 uppercase tracking-wider">
              OpenContext MCP
            </span>
          Stop your coding agents from forgetting your architecture.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-zinc-400 md:text-xl"
        >
          A Model Context Protocol (MCP) server that gives Cursor, OpenCode, and
          Claude persistent, project-local memory. Track architecture decisions
          in plain markdown with ADR-style frontmatter directly inside Git—no
          cloud, no vector hallucinations.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-stretch"
        >
          <div className="flex h-12 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-1 py-1">
            <div className="flex items-center gap-3 pl-4 font-mono text-sm text-zinc-300">
              <span className="text-zinc-400">$</span>
              <span>
                {cmd.slice(0, typedChars)}
                {typedChars < cmd.length && (
                  <span className="inline-block h-4 w-0.5 animate-pulse bg-white align-middle" />
                )}
              </span>
            </div>
            <CopyButton
              text="npx -y opencontext-mcp"
              className="h-full border-zinc-800 bg-white text-black hover:border-zinc-700 hover:bg-zinc-200 hover:text-black"
            />
          </div>
          <a
            href="/docs"
            className="flex h-12 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-6 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800"
          >
            Read the Docs
            <BookOpenIcon className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/slxca/opencontext"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            ★ Star on GitHub
          </a>
        </motion.div>

        {/* Split Terminal Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-2xl shadow-black/80"
        >
          <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-zinc-700" />
            <div className="h-3 w-3 rounded-full bg-zinc-700" />
            <div className="h-3 w-3 rounded-full bg-zinc-700" />
            <div className="ml-3 flex min-w-0 items-center gap-2 overflow-hidden rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-500">
              <FolderTree className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
              <span className="truncate text-zinc-400">project / .opencontext</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800/80">
            {/* Left: Folder tree */}
            <div className="p-6">
              <div className="mb-3 flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="rounded border border-zinc-800 bg-zinc-900 px-2 py-1">
                  tree
                </span>
                <span>.opencontext</span>
              </div>
              <pre className="font-mono text-sm leading-7">
                <span className="text-zinc-100">.opencontext/</span>
                {"\n"}
                <span className="text-zinc-500">{"  "}</span>
                <span className="inline-flex items-center gap-2 text-zinc-400">
                  <FileText className="inline h-3.5 w-3.5 text-zinc-500" />
                  <span>├── architecture.md</span>
                </span>
                {"\n"}
                <span className="text-zinc-500">{"  "}</span>
                <span className="inline-flex items-center gap-2 text-zinc-400">
                  <FileText className="inline h-3.5 w-3.5 text-zinc-500" />
                  <span>├── api-contracts.md</span>
                </span>
                {"\n"}
                <span className="text-zinc-500">{"  "}</span>
                <span className="inline-flex items-center gap-2 text-zinc-400">
                  <FileText className="inline h-3.5 w-3.5 text-zinc-500" />
                  <span>└── coding_rules.md</span>
                </span>
              </pre>
            </div>

            {/* Right: Markdown preview */}
            <div className="p-6">
              <div className="mb-3 flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="rounded border border-zinc-800 bg-zinc-900 px-2 py-1">
                  preview
                </span>
                architecture.md
              </div>
              <pre className="font-mono text-sm leading-6 text-zinc-400">
                {markdownLines.map((line, i) => (
                  <div key={i} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="select-none text-right text-zinc-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {line.startsWith("##") || line.startsWith("###") ? (
                      <span className="text-zinc-200 font-medium">{line}</span>
                    ) : line.startsWith("- ") ? (
                      <span>
                        <span className="text-zinc-500">- </span>
                        {line.slice(2)}
                      </span>
                    ) : line.startsWith("**") ? (
                      <span className="text-zinc-200">{line}</span>
                    ) : (
                      <span>{line}</span>
                    )}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
