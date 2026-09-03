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
    default:
      "OpenContext - Git-Native Memory & MCP Server for AI Coding Agents",
    template: "%s | OpenContext - Git-Native AI Agent Memory",
  },
  description:
    "Persistent, zero-cloud Model Context Protocol (MCP) server for Cursor, OpenCode, and Claude. Track project context in plain markdown with ADR-style frontmatter directly inside Git.",
  keywords: [
    "OpenContext",
    "OpenContext MCP",
    "MCP Server",
    "AI agent memory",
    "Cursor memory",
    "OpenCode MCP",
    "persistent context",
    "Model Context Protocol",
    "local agent memory",
  ],
  authors: [{ name: "slxca" }],
  creator: "slxca",
  publisher: "slxca",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://opencntx.dev",
    siteName: "OpenContext",
    title: "OpenContext - Git-Native Memory & MCP Server for AI Coding Agents",
    description:
      "Persistent, zero-cloud Model Context Protocol (MCP) server for Cursor, OpenCode, and Claude. Track project context in plain markdown with ADR-style frontmatter directly inside Git.",
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
    title: "OpenContext - Git-Native Memory & MCP Server for AI Coding Agents",
    description:
      "Persistent, zero-cloud Model Context Protocol (MCP) server for Cursor, OpenCode, and Claude. Track project context in plain markdown with ADR-style frontmatter directly inside Git.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OpenContext",
  operatingSystem: "Cross-platform",
  applicationCategory: "DeveloperApplication",
  url: "https://opencntx.dev",
  downloadUrl: "https://www.npmjs.com/package/opencontext-mcp",
  sameAs: [
    "https://github.com/slxca/opencontext",
    "https://www.npmjs.com/package/opencontext-mcp",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-zinc-100">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
