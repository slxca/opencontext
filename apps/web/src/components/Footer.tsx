import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-black">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Image
            src="/logo_light.png"
            alt="OpenContext"
            width={160}
            height={32}
            className="h-8 w-auto"
          />
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/slxca/opencontext"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 transition-colors hover:text-zinc-300"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/opencontext-mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 transition-colors hover:text-zinc-300"
          >
            npm
          </a>
          <Link
            href="/imprint"
            className="text-xs text-zinc-400 transition-colors hover:text-zinc-300"
          >
            Imprint
          </Link>
          <Link
            href="/privacy-policy"
            className="text-xs text-zinc-400 transition-colors hover:text-zinc-300"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
