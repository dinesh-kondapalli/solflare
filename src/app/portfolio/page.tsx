import Image from "next/image";

function Svg({
  title,
  className,
  children,
}: Readonly<{
  title: string;
  className?: string;
  children: React.ReactNode;
}>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const title = `${name} icon`;

  switch (name) {
    case "wallet":
      return (
        <Svg title={title} className={className}>
          <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H19v14H5.5A2.5 2.5 0 0 1 3 16.5v-9Z" />
          <path d="M19 9h-5a2 2 0 0 0 0 4h5" />
          <path d="M14 11h.01" />
        </Svg>
      );
    case "database":
      return (
        <Svg title={title} className={className}>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
          <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </Svg>
      );
    case "chart":
      return (
        <Svg title={title} className={className}>
          <path d="M4 19 10 13l4 4 6-9" />
          <path d="M4 5v14h14" />
          <circle cx="17.5" cy="17.5" r="3.5" />
          <path d="m20 20 2 2" />
        </Svg>
      );
    case "stocks":
      return (
        <Svg title={title} className={className}>
          <path d="M4 19V5" />
          <path d="M10 19v-7" />
          <path d="M16 19V9" />
          <path d="M22 19V3" />
          <path d="M3 19h20" />
        </Svg>
      );
    case "piggy":
      return (
        <Svg title={title} className={className}>
          <path d="M5 14a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1.5A2.5 2.5 0 0 1 16.5 18H9" />
          <path d="M8 9 6 7" />
          <path d="M7 18v2" />
          <path d="M16 18v2" />
          <path d="M19 12h2" />
          <path d="M13 12h.01" />
        </Svg>
      );
    case "dollar":
      return (
        <Svg title={title} className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M14.5 9.5c0-1.1-1.1-2-2.5-2s-2.5.9-2.5 2 1.1 2 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2-2.5-.9-2.5-2" />
          <path d="M12 6.5v11" />
        </Svg>
      );
    case "grid":
      return (
        <Svg title={title} className={className}>
          <path d="M4 4h7v7H4z" />
          <path d="M13 4h7v7h-7z" />
          <path d="M4 13h7v7H4z" />
          <path d="M13 13h7v7h-7z" />
        </Svg>
      );
    case "globe":
      return (
        <Svg title={title} className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a15 15 0 0 1 0 18" />
          <path d="M12 3a15 15 0 0 0 0 18" />
        </Svg>
      );
    case "trade":
      return (
        <Svg title={title} className={className}>
          <path d="M7 7h11" />
          <path d="m14 4 4 3-4 3" />
          <path d="M17 17H6" />
          <path d="m10 14-4 3 4 3" />
        </Svg>
      );
    case "bridge":
      return (
        <Svg title={title} className={className}>
          <path d="M4 18h16" />
          <path d="M6 18v-4a6 6 0 0 1 12 0v4" />
          <path d="M12 8V4" />
        </Svg>
      );
    case "history":
      return (
        <Svg title={title} className={className}>
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v5h5" />
          <path d="M12 7v6l4 2" />
        </Svg>
      );
    case "info":
      return (
        <Svg title={title} className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v5" />
          <path d="M12 7h.01" />
        </Svg>
      );
    case "eye-off":
      return (
        <Svg title={title} className={className}>
          <path d="M3 3l18 18" />
          <path d="M10.6 10.7a3 3 0 0 0 4 4" />
          <path d="M9.9 5.2A10.9 10.9 0 0 1 12 5c5 0 8.8 3.7 10 7-0.5 1.4-1.5 2.9-2.9 4.1" />
          <path d="M6.2 6.3C4.7 7.5 3.6 9.1 3 12c1.2 3.3 5 7 9 7 1.1 0 2.2-.2 3.1-.6" />
        </Svg>
      );
    case "plus":
      return (
        <Svg title={title} className={className}>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </Svg>
      );
    case "send":
      return (
        <Svg title={title} className={className}>
          <path d="m5 12 14-7-4 7 4 7-14-7Z" />
        </Svg>
      );
    case "settings":
      return (
        <Svg title={title} className={className}>
          <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Z" />
          <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 0 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 0 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 0 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a2 2 0 0 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
        </Svg>
      );
    case "close":
      return (
        <Svg title={title} className={className}>
          <path d="M6 6l12 12" />
          <path d="M18 6 6 18" />
        </Svg>
      );
    case "switch":
      return (
        <Svg title={title} className={className}>
          <path d="M8 7 5 10l3 3" />
          <path d="M5 10h9" />
          <path d="m16 17 3-3-3-3" />
          <path d="M19 14h-9" />
        </Svg>
      );
    case "tune":
      return (
        <Svg title={title} className={className}>
          <path d="M4 6h8" />
          <path d="M16 6h4" />
          <path d="M10 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
          <path d="M4 12h4" />
          <path d="M12 12h8" />
          <path d="M8 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
          <path d="M4 18h10" />
          <path d="M18 18h2" />
          <path d="M14 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
        </Svg>
      );
    case "chevron":
      return (
        <Svg title={title} className={className}>
          <path d="m9 6 6 6-6 6" />
        </Svg>
      );
    default:
      return null;
  }
}

function WalletBadge() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground/10 text-sm font-semibold text-foreground/80">
      MW
    </div>
  );
}

function TokenPill({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-foreground/5">
      <Image src={src} alt={alt} width={28} height={28} className="h-7 w-7" />
    </div>
  );
}

