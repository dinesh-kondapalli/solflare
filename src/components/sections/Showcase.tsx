import Image from "next/image";

export default function Showcase() {
  return (
    <section className="relative z-10 px-4 pb-20">
      <div className="w-full rounded-[36px] bg-[#f2f4f8] px-10 py-16 sm:px-20 sm:py-20">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-12">
              <Image
                src="/solflare-text-logo.svg"
                alt="Solflare"
                width={640}
                height={220}
                className="h-auto w-[380px] sm:w-[520px] lg:w-[640px]"
              />
            </div>
            <h2 className="max-w-5xl text-balance text-4xl font-semibold leading-[1.25] text-[#0d1117] sm:text-5xl lg:text-[3.4rem]">
              Hold strong and spend instantly with the most powerful wallet on
              Solana
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                className="rounded-full border border-[#0a0c10] bg-[#0a0c10] px-7 py-3 text-sm font-semibold text-white shadow-[0_0_0_3px_rgba(10,12,16,0.08)] transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Get extension
              </button>
              <button
                type="button"
                className="rounded-full border border-[#0a0c10] px-7 py-3 text-sm font-semibold text-[#0a0c10] transition hover:-translate-y-0.5 hover:bg-[#0a0c10] hover:text-white"
              >
                Download now
              </button>
            </div>
          </div>
          <div className="mt-20 w-full max-w-2xl">
            <div className="aspect-square w-full overflow-hidden rounded-[28px] bg-[#f2f4f8] shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              <video
                key="home-hero-cards"
                className="h-full w-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/home_hero_cards_1080_poster-1200x0.webp"
                aria-label="Video"
                src="/home_hero_cards_1080.mp4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
