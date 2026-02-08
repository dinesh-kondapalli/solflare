import Hero from "@/components/sections/Hero";
import BigStatement from "@/components/sections/BigStatement";
import ClaimStatement from "@/components/sections/ClaimStatement";
import CardSpendSection from "@/components/sections/CardSpendSection";
import LiberateSection from "@/components/sections/LiberateSection";
import PowerStatement from "@/components/sections/PowerStatement";
import SecondaryFeaturesSection from "@/components/sections/SecondaryFeaturesSection";
import Showcase from "@/components/sections/Showcase";
import ShieldSection from "@/components/sections/ShieldSection";
import StatsBar from "@/components/sections/StatsBar";
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
      </main>
    </div>
  );
}
