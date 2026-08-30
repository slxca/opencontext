"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
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
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/slxca/opencontext"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar - Desktop */}
        <aside className="hidden w-56 shrink-0 border-r border-zinc-800/80 lg:block">
          <nav className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-4">
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

        {/* Mobile menu button */}
        <button
          className="fixed bottom-4 right-4 z-50 rounded-full border border-zinc-800 bg-zinc-900 p-3 shadow-lg lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5 text-zinc-400" />
          ) : (
            <Menu className="h-5 w-5 text-zinc-400" />
          )}
        </button>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, x: -280 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -280 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-y-0 left-0 z-40 w-64 border-r border-zinc-800 bg-black lg:hidden"
            >
              <div className="flex h-14 items-center border-b border-zinc-800 px-4">
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/80 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
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
