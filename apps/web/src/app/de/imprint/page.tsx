import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Rechtliche Angaben und Impressum für OpenContext MCP, betrieben von Luca-Chris Sträter in Rheine, Deutschland.",
  alternates: {
    canonical: "https://opencntx.dev/de/imprint",
    languages: {
      "en-US": "https://opencntx.dev/imprint",
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
            Zurück zur Startseite
          </Link>

          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-full border border-zinc-800 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">
              Deutsch
            </span>
            <Link
              href="/imprint"
              className="text-sm text-zinc-500 underline underline-offset-4 hover:text-zinc-300"
            >
              English
            </Link>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
            Rechtliches
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Impressum</h1>

          <div className="mt-10 space-y-10 text-sm leading-7 text-zinc-400">
            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Angaben gemäß § 5 DDG
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
                Kontakt
              </h2>
              <p>
                Telefon: +49-1788029790
                <br />
                E-Mail: hello@slxca.com
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Verbraucherstreitbeilegung / Universalschlichtungsstelle
              </h2>
              <p>
                Wir nehmen nicht an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teil und sind dazu auch nicht
                verpflichtet.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Haftung für Links
              </h2>
              <p>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
                wurden zum Zeitpunkt der Verlinkung auf mögliche
                Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
                Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
                inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
                konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
                Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
                Links umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Datenschutzerklärung
              </h2>
              <p>
                Unter dem folgenden Link finden Sie unsere{" "}
                <Link
                  href="/de/privacy-policy"
                  className="text-zinc-200 underline underline-offset-4 hover:text-white"
                >
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
