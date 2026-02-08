import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative z-10 bg-[#050608] px-10 pb-20 pt-16">
      <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-6">
          <h1 className="max-w-2xl text-balance text-5xl font-semibold leading-[1.12] text-white sm:text-6xl lg:text-[4.1rem]">
            <span className="block">Spend with your</span>
            <span className="block">Solflare</span>
            <span className="block">Mastercard</span>
          </h1>
          <p className="max-w-xl text-2xl text-white/70">
            Climb the leaderboard to win a Porsche 911 GT
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-full bg-[var(--accent)] px-7 py-3.5 text-base font-semibold text-black transition hover:-translate-y-0.5"
            >
              Get your card
            </button>
          </div>
        </div>
        <div className="relative flex items-start justify-end lg:pt-2">
          <div className="relative -ml-12">
            <div className="relative w-[520px] max-w-[88vw] overflow-hidden rounded-[28px] bg-[#050608] sm:w-[580px]">
              <div className="aspect-[4/3] w-full">
                <video
                  className="h-full w-full object-contain"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/home_hero_cards_1080_poster-1200x0.webp"
                >
                  <source src="/Banner_1244_700.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
