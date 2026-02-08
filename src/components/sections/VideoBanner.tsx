export default function VideoBanner() {
  return (
    <section className="relative z-10 px-4 pb-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[var(--bg-elevated)]">
          <div className="grid gap-10 p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Spend Anywhere
              </p>
              <h3 className="text-3xl font-semibold text-white">
                Your Solflare card in motion
              </h3>
              <p className="text-base text-white/70">
                Seamless in-store and online payments, all tracked inside the
                Solflare wallet.
              </p>
              <button
                type="button"
                className="mt-4 rounded-full border border-white/20 px-6 py-2 text-sm font-semibold text-white/90 transition hover:-translate-y-0.5"
              >
                Watch the demo
              </button>
            </div>
            <div className="relative">
              <div className="absolute -inset-8 rounded-[32px] bg-[var(--card-glow)] blur-[120px]" />
              <div className="relative overflow-hidden rounded-[24px] border border-white/10">
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
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
