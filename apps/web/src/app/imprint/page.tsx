import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Imprint",
  description:
    "Legal information and imprint for OpenContext MCP, operated by Luca-Chris Sträter in Rheine, Germany.",
  alternates: {
    canonical: "https://opencntx.dev/imprint",
    languages: {
      "de-DE": "https://opencntx.dev/de/imprint",
    },
  },
};

export default function ImprintPage() {
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
              href="/de/imprint"
              className="text-sm text-zinc-500 underline underline-offset-4 hover:text-zinc-300"
            >
              Deutsch
            </Link>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
            Legal
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Imprint</h1>

          <div className="mt-10 space-y-10 text-sm leading-7 text-zinc-400">
            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Information according to § 5 DDG
              </h2>
              <p>Luca-Chris Sträter</p>
              <p>
                Hildebrandweg 48
                <br />
                48429 Rheine
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Contact
              </h2>
              <p>
                Phone: +49-1788029790
                <br />
                Email: hello@slxca.com
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Consumer dispute resolution / Universal arbitration board
              </h2>
              <p>
                We do not participate in dispute resolution proceedings before a
                consumer arbitration board and are not obliged to do so.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Liability for links
              </h2>
              <p>
                Our offer contains links to external websites of third parties on
                whose contents we have no influence. Therefore, we cannot assume
                any liability for these external contents. The respective provider
                or operator of the pages is always responsible for the content of
                the linked pages. The linked pages were checked for possible legal
                violations at the time of linking. Illegal contents were not
                recognizable at the time of linking. However, a permanent
                monitoring of the content of linked pages is not reasonable
                without concrete evidence of a violation of the law. If we become
                aware of any legal infringements, we will remove such links
                immediately.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Privacy Policy
              </h2>
              <p>
                You can find our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-zinc-200 underline underline-offset-4 hover:text-white"
                >
                  Privacy Policy
                </Link>{" "}
                at the following link.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
