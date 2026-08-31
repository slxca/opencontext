import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GetStartedWizard from "@/components/GetStartedWizard";
import ValueProp from "@/components/ValueProp";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ValueProp />
        <ComparisonMatrix />
        <GetStartedWizard />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
