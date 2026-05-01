import Image from "next/image";

export default function LiberateSection() {
  return (
    <section className="relative z-10 px-4 pb-28">
      <div className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex min-h-[78vh] items-center justify-center rounded-[36px] bg-[#3d39b7] p-12 sm:min-h-[88vh] sm:p-16">
            <div className="relative aspect-square w-full max-w-3xl">
              <div className="absolute left-0 top-0">
                <Image
                  src="/icon-1.svg"
                  alt="Crown icon"
                  width={36}
                  height={36}
                />
              </div>
              <video
                className="h-full w-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Liberate finances"
                src="/home-liberate-finances-1080.mp4"
              />
            </div>
          </div>
          <div className="flex min-h-[78vh] flex-col rounded-[36px] bg-[#f2f4f8] p-12 sm:min-h-[88vh] sm:p-16">
            <h3 className="text-4xl font-semibold leading-[1.1] text-[#0a0c10] sm:text-[3.25rem]">
              Liberate your finances
            </h3>
            <p className="mt-10 text-2xl font-semibold leading-[1.5] text-[#0a0c10] sm:text-[2rem]">
              From live market updates to trend detection, Solflare has all the
              tools you need to trade and stake successfully.
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-4 pt-12">
              <button
                type="button"
                className="rounded-full bg-[#0a0c10] px-8 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Master your trade
              </button>
              <button
                type="button"
                className="rounded-full border border-[#0a0c10] px-8 py-3 text-sm font-semibold text-[#0a0c10] transition hover:-translate-y-0.5 hover:bg-[#0a0c10] hover:text-white"
              >
                Stake your claim
              </button>
            </div>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex min-h-[78vh] flex-col rounded-[36px] bg-[#f2f4f8] p-12 sm:min-h-[88vh] sm:p-16">
            <h3 className="text-4xl font-semibold leading-[1.1] text-[#0a0c10] sm:text-[3.25rem]">
              Keep your valuables safe
            </h3>
            <p className="mt-10 text-2xl font-semibold leading-[1.5] text-[#0a0c10] sm:text-[2rem]">
              Putting your coins and NFTs in Solflare means securing them in the
              safest crypto Stronghold. Your security is our sacred principle.
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-4 pt-12">
              <button
                type="button"
                className="rounded-full bg-[#0a0c10] px-8 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Enter Stronghold
              </button>
            </div>
          </div>
          <div className="flex min-h-[78vh] items-center justify-center rounded-[36px] bg-[#9a1f5f] p-12 sm:min-h-[88vh] sm:p-16">
            <div className="relative aspect-square w-full max-w-3xl">
              <div className="absolute left-0 top-0">
                <Image
                  src="/icon-2.svg"
                  alt="Shield icon"
                  width={36}
                  height={36}
                />
              </div>
              <video
                className="h-full w-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Maximum security"
                src="/home-maximum-security-1080.mp4"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex min-h-[78vh] items-center justify-center rounded-[36px] bg-[#7f9bf6] p-12 sm:min-h-[88vh] sm:p-16">
            <div className="relative aspect-square w-full max-w-3xl">
              <video
                className="h-full w-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Hardware wallet"
                src="/homepage-hardware-wallet-tap-1080.mp4"
              />
            </div>
          </div>
          <div className="flex min-h-[78vh] flex-col rounded-[36px] bg-[#f2f4f8] p-12 sm:min-h-[88vh] sm:p-16">
            <h3 className="text-4xl font-semibold leading-[1.1] text-[#0a0c10] sm:text-[3.25rem]">
              Protect with hardware
            </h3>
            <p className="mt-10 text-2xl font-semibold leading-[1.5] text-[#0a0c10] sm:text-[2rem]">
              Pair your wallet with hardware to lock down approvals and keep
              your keys under your control at every step.
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-4 pt-12">
              <button
                type="button"
                className="rounded-full bg-[#0a0c10] px-8 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Explore hardware
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
