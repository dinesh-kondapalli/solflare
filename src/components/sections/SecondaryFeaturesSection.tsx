"use client";

import Image from "next/image";

const features = [
  {
    eyebrow: "Quick transfer",
    title: "Send & receive Solana assets",
    bg: "#FFA6EA",
    image: "/canvas.png",
  },
  {
    eyebrow: "Get coins",
    title: "Buy crypto within wallet",
    bg: "#7F9FF6",
    image: "/canvas-2.png",
  },
  {
    eyebrow: "Personalized gallery",
    title: "Buy, collect and sell NFTs",
    bg: "#D1D4DD",
    image: "/canvas-3.png",
  },
  {
    eyebrow: "Defi. Games. Exchanges.",
    title: "Explore Solana securely",
    bg: "#FF9340",
    image: "/canvas-4.png",
  },
];

function FeatureCard({
  eyebrow,
  title,
  bg,
  image,
}: {
  eyebrow: string;
  title: string;
  bg: string;
  image: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="flex w-full flex-col items-center justify-center rounded-[32px] px-6 py-12 text-center"
        style={{ backgroundColor: bg }}
      >
        <div className="aspect-square w-full max-w-[240px] overflow-hidden bg-black/85">
          <Image
            src={image}
            alt={title}
            width={480}
            height={480}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="mt-6 space-y-2 text-center">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-[#0a0c10]">
          {eyebrow}
        </p>
        <h3 className="text-xl font-semibold text-[#0a0c10] sm:text-2xl">
          {title}
        </h3>
      </div>
    </div>
  );
}

export default function SecondaryFeaturesSection() {
  return (
    <section className="relative z-10 px-4 pb-6">
      <div className="rounded-[36px] bg-[#f2f4f8] px-6 py-16 sm:px-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[140px_1fr]">
          <div className="flex items-start">
            <div className="sticky top-28">
              <span className="rounded-full border border-[#0a0c10]/30 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#0a0c10]">
                Features
              </span>
            </div>
          </div>
          <div className="space-y-16">
            <h2 className="text-center text-4xl font-semibold text-[#0a0c10] sm:text-5xl">
              Make every asset an asset
            </h2>
            <div className="grid gap-x-6 gap-y-12 md:grid-cols-2">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="rounded-full bg-[#0a0c10] px-8 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Start strong
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
