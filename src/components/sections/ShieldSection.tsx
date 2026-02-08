export default function ShieldSection() {
  return (
    <section className="relative z-10 px-4 pb-28">
      <div className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex min-h-[78vh] items-center justify-center rounded-[36px] bg-[#ffef46] p-12 sm:min-h-[88vh] sm:p-16">
            <div className="aspect-square w-full max-w-3xl">
              <video
                className="h-full w-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Shield"
                src="/shield-home-1080.mp4"
              />
            </div>
          </div>
          <div className="flex min-h-[78vh] flex-col rounded-[36px] bg-[#f2f4f8] p-12 sm:min-h-[88vh] sm:p-16">
            <p className="text-[0.9rem] font-semibold uppercase tracking-[0.35em] text-[#0a0c10]">
              Founding the new world
            </p>
            <p className="mt-10 text-4xl font-semibold leading-[1.35] text-[#0a0c10] sm:text-[2.75rem]">
              Solana is the fastest-growing blockchain ecosystem in DeFi and
              Web3, with SOL as its currency. Famed for its speed, near-zero
              fees, and memecoins, it’s also home to a digital community
              building a more secure, lucrative, and fun new world.
            </p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex min-h-[78vh] items-center justify-center rounded-[36px] bg-[#ffef46] p-12 sm:min-h-[88vh] sm:p-16">
            <div className="aspect-square w-full max-w-3xl">
              <video
                className="h-full w-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Keys"
                src="/key-1080.mp4"
              />
            </div>
          </div>
          <div className="flex min-h-[78vh] flex-col rounded-[36px] bg-[#f2f4f8] p-12 sm:min-h-[88vh] sm:p-16">
            <p className="text-[0.9rem] font-semibold uppercase tracking-[0.35em] text-[#0a0c10]">
              Keys to the new world
            </p>
            <p className="mt-10 text-4xl font-semibold leading-[1.35] text-[#0a0c10] sm:text-[2.75rem]">
              Your Solflare wallet is your all-access pass to Solana. It’s a
              secure way to trade coins, stake SOL, and explore a whole new
              world of Solana-based apps. The power is in your hands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
