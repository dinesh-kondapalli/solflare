"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthShell from "@/components/wallet/AuthShell";
import { useWallet } from "@/providers/WalletProvider";

export default function EntryGate() {
  const router = useRouter();
  const { status, requiresBackup } = useWallet();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "empty") {
      router.replace("/onboard");
      return;
    }

    if (status === "locked") {
      router.replace("/unlock");
      return;
    }

    router.replace(requiresBackup ? "/onboard/recovery" : "/portfolio");
  }, [requiresBackup, router, status]);

  return (
    <AuthShell
      mediaSrc="/flag-1080.mp4"
      mediaAlt="BWICK flag"
      mediaTheme="yellow"
    >
      <div className="mx-auto w-full max-w-[410px] text-center">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/72">
          Checking local wallet state
        </div>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Preparing your wallet
        </h1>
        <p className="mt-4 text-lg leading-8 text-white/50">
          We are checking whether you need onboarding, unlock, or recovery
          confirmation.
        </p>
      </div>
    </AuthShell>
  );
}
