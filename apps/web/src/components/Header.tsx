"use client";

import { useState } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Quickstart", href: "/#quickstart" },
  { label: "FAQ", href: "/#faq" },
  { label: "Docs", href: "/docs" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo - Left */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo_light.png"
            alt="OpenContext"
            width={160}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav - Center */}
        <nav className="hidden items-center justify-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions - Right */}
        <div className="hidden items-center md:flex">
          <a
            href="https://github.com/slxca/opencontext"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/50 px-2.5 py-1.5 text-xs text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200"
          >
            <span>GitHub</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="flex items-center md:hidden text-zinc-400"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute left-0 right-0 top-full z-50 overflow-hidden border-b border-zinc-800/80 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4">
                <a
                  href="https://github.com/slxca/opencontext"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-400"
                >
                  <span>GitHub</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
