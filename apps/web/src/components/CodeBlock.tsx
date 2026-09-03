"use client";

import CopyButton from "./CopyButton";

type CodeBlockProps = {
  code: string;
  label?: string;
  className?: string;
  preClassName?: string;
};

export default function CodeBlock({
  code,
  label,
  className = "",
  preClassName = "",
}: CodeBlockProps) {
  return (
    <div
      className={
        "overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 " +
        className
      }
    >
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/80 px-4 py-3">
        <span className="font-mono text-xs text-zinc-400">{label}</span>
        <CopyButton text={code} />
      </div>
      <pre
        className={
          "overflow-x-auto p-5 font-mono text-sm leading-6 text-zinc-400 " +
          preClassName
        }
      >
        {code}
      </pre>
    </div>
  );
}
