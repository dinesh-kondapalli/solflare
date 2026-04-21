import Link from "next/link";
import BottomBarSection from "@/components/sections/BottomBarSection";

function WalletIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H19v14H5.5A2.5 2.5 0 0 1 3 16.5v-9Z" />
      <path d="M19 9h-5a2 2 0 0 0 0 4h5" />
      <path d="M14 11h.01" />
    </svg>
  );
}

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
    <main className="min-h-screen bg-background p-2 sm:p-3">
      <div className="relative min-h-[calc(100vh-1rem)] w-full overflow-hidden rounded-[28px] bg-panel text-background shadow-[0_32px_96px_var(--shadow)] sm:min-h-[calc(100vh-1.5rem)] sm:rounded-[36px]">
        <div className="h-full min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-1.5rem)]">
          <BottomBarSection />
        </div>

        <Link
          href="/portfolio"
          className="absolute right-4 bottom-4 z-20 inline-flex items-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-semibold text-cta-foreground transition hover:opacity-90 sm:right-6 sm:bottom-6"
        >
          <WalletIcon />
          Go to wallet
        </Link>
      </div>
    </main>
  );
}
