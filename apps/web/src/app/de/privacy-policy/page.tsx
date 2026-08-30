import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung für OpenContext MCP. Erfahren Sie, wie wir mit Vercel-Hosting und Analytics umgehen.",
  alternates: {
    canonical: "https://opencntx.dev/de/privacy-policy",
    languages: {
      "en-US": "https://opencntx.dev/privacy-policy",
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
            Zurück zur Startseite
          </Link>

          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-full border border-zinc-800 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">
              Deutsch
            </span>
            <Link
              href="/privacy-policy"
              className="text-sm text-zinc-500 underline underline-offset-4 hover:text-zinc-300"
            >
              English
            </Link>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
            Rechtliches
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            Datenschutzerklärung
          </h1>

          <div className="mt-10 space-y-10 text-sm leading-7 text-zinc-400">
            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Verantwortlicher
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
                Weitere rechtliche Angaben finden Sie im{" "}
                <Link
                  href="/de/imprint"
                  className="text-zinc-200 underline underline-offset-4 hover:text-white"
                >
                  Impressum
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Hosting
              </h2>
              <p>
                Diese Website wird bei Vercel gehostet. Beim Aufruf dieser
                Website kann Vercel technische Verbindungsdaten wie IP-Adresse,
                Anfrage-Header, Browser-Informationen, Betriebssystem, Referrer
                und Zugriffszeitstempel in Server-Logdateien verarbeiten, um den
                Hosting-Dienst bereitzustellen und Stabilität und Sicherheit
                sicherzustellen.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Vercel Analytics
              </h2>
              <p>
                Diese Website verwendet Vercel Analytics, um die Nutzung der
                Seiten und grundlegende Leistung zu messen. In diesem Zusammenhang
                können aggregierte Nutzungsinformationen verarbeitet werden, wie
                beispielsweise Seitenaufrufe, Routing-Leistung, Gerätetyp,
                Browser-Metadaten und ungefähre geografische Informationen, die
                aus technischen Anfragedaten abgeleitet werden.
              </p>
              <p className="mt-2">
                Die Verarbeitung dient dazu zu verstehen, wie die Website genutzt
                wird, und zur Verbesserung von Leistung und Inhaltsqualität.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Keine Benutzerkonten
              </h2>
              <p>
                Diese Website bietet keine Benutzerkonten, Kommentarformulare
                oder eine direkte Upload-Funktion. Es werden keine
                zusätzlichen personenbezogenen Daten vor Ort erhoben, über die
                oben beschriebene technisch notwendige Hosting- und
                Analytics-Verarbeitung hinaus.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Ihre Rechte
              </h2>
              <p>
                Je nach geltendem Recht stehen Ihnen Rechte auf Auskunft,
                Berichtigung, Löschung, Einschränkung oder Widerspruch gegen die
                Verarbeitung Ihrer personenbezogenen Daten zu. Um diese Rechte
                auszuüben, wenden Sie sich an die im{" "}
                <Link
                  href="/de/imprint"
                  className="text-zinc-200 underline underline-offset-4 hover:text-white"
                >
                  Impressum
                </Link>{" "}
                angegebene verantwortliche Stelle.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-base font-medium text-zinc-100">
                Weitere Informationen
              </h2>
              <p>
                Weitere Informationen zur Datenverarbeitung durch Vercel finden
                Sie in der Vercel-Datenschutzdokumentation.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
