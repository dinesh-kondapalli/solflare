export default function CardSpendSection() {
  return (
    <section className="relative z-10 px-4 pb-28">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex min-h-[78vh] items-center justify-center rounded-[36px] bg-[#9a1f5f] p-12 sm:min-h-[88vh] sm:p-16">
          <div className="relative aspect-square w-full max-w-3xl">
            <video
              className="h-full w-full object-contain"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="On chain in store"
              src="/on-chain-in-store-1080.mp4"
            />
          </div>
        </div>
        <div className="flex min-h-[78vh] flex-col rounded-[36px] bg-[#f2f4f8] p-12 sm:min-h-[88vh] sm:p-16">
          <h3 className="text-4xl font-semibold leading-[1.1] text-[#0a0c10] sm:text-[3.25rem]">
            First true self-custody debit card
          </h3>
          <p className="mt-10 text-2xl font-semibold leading-[1.5] text-[#0a0c10] sm:text-[2rem]">
            On chain. In store. The Solflare Card enables you to spend $USDC
            directly from your wallet. Powered by Mastercard and accepted at
            100M+ merchants worldwide.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-12">
            <button
              type="button"
              className="rounded-full bg-[#0a0c10] px-8 py-3 text-sm font-semibold text-white"
            >
              Get Solflare Card now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
