"use client";

import { Copy, Wallet } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import BottomBarSection from "@/components/sections/BottomBarSection";
import { useWallet } from "@/providers/WalletProvider";

export default function HomePage() {
  const router = useRouter();
  const { status, createWallet, importWallet, unlock } = useWallet();
  const [mode, setMode] = useState<"create" | "import" | "unlock">("create");
  const [label, setLabel] = useState("Main Wallet");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [backupMnemonic, setBackupMnemonic] = useState<string | null>(null);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (status === "locked") {
      setMode("unlock");
    }

    if (status === "unlocked" && !backupMnemonic && mode === "unlock") {
      router.replace("/portfolio");
    }
  }, [backupMnemonic, mode, router, status]);

  const submitCreate = () => {
    if (password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        const nextMnemonic = await createWallet({ label, password });
        setBackupMnemonic(nextMnemonic);
      } catch (createError) {
        setError(
          createError instanceof Error
            ? createError.message
            : "Failed to create wallet.",
        );
      }
    });
  };

  const submitImport = () => {
    if (password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        await importWallet({ mnemonic, label, password });
        router.replace("/portfolio");
      } catch (importError) {
        setError(
          importError instanceof Error
            ? importError.message
            : "Failed to import wallet.",
        );
      }
    });
  };

  const submitUnlock = () => {
    setError(null);
    startTransition(async () => {
      try {
        await unlock(password);
      } catch (unlockError) {
        setError(
          unlockError instanceof Error
            ? unlockError.message
            : "Failed to unlock wallet.",
        );
      }
    });
  };

  const copyBackupMnemonic = async () => {
    if (!backupMnemonic) {
      return;
    }

    try {
      await navigator.clipboard.writeText(backupMnemonic);
      setCopyMessage("Recovery phrase copied.");
    } catch {
      setCopyMessage("Clipboard access failed.");
    }
  };

  return (
    <main className="min-h-screen bg-background p-2 sm:p-3">
      <div className="relative min-h-[calc(100vh-1rem)] w-full overflow-hidden rounded-[28px] bg-panel text-background sm:min-h-[calc(100vh-1.5rem)] sm:rounded-[36px]">
        <div className="h-full min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-1.5rem)]">
          <BottomBarSection />
        </div>

        {status === "unlocked" ? (
          <Link
            href="/portfolio"
            className="absolute right-4 bottom-4 z-20 inline-flex items-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-semibold text-cta-foreground transition hover:opacity-90 sm:right-6 sm:bottom-6"
          >
            <Wallet weight="fill" className="h-5 w-5" />
            Go to wallet
          </Link>
        ) : null}

        <div className="absolute inset-x-4 top-4 z-20 flex justify-center sm:inset-x-auto sm:top-6 sm:left-6 sm:justify-start">
          <div className="w-full max-w-[420px] rounded-[28px] border border-[#d7f06b]/25 bg-[#0f4d39] p-5 text-[#d7f06b] sm:p-6">
            {backupMnemonic ? (
              <div>
                <h1 className="mt-3 text-2xl font-semibold tracking-tight">
                  Save your recovery phrase
                </h1>
                <p className="mt-3 text-base leading-7 text-[#d7f06b]/72">
                  Anyone with these words can control your wallet. Store them
                  offline before you continue.
                </p>
                <div className="mt-5 rounded-[24px] border border-[#d7f06b]/20 bg-[#d7f06b]/10 p-4 text-sm leading-7 text-[#effaa9]">
                  {backupMnemonic}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={copyBackupMnemonic}
                    className="inline-flex items-center gap-2 rounded-full border border-[#d7f06b]/25 bg-[#d7f06b]/10 px-5 py-3 font-semibold text-[#d7f06b] transition hover:opacity-90"
                  >
                    <Copy weight="fill" className="h-5 w-5" />
                    Copy phrase
                  </button>
                  <button
                    type="button"
                    onClick={() => router.replace("/portfolio")}
                    className="inline-flex items-center gap-2 rounded-full bg-[#d7f06b] px-6 py-3 font-semibold text-[#0f4d39] transition hover:opacity-90"
                  >
                    <Wallet weight="fill" className="h-5 w-5" />I saved it
                  </button>
                </div>
                {copyMessage ? (
                  <p className="mt-3 text-sm font-medium text-[#d7f06b]/72">
                    {copyMessage}
                  </p>
                ) : null}
              </div>
            ) : (
              <>
                <div className="flex gap-2 rounded-full border border-[#d7f06b]/25 bg-[#d7f06b]/10 p-1 text-sm font-semibold text-[#d7f06b]">
                  {status === "empty" ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setMode("create")}
                        className={`flex-1 rounded-full px-4 py-2 transition ${mode === "create" ? "bg-[#d7f06b] text-[#0f4d39]" : "text-[#d7f06b]/72"}`}
                      >
                        Create
                      </button>
                      <button
                        type="button"
                        onClick={() => setMode("import")}
                        className={`flex-1 rounded-full px-4 py-2 transition ${mode === "import" ? "bg-[#d7f06b] text-[#0f4d39]" : "text-[#d7f06b]/72"}`}
                      >
                        Import
                      </button>
                    </>
                  ) : (
                    <div className="w-full rounded-full bg-[#0f4d39] px-4 py-2 text-center text-[#d7f06b] ring-1 ring-inset ring-[#d7f06b]/30">
                      Unlock wallet
                    </div>
                  )}
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <h1 className="mt-3 text-2xl font-bold tracking-tight">
                      {status === "locked"
                        ? "Unlock your wallet"
                        : mode === "import"
                          ? "Import an existing wallet"
                          : "Create a new BWICK wallet"}
                    </h1>
                  </div>

                  {status !== "locked" ? (
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-[#d7f06b]/72">
                        Wallet label
                      </span>
                      <input
                        value={label}
                        onChange={(event) => setLabel(event.target.value)}
                        className="w-full rounded-2xl border border-[#d7f06b]/28 bg-[#d7f06b]/10 px-4 py-3 text-[#effaa9] outline-none transition placeholder:text-[#d7f06b]/42 focus:border-[#d7f06b]/50"
                        placeholder="Main Wallet"
                      />
                    </label>
                  ) : null}

                  {mode === "import" && status !== "locked" ? (
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-[#d7f06b]/72">
                        Recovery phrase
                      </span>
                      <textarea
                        value={mnemonic}
                        onChange={(event) => setMnemonic(event.target.value)}
                        rows={4}
                        className="w-full rounded-2xl border border-[#d7f06b]/28 bg-[#d7f06b]/10 px-4 py-3 text-[#effaa9] outline-none transition placeholder:text-[#d7f06b]/42 focus:border-[#d7f06b]/50"
                        placeholder="Enter your 24-word phrase"
                      />
                    </label>
                  ) : null}

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-[#d7f06b]/72">
                      Password
                    </span>
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full rounded-2xl border border-[#d7f06b]/28 bg-[#d7f06b]/10 px-4 py-3 text-[#effaa9] outline-none transition placeholder:text-[#d7f06b]/42 focus:border-[#d7f06b]/50"
                      placeholder="At least 8 characters"
                    />
                  </label>

                  {status !== "locked" ? (
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-[#d7f06b]/72">
                        Confirm password
                      </span>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        className="w-full rounded-2xl border border-[#d7f06b]/28 bg-[#d7f06b]/10 px-4 py-3 text-[#effaa9] outline-none transition placeholder:text-[#d7f06b]/42 focus:border-[#d7f06b]/50"
                        placeholder="Repeat your password"
                      />
                    </label>
                  ) : null}

                  {error ? (
                    <p className="text-sm font-medium text-[#ffd7d7]">
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="button"
                    disabled={isPending}
                    onClick={
                      status === "locked"
                        ? submitUnlock
                        : mode === "import"
                          ? submitImport
                          : submitCreate
                    }
                    className="inline-flex items-center gap-2 rounded-full bg-[#d7f06b] px-6 py-3 font-semibold text-[#0f4d39] transition hover:opacity-90 disabled:opacity-60"
                  >
                    <Wallet weight="fill" className="h-5 w-5" />
                    {isPending
                      ? "Working..."
                      : status === "locked"
                        ? "Unlock wallet"
                        : mode === "import"
                          ? "Import wallet"
                          : "Create wallet"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
