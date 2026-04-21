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
      <div className="min-h-screen w-full p-2 sm:p-3">
        <section className="min-w-0">
          <div className="flex items-center justify-between gap-4 px-3 py-2 sm:px-5 sm:py-4">
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
                <div>
                  <div className="text-[14px] font-semibold">Main Wallet</div>
                </div>
                <Icon name="chevron" className="h-4 w-4 text-foreground/50" />
              </button>
            </div>
          </div>

          <div className="mx-auto mt-3 max-w-[1120px]">
            <div className="space-y-4">
              <section className="overflow-hidden rounded-[28px] bg-panel-2 px-8 py-8 text-background shadow-[inset_0_1px_0_rgba(23,86,65,0.06)] sm:px-8 sm:py-8">
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-background/70">
                  <span>BALANCE</span>
                  <span className="ml-2 inline-flex align-middle text-background/50">
                    <Icon name="info" className="h-4 w-4" />
                  </span>
                </div>

                <div className="mt-2 flex items-end gap-2">
                  <div className="text-5xl font-semibold tracking-tight">
                    $0.00
                  </div>
                  <div className="mb-1 text-background/45">
                    <Icon name="eye-off" className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-1 flex items-center gap-2 text-lg text-background/70">
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
                    Get started with SOL
                  </h2>
                  <p className="mt-4 max-w-[560px] text-xl leading-9 text-background/72">
                    Buy SOL to start trading, staking, and exploring.
                    You&apos;ll need a tiny amount of SOL for each Solana
                    transaction.
                  </p>
                  <button
                    type="button"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-lg font-semibold text-cta-foreground transition hover:opacity-90"
                  >
                    <Icon name="plus" className="h-5 w-5" />
                    Deposit
                  </button>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
