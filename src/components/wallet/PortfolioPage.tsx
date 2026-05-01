"use client";

import {
  ArrowsClockwise,
  Copy,
  GearSix,
  Lock,
  PaperPlaneTilt,
  SignOut,
  WarningCircle,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import Modal from "@/components/wallet/Modal";
import {
  BWICK_SYMBOL,
  formatBwickBalanceLabel,
  shortAddress,
} from "@/lib/bwick/chain";
import { useWallet } from "@/providers/WalletProvider";

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  switch (name) {
    case "copy":
      return <Copy weight="fill" className={className} aria-hidden="true" />;
    case "send":
      return (
        <PaperPlaneTilt
          weight="fill"
          className={className}
          aria-hidden="true"
        />
      );
    case "refresh":
      return (
        <ArrowsClockwise
          weight="fill"
          className={className}
          aria-hidden="true"
        />
      );
    case "settings":
      return <GearSix weight="fill" className={className} aria-hidden="true" />;
    default:
      return null;
  }
}

function ActionButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-5 py-4 text-lg font-semibold text-background transition hover:opacity-90"
    >
      <Icon name={icon} className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
}

export default function PortfolioPageClient() {
  const router = useRouter();
  const {
    status,
    address,
    label,
    account,
    balance,
    requiresBackup,
    isRefreshing,
    lastTxHash,
    lock,
    removeWallet,
    refresh,
    send,
  } = useWallet();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [sendError, setSendError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [showSendForm, setShowSendForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [hasAcknowledgedLogout, setHasAcknowledgedLogout] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (status === "empty") {
      router.replace("/onboard");
      return;
    }

    if (status === "locked") {
      router.replace("/unlock");
      return;
    }

    if (status === "unlocked" && requiresBackup) {
      router.replace("/onboard/recovery");
      return;
    }

    if (status === "unlocked") {
      void refresh();
    }
  }, [refresh, requiresBackup, router, status]);

  const copyAddress = async () => {
    if (!address) {
      return;
    }

    await navigator.clipboard.writeText(address);
    setCopyStatus("Address copied");
    window.setTimeout(() => setCopyStatus(null), 1800);
  };

  const submitSend = () => {
    setSendError(null);
    startTransition(async () => {
      try {
        await send({ recipient, amount, memo });
        setRecipient("");
        setAmount("");
        setMemo("");
        setShowSendForm(false);
      } catch (error) {
        setSendError(
          error instanceof Error ? error.message : "Failed to send BWICK.",
        );
      }
    });
  };

  const accountLabel = useMemo(() => {
    if (!account) {
      return "Loading account...";
    }

    return account.exists
      ? `Account #${account.accountNumber} · Sequence ${account.sequence}`
      : "Account will be created after first deposit";
  }, [account]);

  const labelInitials = useMemo(() => {
    const parts = label.trim().split(/\s+/).filter(Boolean).slice(0, 2);

    if (parts.length === 0) {
      return "MW";
    }

    return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
  }, [label]);

  const logoutAndClearWallet = () => {
    removeWallet();
    router.replace("/onboard");
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-background p-3 text-foreground">
        <div className="flex min-h-[calc(100vh-1.5rem)] items-center justify-center rounded-[36px] bg-background/30 text-xl font-semibold">
          Loading wallet...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="min-h-screen w-full p-2 sm:p-3">
        <section className="min-w-0">
          <div className="flex items-center justify-between gap-4 px-3 py-2 sm:px-5 sm:py-4">
            <h1 className="text-[28px] font-semibold tracking-tight">
              BWICK Wallet
            </h1>

            <div className="hidden items-center gap-3 lg:flex">
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-3 rounded-full bg-foreground/6 px-5 py-3 text-left transition hover:bg-foreground/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/7 text-sm font-semibold uppercase tracking-[0.08em] text-foreground">
                  {labelInitials}
                </div>
                <div className="text-[14px] font-semibold">{label}</div>
              </button>
            </div>
          </div>

          <div className="mx-auto mt-3 max-w-[1120px]">
            <div className="space-y-4">
              <section className="overflow-hidden rounded-[28px] bg-panel-2 px-8 py-8 text-background shadow-[inset_0_1px_0_rgba(23,86,65,0.06)] sm:px-8 sm:py-8">
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-background/70">
                  <span>Balance</span>
                </div>

                <div className="mt-2 text-5xl font-semibold tracking-tight">
                  {balance.display}
                </div>

                <div className="mt-2 text-lg text-background/70">
                  {accountLabel}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-background/72">
                  <span>{address ? shortAddress(address) : "No address"}</span>
                  {copyStatus ? <span>{copyStatus}</span> : null}
                  {lastTxHash ? (
                    <span>Last tx: {shortAddress(lastTxHash, 10, 8)}</span>
                  ) : null}
                </div>

                <div className="mt-10 flex flex-col gap-3 lg:flex-row">
                  <ActionButton
                    label="Deposit"
                    icon="copy"
                    onClick={copyAddress}
                  />
                  <ActionButton
                    label={isRefreshing ? "Refreshing" : "Refresh"}
                    icon="refresh"
                    onClick={() => void refresh()}
                  />
                  <ActionButton
                    label="Send"
                    icon="send"
                    onClick={() => setShowSendForm((current) => !current)}
                  />
                </div>
              </section>

              <section className="rounded-[28px] bg-panel px-6 py-10 text-background shadow-[inset_0_1px_0_rgba(23,86,65,0.05)] sm:px-10 sm:py-16">
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <Image
                    src="/portfolio-empty.74e559d5.png"
                    alt="Wallet is empty"
                    width={420}
                    height={300}
                    className="h-auto w-[280px] sm:w-[340px] lg:w-[420px]"
                    priority
                  />
                  <h2 className="mt-4 text-[24px] font-semibold sm:text-[36px]">
                    Fund your {BWICK_SYMBOL} wallet
                  </h2>
                  <p className="mt-4 max-w-[560px] text-xl leading-9 text-background/72">
                    Deposit BWICK to activate your on-chain account, cover fees,
                    and start sending tokens.
                  </p>
                  <button
                    type="button"
                    onClick={copyAddress}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-lg font-semibold text-cta-foreground transition hover:opacity-90"
                  >
                    <Icon name="copy" className="h-5 w-5" />
                    Copy deposit address
                  </button>
                </div>
              </section>

              {showSendForm ? (
                <section className="rounded-[28px] bg-panel-2 px-6 py-8 text-background shadow-[inset_0_1px_0_rgba(23,86,65,0.05)] sm:px-8">
                  <h2 className="text-[24px] font-semibold tracking-tight">
                    Send BWICK
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-sm font-medium text-background/72">
                        Recipient address
                      </span>
                      <input
                        value={recipient}
                        onChange={(event) => setRecipient(event.target.value)}
                        className="w-full rounded-2xl border border-background/12 bg-panel px-4 py-3 outline-none transition placeholder:text-background/40 focus:border-background/30"
                        placeholder="bwick1..."
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-background/72">
                        Amount
                      </span>
                      <input
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        className="w-full rounded-2xl border border-background/12 bg-panel px-4 py-3 outline-none transition placeholder:text-background/40 focus:border-background/30"
                        placeholder="0.0"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-background/72">
                        Memo
                      </span>
                      <input
                        value={memo}
                        onChange={(event) => setMemo(event.target.value)}
                        className="w-full rounded-2xl border border-background/12 bg-panel px-4 py-3 outline-none transition placeholder:text-background/40 focus:border-background/30"
                        placeholder="Optional"
                      />
                    </label>
                  </div>

                  <div className="mt-4 text-sm text-background/70">
                    Available: {formatBwickBalanceLabel(balance.amount)}
                  </div>

                  {sendError ? (
                    <p className="mt-4 text-sm font-medium text-red-700">
                      {sendError}
                    </p>
                  ) : null}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={submitSend}
                      disabled={isPending}
                      className="inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 font-semibold text-cta-foreground transition hover:opacity-90 disabled:opacity-60"
                    >
                      <Icon name="send" className="h-5 w-5" />
                      {isPending ? "Sending..." : "Send BWICK"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSendForm(false)}
                      className="rounded-full border border-background/15 px-6 py-3 font-semibold text-background/80"
                    >
                      Cancel
                    </button>
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </section>
      </div>

      <Modal
        title="Wallet Settings"
        open={showSettings}
        onClose={() => setShowSettings(false)}
      >
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              setShowSettings(false);
              lock();
              router.replace("/unlock");
            }}
            className="flex w-full items-center gap-3 rounded-[18px] border border-white/8 bg-white/6 px-4 py-4 text-left text-white transition hover:bg-white/10"
          >
            <Lock className="h-5 w-5" weight="fill" />
            <span className="text-base font-semibold">Lock wallet</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setShowSettings(false);
              setShowLogoutConfirm(true);
            }}
            className="flex w-full items-center gap-3 rounded-[18px] border border-[#ff5555]/18 bg-[#3c1718] px-4 py-4 text-left text-[#ff8484] transition hover:brightness-[1.04]"
          >
            <SignOut className="h-5 w-5" weight="fill" />
            <span className="text-base font-semibold">
              Log out and clear local wallet
            </span>
          </button>
        </div>
      </Modal>

      <Modal
        title="Log out"
        open={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
      >
        <div className="rounded-[18px] border border-[#ff5555]/18 bg-[#3c1718] px-4 py-3 text-[#ff7272]">
          <div className="flex items-start gap-3 text-sm leading-6">
            <WarningCircle className="mt-0.5 h-5 w-5 shrink-0" weight="fill" />
            <span>
              This removes your wallet from this browser. You will need your
              recovery phrase to restore it.
            </span>
          </div>
        </div>

        <label className="mt-5 flex items-start gap-3 text-base leading-7 text-white/88">
          <input
            type="checkbox"
            checked={hasAcknowledgedLogout}
            onChange={(event) => setHasAcknowledgedLogout(event.target.checked)}
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
            onClick={() => setShowLogoutConfirm(false)}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white/8 px-5 py-3 text-lg font-semibold text-white transition hover:bg-white/12"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!hasAcknowledgedLogout}
            onClick={logoutAndClearWallet}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#d33d31] px-5 py-3 text-lg font-semibold text-white transition hover:brightness-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Log out
          </button>
        </div>
      </Modal>
    </main>
  );
}
