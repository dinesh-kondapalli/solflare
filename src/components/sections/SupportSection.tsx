"use client";

import { useEffect, useRef, useState } from "react";

export default function SupportSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Animation triggers when title is in view
      // Start when title enters from bottom
      const triggerPoint = windowHeight * 0.6;
      const endPoint = windowHeight * 0.1;

      const rawProgress = (triggerPoint - rect.top) / (triggerPoint - endPoint);
      const progress = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ellipse gradient rises from bottom
  const gradientHeight = scrollProgress * 400; // 0% to 400% of section height
  const gradientWidth = 100 + scrollProgress * 200; // 100% to 300% width
  // Solid yellow overlay fades in from 50% to 80% progress for smoother transition
  const solidYellowOpacity =
    scrollProgress > 0.5 ? Math.min(1, (scrollProgress - 0.5) / 0.3) : 0;

  // Text color transitions: white → gray → black with ease
  const getTextColor = () => {
    if (scrollProgress < 0.25) {
      // White to gray (0-25%) - ease out
      const t = 1 - (1 - scrollProgress / 0.25) ** 2;
      return `rgb(${255 - t * 127}, ${255 - t * 127}, ${255 - t * 127})`;
    } else {
      // Gray to black (25-100%) - ease in out
      const t = (scrollProgress - 0.25) / 0.75;
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      return `rgb(${128 - eased * 128}, ${128 - eased * 128}, ${128 - eased * 128})`;
    }
  };

  // Secondary text color (slightly lighter)
  const getSecondaryColor = () => {
    if (scrollProgress < 0.25) {
      const t = 1 - (1 - scrollProgress / 0.25) ** 2;
      return `rgba(${255 - t * 127}, ${255 - t * 127}, ${255 - t * 127}, 0.7)`;
    } else {
      const t = (scrollProgress - 0.25) / 0.75;
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      return `rgba(${128 - eased * 128}, ${128 - eased * 128}, ${128 - eased * 128}, 0.7)`;
    }
  };

  return (
    <section className="relative z-10 bg-[#050608] px-4 pb-28">
      <div
        ref={sectionRef}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden rounded-[36px] px-8 py-32 sm:px-20 sm:py-40"
        style={{ backgroundColor: "#050608" }}
      >
        {/* Rising radial gradient from bottom - golden to yellow */}
        <div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: 0,
            width: `${gradientWidth}%`,
            height: `${gradientHeight}%`,
            background: `radial-gradient(ellipse 100% 100% at 50% 100%,
              #ffef46 0%,
              #f4d03f 15%,
              #d4ac0d 35%,
              #9a7d0a 55%,
              #5c4a08 75%,
              transparent 100%)`,
            opacity: scrollProgress > 0 ? 1 : 0,
            transition: "width 0.1s ease-out, height 0.1s ease-out",
          }}
        />

        {/* Solid yellow overlay for complete coverage at the end */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundColor: "#ffef46",
            opacity: solidYellowOpacity,
            transition: "opacity 0.3s ease-out",
          }}
        />

        {/* Content wrapper */}
        <div className="relative z-10 w-full max-w-6xl text-center">
          {/* Eyebrow */}
          <p
            className="mb-10 text-sm font-semibold uppercase tracking-[0.3em]"
            style={{
              color: getSecondaryColor(),
              transition: "color 0.2s ease-out",
            }}
          >
            We've got your back
          </p>

          {/* Title */}
          <h2
            className="mb-12 text-balance text-6xl font-bold leading-[1.05] sm:text-7xl lg:text-8xl xl:text-9xl"
            style={{
              color: getTextColor(),
              transition: "color 0.2s ease-out",
            }}
          >
            Around-the-clock
            <br />
            human support
          </h2>

          {/* Description */}
          <p
            className="mx-auto mb-8 max-w-3xl text-2xl leading-relaxed sm:text-3xl"
            style={{
              color: getSecondaryColor(),
              transition: "color 0.2s ease-out",
            }}
          >
            Whether you're new to crypto or an established force, our live-chat
            support is here to help 24/7. They are battle-tested and endlessly
            patient—your powerful helping hand on Solana.
          </p>

          {/* Need help text */}
          <p
            className="mb-12 text-2xl sm:text-3xl"
            style={{
              color: getTextColor(),
              transition: "color 0.2s ease-out",
            }}
          >
            Need help?
          </p>

          {/* CTA Button */}
          <a
            href="https://help.solflare.com/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-12 py-5 text-xl font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: scrollProgress > 0.5 ? "#000" : "#fff",
              color: scrollProgress > 0.5 ? "#fff" : "#000",
              transition: "all 0.3s ease",
            }}
          >
            Let's talk
          </a>
        </div>

        {/* Time tag */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 sm:left-10">
          <div
            className="rounded-xl border px-4 py-2.5"
            style={{
              borderColor:
                scrollProgress > 0.5
                  ? "rgba(0,0,0,0.2)"
                  : "rgba(255,255,255,0.2)",
              transition: "border-color 0.3s ease",
            }}
          >
            <span
              className="font-mono text-base font-medium"
              style={{
                color: getSecondaryColor(),
                transition: "color 0.2s ease-out",
              }}
            >
              05:00
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
