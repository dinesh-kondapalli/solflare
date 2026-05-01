"use client";

import { CreditCard, HardDrives, Wallet } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthShell from "@/components/wallet/AuthShell";
import { useWallet } from "@/providers/WalletProvider";

function SecondaryChip({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex min-w-[132px] items-center justify-center gap-2 rounded-full border border-white/8 bg-white/6 px-5 py-3 text-lg font-semibold text-white/90">
      {icon}
      <span>{label}</span>
    </div>
  );
}

export default function OnboardChoicePage() {
  const router = useRouter();
  const { status, requiresBackup } = useWallet();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "locked") {
      router.replace("/unlock");
      return;
    }

    if (status === "unlocked") {
      router.replace(requiresBackup ? "/onboard/recovery" : "/portfolio");
    }
  }, [requiresBackup, router, status]);

  return (
    <AuthShell
      mediaSrc="/canvas-4.png"
      mediaAlt="Crown artwork"
      mediaType="image"
      mediaTheme="yellow"
    >
      <div className="mx-auto flex w-full max-w-[420px] flex-col items-center text-center">
        <h1 className="text-[48px] leading-[0.96] font-semibold tracking-[-0.04em] text-white sm:text-[66px]">
          YOUR WALLET.
          <br />
          YOUR KINGDOM.
        </h1>

        <div className="mt-12 flex w-full flex-col gap-4">
          <Link
            href="/onboard/create"
            className="inline-flex min-h-15 items-center justify-center rounded-full bg-[#ffea4f] px-6 py-4 text-xl font-semibold text-[#101318] transition hover:brightness-[1.02]"
          >
            I need a new wallet
          </Link>
          <Link
            href="/onboard/import"
            className="inline-flex min-h-15 items-center justify-center rounded-full bg-white/8 px-6 py-4 text-xl font-semibold text-white transition hover:bg-white/12"
          >
            I already have a wallet
          </Link>
        </div>

        <div className="mt-20 text-sm uppercase tracking-[0.24em] text-white/35">
          Or continue with
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <SecondaryChip
            icon={<HardDrives className="h-5 w-5" />}
            label="Ledger"
          />
          <SecondaryChip
            icon={<CreditCard className="h-5 w-5" />}
            label="Keystone"
          />
        </div>

        <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#ffea4f]/18 bg-[#ffea4f]/8 px-4 py-2 text-sm text-[#fff5ab]">
          <Wallet weight="fill" className="h-4 w-4" />
          Non-custodial BWICK browser wallet
        </div>
      </div>
    </AuthShell>
  );
}
