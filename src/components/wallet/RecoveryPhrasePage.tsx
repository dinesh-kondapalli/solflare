"use client";

import {
  CheckCircle,
  Copy,
  SealCheck,
  WarningCircle,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import AuthShell from "@/components/wallet/AuthShell";
import { useWallet } from "@/providers/WalletProvider";

export default function RecoveryPhrasePage() {
  const router = useRouter();
  const { status, recoveryPhrase, requiresBackup, confirmBackup } = useWallet();
  const [copied, setCopied] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [wordThree, setWordThree] = useState("");
  const [wordEleven, setWordEleven] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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

    if (!requiresBackup) {
      router.replace("/portfolio");
    }
  }, [requiresBackup, router, status]);

  const words = useMemo(
    () => recoveryPhrase?.trim().split(/\s+/).filter(Boolean) ?? [],
    [recoveryPhrase],
  );
  const phraseWords = useMemo(
    () =>
      words.map((word, index) => ({
        id: `word-${index + 1}`,
        position: index + 1,
        word,
      })),
    [words],
  );

  const copyPhrase = async () => {
    if (!recoveryPhrase) {
      return;
    }

    try {
      await navigator.clipboard.writeText(recoveryPhrase);
      setCopied("Recovery phrase copied");
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied("Clipboard access failed");
    }
  };

  const submit = () => {
    if (!acknowledged) {
      setError("Confirm that you stored the recovery phrase offline.");
      return;
    }

    if (wordThree.trim().toLowerCase() !== (words[2] ?? "").toLowerCase()) {
      setError("Word #3 does not match your recovery phrase.");
      return;
    }

    if (wordEleven.trim().toLowerCase() !== (words[10] ?? "").toLowerCase()) {
      setError("Word #11 does not match your recovery phrase.");
      return;
    }

    setError(null);
    startTransition(() => {
      confirmBackup();
      router.replace("/portfolio");
    });
  };

  return (
    <AuthShell
      mediaSrc="/shield-home-1080.mp4"
      mediaAlt="Security shield artwork"
      mediaTheme="yellow"
    >
      <div className="mx-auto w-full max-w-[520px]">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#ffea4f]/18 bg-[#ffea4f]/8 px-4 py-2 text-sm font-medium text-[#fff5ab]">
          <SealCheck className="h-4 w-4" weight="fill" />
          Mandatory recovery confirmation
        </div>

        <h1 className="mt-8 text-[34px] font-semibold tracking-tight text-white sm:text-[42px]">
          Save your recovery phrase
        </h1>
        <p className="mt-4 text-lg leading-8 text-white/54">
          This phrase is the only way to restore your wallet. Store it offline
          before you continue to your portfolio.
        </p>

        <div className="mt-6 rounded-[22px] border border-[#ffb432]/18 bg-[#3a2a14] px-5 py-4 text-[#ffc85e]">
          <div className="flex items-start gap-3 text-sm leading-6">
            <WarningCircle className="mt-0.5 h-5 w-5 shrink-0" weight="fill" />
            <span>
              Anyone with this phrase can control your funds. Never share it,
              never paste it into chat, and never store it unencrypted online.
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 rounded-[28px] border border-white/8 bg-[#10141d] p-5 sm:grid-cols-3">
          {phraseWords.map((item) => (
            <div
              key={item.id}
              className="rounded-[18px] border border-white/6 bg-white/[0.03] px-4 py-3"
            >
              <div className="text-xs font-medium tracking-[0.18em] text-white/32">
                {String(item.position).padStart(2, "0")}
              </div>
              <div className="mt-2 text-[15px] font-semibold text-white">
                {item.word}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={copyPhrase}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            <Copy className="h-5 w-5" weight="fill" />
            Copy phrase
          </button>
          {copied ? (
            <span className="text-sm font-medium text-white/56">{copied}</span>
          ) : null}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/58">
              Enter word #3
            </span>
            <input
              value={wordThree}
              onChange={(event) => setWordThree(event.target.value)}
              className="h-13 w-full rounded-[18px] border border-white/10 bg-[#10141d] px-4 text-lg text-white outline-none transition placeholder:text-white/28 focus:border-white/20"
              placeholder="Word 3"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/58">
              Enter word #11
            </span>
            <input
              value={wordEleven}
              onChange={(event) => setWordEleven(event.target.value)}
              className="h-13 w-full rounded-[18px] border border-white/10 bg-[#10141d] px-4 text-lg text-white outline-none transition placeholder:text-white/28 focus:border-white/20"
              placeholder="Word 11"
            />
          </label>
        </div>

        <label className="mt-5 flex items-start gap-3 text-base leading-7 text-white/84">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(event) => setAcknowledged(event.target.checked)}
            className="mt-1 h-5 w-5 rounded border-white/20 bg-transparent accent-[#ffea4f]"
          />
          <span>
            I wrote down my recovery phrase and understand it is the only way to
            restore this wallet.
          </span>
        </label>

        {error ? (
          <p className="mt-4 text-sm font-medium text-[#ff8f8f]">{error}</p>
        ) : null}

        <button
          type="button"
          disabled={isPending}
          onClick={submit}
          className="mt-7 inline-flex min-h-15 w-full items-center justify-center rounded-full bg-[#ffea4f] px-6 py-4 text-xl font-semibold text-[#101318] transition hover:brightness-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <CheckCircle className="mr-2 h-5 w-5" weight="fill" />
          {isPending ? "Verifying..." : "I saved my recovery phrase"}
        </button>
      </div>
    </AuthShell>
  );
}
