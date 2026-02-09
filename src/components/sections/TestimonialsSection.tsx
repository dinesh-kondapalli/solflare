"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Shardy🎒",
    handle: "@shardycrypto",
    avatar:
      "https://www.solflare.com/wp-content/uploads/bf-advanced-images/1029/avatar-shardy-200x0.webp",
    text: "I don't use any other crypto wallet other than Solflare. Security is important to me and only @solflare_wallet can provide this.",
    date: "12:31:03 pm · Feb 24, 2025",
  },
  {
    id: 2,
    name: "toly",
    handle: "@aeyakovenko",
    avatar:
      "https://www.solflare.com/wp-content/uploads/bf-advanced-images/988/avatar-toly-200x0.webp",
    text: "@solflare_wallet is awesome. Team is consistently first to ship any new feature for @solana.",
    date: "05:40:49 pm · Apr 6, 2023",
  },
  {
    id: 3,
    name: "Solana Sensei",
    handle: "@SolanaSensei",
    avatar:
      "https://www.solflare.com/wp-content/uploads/bf-advanced-images/1026/avatar-solana-sensei-200x0.webp",
    text: "I have tried every wallet in Solana and I have over 600 different SOL wallets. I think I'm a @solflare_wallet maxi. There are many reasons for this: It is currently my fastest wallet – I'm a SOL maxi and Solflare too – Devs always recommend Solflare – Token swaps are the smoothest – It has the fastest loading time – I can send Multiple NFTs at once",
    date: "07:30:20 pm · Apr 4, 2024",
  },
  {
    id: 4,
    name: "volty",
    handle: "@mgmtvolt",
    avatar:
      "https://www.solflare.com/wp-content/uploads/bf-advanced-images/1027/avatar-volty-200x0.webp",
    text: "I don't own alot of $SOL, but when i do, it will always be in @solflare_wallet. I love this app so much. It's so easy to buy/exchange crypto, and read charts with the amazing UI. I will forever use this app, when buying and storing my Solana.",
    date: "03:37:07 am · Jan 17, 2025",
  },
  {
    id: 5,
    name: "Hatsu 🧪",
    handle: "@hatsunama",
    avatar:
      "https://www.solflare.com/wp-content/uploads/bf-advanced-images/1028/avatar-hatsunama-200x0.webp",
    text: "Best wallet out there. Anything else is a disservice to you. And a disservice to your bags. So Secure. So simple. So Solflare",
    date: "06:22:55 pm · Jun 8, 2025",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const isActive = index === activeIndex;

    if (isActive) {
      return {
        transform: "translateX(0)",
        zIndex: 10,
      };
    } else if (
      diff === -1 ||
      (activeIndex === 0 && index === testimonials.length - 1)
    ) {
      return {
        transform: "translateX(-102%)",
        zIndex: 5,
      };
    } else if (
      diff === 1 ||
      (activeIndex === testimonials.length - 1 && index === 0)
    ) {
      return {
        transform: "translateX(102%)",
        zIndex: 5,
      };
    } else {
      return {
        transform: "translateX(0)",
        zIndex: 0,
      };
    }
  };

  return (
    <section className="relative z-10 bg-[#050608] px-4 pb-28">
      <div className="relative rounded-[36px] bg-[#050608] px-6 py-20 sm:px-16 sm:py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Here to serve
          </p>
          <h2 className="mb-6 text-balance text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Empowering our people
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70 sm:text-xl">
            A product is only as strong as its devoted community. We're here to
            build our wealth, educate and entertain. Join us.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative mx-auto max-w-6xl">
          <div className="relative flex h-[650px] items-center justify-center overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="absolute h-[580px] w-full max-w-md transition-transform duration-300"
                style={getCardStyle(index)}
              >
                <div className="flex h-full flex-col rounded-3xl bg-[#ffef46] p-8 text-black sm:p-10">
                  {/* Author */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-lg font-semibold">
                        {testimonial.name}
                      </p>
                      <p className="truncate text-sm uppercase tracking-wider text-black/60">
                        {testimonial.handle}
                      </p>
                    </div>
                  </div>

                  {/* Text - scrollable if too long */}
                  <div className="flex-1 overflow-y-auto">
                    <p className="text-lg leading-relaxed sm:text-xl">
                      {testimonial.text}
                    </p>
                  </div>

                  {/* Date */}
                  <p className="mt-6 flex-shrink-0 text-sm uppercase tracking-wider text-black/50">
                    {testimonial.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-[#ffef46] text-black"
                    : "border border-white/20 bg-transparent text-white/60 hover:border-white/40"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
