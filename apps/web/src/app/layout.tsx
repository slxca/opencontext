import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://opencntx.dev"),
  title: {
    default: "OpenContext — Persistent Memory for AI Coding Agents",
    template: "%s | OpenContext",
  },
  description:
    "Persistent, project-local memory for AI coding agents. Exposes a lightweight MCP server that lets agents read and write durable markdown rules inside .opencontext/.",
  keywords: [
    "MCP",
    "Model Context Protocol",
    "AI coding agents",
    "context memory",
    "opencontext",
    "Cursor",
    "Claude",
    "OpenCode",
    "developer tools",
  ],
  authors: [{ name: "slxca" }],
  creator: "slxca",
  publisher: "slxca",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://opencntx.dev",
    siteName: "OpenContext",
    title: "OpenContext — Persistent Memory for AI Coding Agents",
    description:
      "Persistent, project-local memory for AI coding agents. Exposes a lightweight MCP server that lets agents read and write durable markdown rules inside .opencontext/.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "OpenContext",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenContext — Persistent Memory for AI Coding Agents",
    description:
      "Persistent, project-local memory for AI coding agents via MCP.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://opencntx.dev",
    languages: {
      "en-US": "https://opencntx.dev",
      "de-DE": "https://opencntx.dev/de",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full flex flex-col bg-black text-zinc-100">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
