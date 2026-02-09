import BigStatement from "@/components/sections/BigStatement";
import BottomBarSection from "@/components/sections/BottomBarSection";
import CardSpendSection from "@/components/sections/CardSpendSection";
import ClaimStatement from "@/components/sections/ClaimStatement";
import FooterSection from "@/components/sections/FooterSection";
import Hero from "@/components/sections/Hero";
import LiberateSection from "@/components/sections/LiberateSection";
import PowerStatement from "@/components/sections/PowerStatement";
import PreFooterSection from "@/components/sections/PreFooterSection";
import SecondaryFeaturesSection from "@/components/sections/SecondaryFeaturesSection";
import ShieldSection from "@/components/sections/ShieldSection";
import Showcase from "@/components/sections/Showcase";
import StatsBar from "@/components/sections/StatsBar";
import SupportSection from "@/components/sections/SupportSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
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
        <TestimonialsSection />
        <PreFooterSection />
      </main>
      <FooterSection />
      <BottomBarSection />
    </div>
  );
}
