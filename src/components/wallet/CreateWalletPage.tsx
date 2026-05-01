"use client";

import { ArrowLeft, Eye, EyeSlash, SealCheck } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import AuthShell from "@/components/wallet/AuthShell";
import { useWallet } from "@/providers/WalletProvider";

function PasswordField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 w-full rounded-[18px] border border-white/10 bg-[#10141d] px-5 pr-14 text-lg text-white outline-none transition placeholder:text-white/28 focus:border-white/20"
        placeholder={placeholder}
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
  );
}

export default function CreateWalletPage() {
  const router = useRouter();
  const { status, requiresBackup, createWallet } = useWallet();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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

  const submit = () => {
    if (password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreed) {
      setError("You must agree before creating your wallet.");
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        await createWallet({ password });
        router.replace("/onboard/recovery");
      } catch (createError) {
        setError(
          createError instanceof Error
            ? createError.message
            : "Failed to create wallet.",
        );
      }
    });
  };

  const canSubmit = password.length > 0 && confirmPassword.length > 0 && agreed;

  return (
    <AuthShell
      mediaSrc="/key-1080.mp4"
      mediaAlt="Key artwork"
      mediaTheme="dark"
    >
      <div className="mx-auto w-full max-w-[440px]">
        <Link
          href="/onboard"
          className="inline-flex items-center gap-3 text-[34px] font-semibold tracking-tight text-white/92 transition hover:text-white"
        >
          <ArrowLeft className="h-8 w-8" />
          Back
        </Link>

        <div className="mt-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ffea4f]/18 bg-[#ffea4f]/8 px-4 py-2 text-sm font-medium text-[#fff5ab]">
            <SealCheck className="h-4 w-4" weight="fill" />
            Password first. Recovery confirmation next.
          </div>
          <h1 className="mt-8 text-[34px] font-semibold tracking-tight text-white sm:text-[42px]">
            Set a Password for Your Wallet
          </h1>

          <div className="mt-8 space-y-5">
            <PasswordField
              value={password}
              onChange={setPassword}
              placeholder="New password..."
            />
            <PasswordField
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Repeat password..."
            />

            <label className="flex items-start gap-3 text-[15px] leading-7 text-white/76">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                className="mt-1 h-5 w-5 rounded border-white/20 bg-transparent accent-[#ffea4f]"
              />
              <span>
                I agree to the Terms of Service and Privacy Policy, and
                understand this is a self-custodial wallet.
              </span>
            </label>

            {error ? (
              <p className="text-sm font-medium text-[#ff8f8f]">{error}</p>
            ) : null}

            <button
              type="button"
              disabled={!canSubmit || isPending}
              onClick={submit}
              className="inline-flex min-h-15 w-full items-center justify-center rounded-full bg-[#2d313a] px-6 py-4 text-xl font-semibold text-white transition enabled:bg-[#ffea4f] enabled:text-[#101318] enabled:hover:brightness-[1.02] disabled:cursor-not-allowed disabled:text-white/36"
            >
              {isPending ? "Creating wallet..." : "Continue"}
            </button>
          </div>
        </div>

        <div className="mt-18 text-center">
          <Link
            href="/onboard/import"
            className="text-xl font-semibold text-white/86 transition hover:text-white"
          >
            I already have a wallet
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
