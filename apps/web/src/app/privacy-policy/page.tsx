import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for OpenContext MCP. Learn how we handle data with Vercel hosting and analytics.",
  alternates: {
    canonical: "https://opencntx.dev/privacy-policy",
    languages: {
      "de-DE": "https://opencntx.dev/de/privacy-policy",
    },
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-3xl flex-1 px-6 py-20">
        <div className="w-full">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
          >
            <span className="text-lg leading-none">&larr;</span>
            Back to Home
          </Link>

          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-full border border-zinc-800 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">
              English
            </span>
            <Link
              href="/de/privacy-policy"
              className="text-sm text-zinc-500 underline underline-offset-4 hover:text-zinc-300"
            >
              Deutsch
            </Link>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
            Legal
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            Privacy Policy
          </h1>

          <div className="mt-10 space-y-10 text-sm leading-7 text-zinc-400">
            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Controller
              </h2>
              <p>Luca-Chris Sträter</p>
              <p>
                Hildebrandweg 48
                <br />
                48429 Rheine
                <br />
                Deutschland
              </p>
              <p>
                E-Mail: hello@slxca.com
                <br />
                Telefon: +49 178 8029790
              </p>
              <p className="mt-2">
                Further legal information is available in the{" "}
                <Link
                  href="/imprint"
                  className="text-zinc-200 underline underline-offset-4 hover:text-white"
                >
                  imprint
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Hosting
              </h2>
              <p>
                This website is hosted on Vercel. When you access this website,
                Vercel may process technical connection data such as IP address,
                request headers, browser information, operating system, referrer,
                and access timestamps in server log files to provide the hosting
                service and ensure stability and security.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Vercel Analytics
              </h2>
              <p>
                This website uses Vercel Analytics to measure page usage and basic
                performance. In this context, aggregated usage information may be
                processed, for example page views, route performance, device type,
                browser metadata, and approximate geographic information derived
                from technical request data.
              </p>
              <p className="mt-2">
                The processing is used to understand how the site is used and to
                improve performance and content quality.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                No User Accounts
              </h2>
              <p>
                This website does not provide user accounts, comment forms, or a
                direct upload function. No additional personal data is collected
                on-site beyond the technically necessary hosting and analytics
                processing described above.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Your Rights
              </h2>
              <p>
                Depending on applicable law, you may have rights to access,
                rectify, delete, restrict, or object to the processing of your
                personal data. To exercise these rights, contact the responsible
                entity listed in the{" "}
                <Link
                  href="/imprint"
                  className="text-zinc-200 underline underline-offset-4 hover:text-white"
                >
                  imprint
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                More Information
              </h2>
              <p>
                Additional information about Vercel data processing can be found
                in the Vercel privacy documentation.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