function ActionButton({ label, icon }: { label: string; icon: string }) {
  return (
    <button
      type="button"
      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-5 py-4 text-lg font-semibold text-background transition hover:opacity-90"
    >
      <Icon name={icon} className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto min-h-screen max-w-[1380px] p-3 lg:p-4">
        <section className="min-w-0">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-[28px] font-semibold tracking-tight">
              Portfolio
            </h1>

            <div className="hidden items-center gap-3 lg:flex">
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/6 text-foreground/90 transition hover:bg-foreground/10"
              >
                <Icon name="settings" className="h-5 w-5" />
              </button>

              <button
                type="button"
                className="flex items-center gap-3 rounded-full bg-foreground/6 px-3 py-2 text-left transition hover:bg-foreground/10"
              >
                <WalletBadge />
                <div>
                  <div className="text-[14px] font-semibold">Main Wallet</div>
                  <div className="flex items-center gap-1 text-[13px] text-foreground/75">
                    <span>FQhk...A4Qi</span>
                    <span className="text-foreground/55">[]</span>
                  </div>
                </div>
                <Icon name="chevron" className="h-4 w-4 text-foreground/50" />
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
            <div className="space-y-4">
              <section className="overflow-hidden rounded-[28px] bg-panel-2 px-8 py-8 shadow-[inset_0_1px_0_rgba(23,86,65,0.06)] sm:px-8 sm:py-8">
                        <div className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground/70">
                          <span>BALANCE</span>
                          <span className="ml-2 inline-flex align-middle text-foreground/55">
                            <Icon name="info" className="h-4 w-4" />
                          </span>
                        </div>

                        <div className="mt-2 flex items-end gap-2">
                          <div className="text-5xl font-semibold tracking-tight">
                            $0.00
                          </div>
                          <div className="mb-1 text-foreground/55">
                            <Icon name="eye-off" className="h-6 w-6" />
                          </div>
                        </div>

                        <div className="mt-1 flex items-center gap-2 text-lg text-foreground/70">
                          <span>+$0.00</span>
                          <span>·</span>
                          <span>+0.00%</span>
                        </div>

                        <div className="mt-10 flex flex-col gap-3 lg:flex-row">
                          <ActionButton label="Deposit" icon="plus" />
                          <ActionButton label="Stake" icon="piggy" />
                          <ActionButton label="Send" icon="send" />
                        </div>
                  </section>

              <section className="rounded-[28px] bg-panel px-6 py-10 shadow-[inset_0_1px_0_rgba(23,86,65,0.05)] sm:px-10 sm:py-16">
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
                        Get started with SOL
                      </h2>
                      <p className="mt-4 max-w-[560px] text-xl leading-9 text-foreground/72">
                        Buy SOL to start trading, staking, and exploring.
                        You&apos;ll need a tiny amount of SOL for each Solana
                        transaction.
                      </p>
                      <button
                        type="button"
                        className="mt-8 rounded-full bg-cta px-6 py-3 text-lg font-semibold text-cta-foreground transition hover:opacity-90"
                      >
                        Deposit
                      </button>
                    </div>
                  </section>
            </div>

            <aside className="rounded-[28px] bg-panel px-6 py-6 shadow-[inset_0_1px_0_rgba(23,86,65,0.05)] xl:sticky xl:top-4 xl:h-fit">
              <div className="flex items-center justify-between">
                <h2 className="text-[22px] font-semibold text-foreground">Swap</h2>
                <button
                  type="button"
                  className="text-foreground/70 hover:text-foreground"
                >
                  <Icon name="tune" className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-8 space-y-8">
                <div>
                  <div className="mb-3 flex items-center justify-between text-sm text-foreground/65">
                    <span>Sell</span>
                    <div className="flex gap-2 text-xs text-foreground/45">
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>Max</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-xl bg-foreground/5 px-4 py-3">
                    <button
                      type="button"
                      className="flex items-center gap-3 rounded-xl bg-foreground/5 px-3 py-2"
                    >
                      <TokenPill src="/sol.png" alt="Solana" />
                      <span className="text-[17px] font-semibold">SOL</span>
                      <Icon
                        name="chevron"
                        className="h-4 w-4 rotate-90 text-foreground/35"
                      />
                    </button>
                    <span className="text-[20px] font-semibold text-foreground/75">
                      0
                    </span>
                  </div>

                  <div className="mt-2 text-sm text-foreground/60">
                    Balance: 0
                  </div>
                </div>

                <div className="relative flex justify-center border-t border-foreground/10">
                  <button
                    type="button"
                    className="absolute -top-5 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/8 text-foreground/60"
                  >
                    <Icon name="switch" className="h-4 w-4" />
                  </button>
                </div>

                <div>
                <div className="mb-3 text-sm text-foreground/65">Buy</div>

                  <div className="flex items-center justify-between gap-4 rounded-xl bg-foreground/5 px-4 py-3">
                    <button
                      type="button"
                      className="flex items-center gap-3 rounded-xl bg-foreground/5 px-3 py-2"
                    >
                      <TokenPill src="/usdc.png" alt="USD Coin" />
                      <span className="text-[17px] font-semibold">USDC</span>
                      <Icon
                        name="chevron"
                        className="h-4 w-4 rotate-90 text-foreground/35"
                      />
                    </button>
                    <span className="text-[20px] font-semibold text-foreground/75">
                      0
                    </span>
                  </div>

                  <div className="mt-2 text-sm text-foreground/60">
                    Balance: 0
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled
                className="mt-32 w-full rounded-full bg-foreground/8 px-6 py-4 text-lg font-semibold text-foreground/55"
              >
                Enter amount
              </button>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
