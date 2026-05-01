"use client";

import { ArrowLeft, Eye, EyeSlash, WarningCircle } from "@phosphor-icons/react";
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

export default function ImportWalletPage({
  resetNotice = false,
}: {
  resetNotice?: boolean;
}) {
  const router = useRouter();
  const { status, requiresBackup, importWallet } = useWallet();
  const [mnemonic, setMnemonic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (!mnemonic.trim()) {
      setError("Enter your recovery phrase.");
      return;
    }

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
        await importWallet({ mnemonic, password });
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

  return (
    <AuthShell
      mediaSrc="/flag-1080.mp4"
      mediaAlt="BWICK flag"
      mediaTheme="yellow"
    >
      <div className="mx-auto w-full max-w-[440px]">
        <Link
          href="/onboard"
          className="inline-flex items-center gap-3 text-[34px] font-semibold tracking-tight text-white/92 transition hover:text-white"
        >
          <ArrowLeft className="h-8 w-8" />
          Back
        </Link>

        <div className="mt-20">
          <h1 className="text-[34px] font-semibold tracking-tight text-white sm:text-[42px]">
            Import your wallet
          </h1>
          <p className="mt-4 text-lg leading-8 text-white/52">
            Restore access with your BWICK recovery phrase and set a new local
            password for this browser.
          </p>

          {resetNotice ? (
            <div className="mt-6 rounded-[22px] border border-[#ffea4f]/18 bg-[#ffea4f]/8 px-5 py-4 text-[#fff0a1]">
              <div className="flex items-start gap-3 text-sm leading-6">
                <WarningCircle
                  className="mt-0.5 h-5 w-5 shrink-0"
                  weight="fill"
                />
                <span>
                  Local wallet data was cleared. Re-import your recovery phrase
                  to restore access and set a new password.
                </span>
              </div>
            </div>
          ) : null}

          <div className="mt-8 space-y-5">
            <textarea
              value={mnemonic}
              onChange={(event) => setMnemonic(event.target.value)}
              rows={4}
              className="w-full rounded-[22px] border border-white/10 bg-[#10141d] px-5 py-4 text-lg text-white outline-none transition placeholder:text-white/28 focus:border-white/20"
              placeholder="Enter your 24-word recovery phrase"
            />
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

            {error ? (
              <p className="text-sm font-medium text-[#ff8f8f]">{error}</p>
            ) : null}

            <button
              type="button"
              disabled={isPending}
              onClick={submit}
              className="inline-flex min-h-15 w-full items-center justify-center rounded-full bg-[#ffea4f] px-6 py-4 text-xl font-semibold text-[#101318] transition hover:brightness-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Importing wallet..." : "Import wallet"}
            </button>
          </div>
        </div>
      </div>
    </AuthShell>
  );
}
