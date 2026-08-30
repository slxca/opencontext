import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GetStartedWizard from "@/components/GetStartedWizard";
import ValueProp from "@/components/ValueProp";
import ToolsGrid from "@/components/ToolsGrid";
import AgentPrompts from "@/components/AgentPrompts";
import GitStrategy from "@/components/GitStrategy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ValueProp />
        <GetStartedWizard />
        <ToolsGrid />
        <AgentPrompts />
        <GitStrategy />
      </main>
      <Footer />
    </>
  );
}
