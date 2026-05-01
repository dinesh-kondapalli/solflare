export default function PreFooterSection() {
  return (
    <section className="relative z-10 bg-[#050608] px-4 pb-4">
      <div className="relative flex min-h-[80vh] flex-col items-center overflow-hidden rounded-[36px] bg-[#e7e8ef] px-6 pt-16 pb-0 sm:px-16 sm:pt-20">
        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl px-4 pt-8 text-center">
          {/* Title */}
          <h2 className="mb-4 whitespace-pre-line text-4xl font-bold leading-[1.1] text-black sm:text-5xl lg:text-6xl xl:text-7xl">
            In every wallet a kingdom,{"\n"}on every head a crown
          </h2>

          {/* Subtitle */}
          <p className="mb-8 text-xl text-black/70 sm:text-2xl lg:text-3xl">
            Master your own crypto destiny with your Solflare wallet.
          </p>
        </div>

        {/* Video - pushed to bottom */}
        <div className="relative mt-auto w-full max-w-4xl">
          <video
            className="h-auto w-full"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="https://www.solflare.com/wp-content/uploads/bf-advanced-images/1408/flag-700x0.webp"
            aria-label="Flag video"
          >
            <source
              src="https://www.solflare.com/wp-content/uploads/2025/03/flag-1080.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
}
