import BottomBarSection from "@/components/sections/BottomBarSection";
import Link from "next/link";

/*
import BigStatement from "@/components/sections/BigStatement";
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
*/

export default function Home() {
  return (
    <div className="page-shell">
      <BottomBarSection />
      <div className="absolute right-4 bottom-6 z-20 sm:right-6 sm:bottom-8">
        <Link
          href="/portfolio"
          className="rounded-full bg-cta px-5 py-3 text-sm font-semibold text-cta-foreground transition hover:opacity-90"
        >
          Go to wallet
        </Link>
      </div>
    </div>
  );
}
