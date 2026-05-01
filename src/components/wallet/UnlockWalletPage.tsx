"use client";

import {
  CheckSquare,
  Eye,
  EyeSlash,
  WarningCircle,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import AuthShell from "@/components/wallet/AuthShell";
import Modal from "@/components/wallet/Modal";
import { useWallet } from "@/providers/WalletProvider";

export default function UnlockWalletPage() {
  const router = useRouter();
  const { status, requiresBackup, unlock, removeWallet } = useWallet();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [hasAcknowledgedReset, setHasAcknowledgedReset] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "empty") {
      router.replace("/onboard");
      return;
    }

    if (status === "unlocked") {
      router.replace(requiresBackup ? "/onboard/recovery" : "/portfolio");
    }
  }, [requiresBackup, router, status]);

  const submitUnlock = () => {
    setError(null);
    startTransition(async () => {
      try {
        await unlock(password);
        router.replace(requiresBackup ? "/onboard/recovery" : "/portfolio");
      } catch (unlockError) {
        setError(
          unlockError instanceof Error
            ? unlockError.message
            : "Failed to unlock wallet.",
        );
      }
    });
  };

  const resetWallet = () => {
    removeWallet();
    router.replace("/onboard/import?reset=1");
  };

  return (
    <>
      <AuthShell
        mediaSrc="/flag-1080.mp4"
        mediaAlt="BWICK flag"
        mediaTheme="yellow"
      >
        <div className="mx-auto w-full max-w-[420px] text-center">
          <h1 className="text-[56px] leading-[1] font-semibold tracking-[-0.04em] text-white sm:text-[64px]">
            Unlock your wallet
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/46">
            Enter your password and access your BWICK funds safely.
          </p>

          <div className="mt-9">
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-14 w-full rounded-[18px] border border-white/10 bg-[#10141d] px-5 pr-14 text-lg text-white outline-none transition placeholder:text-white/28 focus:border-white/20"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setVisible((current) => !current)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-white/42 transition hover:text-white/72"
                aria-label={visible ? "Hide password" : "Show password"}
              >
                {visible ? (
                  <EyeSlash className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {error ? (
              <p className="mt-4 text-left text-sm font-medium text-[#ff8f8f]">
                {error}
              </p>
            ) : null}

            <button
              type="button"
              onClick={submitUnlock}
              disabled={isPending}
              className="mt-6 inline-flex min-h-15 w-full items-center justify-center rounded-full bg-[#ffea4f] px-6 py-4 text-xl font-semibold text-[#101318] transition hover:brightness-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Unlocking..." : "Unlock"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowForgotModal(true)}
            className="mt-18 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-white/8 px-6 py-4 text-xl font-semibold text-white/94 transition hover:bg-white/12"
          >
            Forgot password
          </button>
        </div>
      </AuthShell>

      <Modal
        title="Forgot Password"
        open={showForgotModal}
        onClose={() => setShowForgotModal(false)}
      >
        <div className="rounded-[18px] border border-[#ffb432]/24 bg-[#3a2a14] px-4 py-3 text-[#ffc85e]">
          <div className="flex items-start gap-3 text-sm leading-6">
            <WarningCircle className="mt-0.5 h-5 w-5 shrink-0" weight="fill" />
            <span>
              Make sure you have your recovery phrase. It is the only way to
              restore your wallet if you log out.
            </span>
          </div>
        </div>

        <p className="mt-5 text-base leading-8 text-white/56">
          If you forgot your password, the only way to restore your wallet is to
          clear local wallet data, then re-import your recovery phrase and set a
          new password.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setShowForgotModal(false)}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white/8 px-5 py-3 text-lg font-semibold text-white transition hover:bg-white/12"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              setShowForgotModal(false);
              setShowResetModal(true);
            }}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#ffea4f] px-5 py-3 text-lg font-semibold text-[#101318] transition hover:brightness-[1.02]"
          >
            Continue
          </button>
        </div>
      </Modal>

      <Modal
        title="Log out"
        open={showResetModal}
        onClose={() => setShowResetModal(false)}
      >
        <div className="rounded-[18px] border border-[#ff5555]/18 bg-[#3c1718] px-4 py-3 text-[#ff7272]">
          <div className="flex items-start gap-3 text-sm leading-6">
            <WarningCircle className="mt-0.5 h-5 w-5 shrink-0" weight="fill" />
            <span>
              Logging out will clear all local wallet data from this browser.
              Keep your recovery phrase safe before continuing.
            </span>
          </div>
        </div>

        <p className="mt-5 text-base leading-8 text-white/56">
          To remove your wallet from this browser, click Log out. You will only
          be able to restore access by importing your recovery phrase again.
        </p>

        <label className="mt-5 flex items-start gap-3 text-base leading-7 text-white/88">
          <input
            type="checkbox"
            checked={hasAcknowledgedReset}
            onChange={(event) => setHasAcknowledgedReset(event.target.checked)}
            className="mt-1 h-5 w-5 rounded border-white/20 bg-transparent accent-[#ffea4f]"
          />
          <span>
            I backed up my recovery phrase and understand I cannot restore this
            wallet without it.
          </span>
        </label>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setShowResetModal(false)}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white/8 px-5 py-3 text-lg font-semibold text-white transition hover:bg-white/12"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!hasAcknowledgedReset}
            onClick={resetWallet}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#d33d31] px-5 py-3 text-lg font-semibold text-white transition hover:brightness-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckSquare className="mr-2 h-5 w-5" weight="fill" />
            Log out
          </button>
        </div>
      </Modal>
    </>
  );
}
