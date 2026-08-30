import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-black">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="OpenContext"
              width={24}
              height={24}
              className="rounded-md"
            />
            <span className="font-sans text-base font-semibold text-zinc-300">
              OpenContext
            </span>
          </div>
          <p className="text-xs text-zinc-600">
            MIT License · Built for developers who care about context
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/slxca/opencontext"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/opencontext-mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            npm
          </a>
          <Link
            href="/imprint"
            className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            Imprint
          </Link>
          <Link
            href="/privacy-policy"
            className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
