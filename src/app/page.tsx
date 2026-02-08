import BigStatement from "@/components/sections/BigStatement";
import CardSpendSection from "@/components/sections/CardSpendSection";
import ClaimStatement from "@/components/sections/ClaimStatement";
import Hero from "@/components/sections/Hero";
import LiberateSection from "@/components/sections/LiberateSection";
import PowerStatement from "@/components/sections/PowerStatement";
import SecondaryFeaturesSection from "@/components/sections/SecondaryFeaturesSection";
import ShieldSection from "@/components/sections/ShieldSection";
import Showcase from "@/components/sections/Showcase";
import StatsBar from "@/components/sections/StatsBar";
import SupportSection from "@/components/sections/SupportSection";
import TopNav from "@/components/sections/TopNav";

export default function Home() {
  return (
    <div className="page-shell">
      <TopNav />
      <main>
        <Hero />
        <Showcase />
        <StatsBar />
        <BigStatement />
        <ShieldSection />
        <PowerStatement />
        <LiberateSection />
        <ClaimStatement />
        <CardSpendSection />
        <SecondaryFeaturesSection />
        <SupportSection />
      </main>
    </div>
  );
}
