"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarNav = [
  {
    title: "Getting Started",
    items: [
      { label: "Intro", href: "/docs" },
      { label: "Quickstart", href: "/docs/quickstart" },
      { label: "Configuration", href: "/docs/config" },
    ],
  },
  {
    title: "Integration",
    items: [
      { label: "OpenCode", href: "/docs/opencode" },
      { label: "Cursor", href: "/docs/cursor" },
      { label: "Claude Desktop", href: "/docs/claude" },
      { label: "Windsurf", href: "/docs/windsurf" },
    ],
  },
  {
    title: "Reference",
    items: [
      { label: "Tools", href: "/docs/tools" },
      { label: "Guard System", href: "/docs/guard" },
      { label: "Agent Guide", href: "/docs/guide" },
    ],
  },
  {
    title: "Agents",
    items: [
      { label: "Plan Agent", href: "/docs/agents#plan" },
      { label: "Build Agent", href: "/docs/agents#build" },
    ],
  },
];

function SidebarLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative block px-3 py-1.5 text-sm transition-colors ${
        isActive
          ? "text-white"
          : "text-zinc-400 hover:text-zinc-200"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-md bg-zinc-800/50"
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </Link>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex shrink-0 items-center">
              <Image
                src="/logo_light.png"
                alt="OpenContext"
                width={120}
                height={24}
                className="h-6 w-auto"
                priority
              />
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              <Link
                href="/"
                className="rounded-md px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                Home
              </Link>
              <Link
                href="/docs"
                className="rounded-md px-3 py-1.5 text-sm text-white"
              >
                Docs
              </Link>
            </nav>
          </div>
          <div className="hidden items-center md:flex">
            <a
              href="https://github.com/slxca/opencontext"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/50 px-2.5 py-1.5 text-xs text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200"
            >
              <span>GitHub</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
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
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar - Desktop */}
        <aside className="hidden w-56 shrink-0 border-r border-zinc-800/80 lg:block">
          <nav className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4">
            {sidebarNav.map((group) => (
              <div key={group.title} className="mb-6">
                <h4 className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  {group.title}
                </h4>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <SidebarLink
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      isActive={pathname === item.href}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-30 bg-black/80 lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-y-0 left-0 z-40 w-64 border-r border-zinc-800 bg-black lg:hidden"
              >
                <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-4">
                  <Link
                    href="/"
                    className="flex items-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Image
                      src="/logo_light.png"
                      alt="OpenContext"
                      width={120}
                      height={24}
                      className="h-6 w-auto"
                    />
                  </Link>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="text-zinc-400"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="overflow-y-auto p-4">
                  {sidebarNav.map((group) => (
                    <div key={group.title} className="mb-6">
                      <h4 className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                        {group.title}
                      </h4>
                      <div className="space-y-0.5">
                        {group.items.map((item) => (
                          <SidebarLink
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            isActive={pathname === item.href}
                            onClick={() => setMobileOpen(false)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
                <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-800 bg-black p-4">
                  <a
                    href="https://github.com/slxca/opencontext"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-400"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
