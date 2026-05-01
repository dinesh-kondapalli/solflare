"use client";

import { GlobeHemisphereWest } from "@phosphor-icons/react";
import Image from "next/image";
import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
  mediaSrc: string;
  mediaType?: "video" | "image";
  mediaAlt: string;
  mediaTheme?: "yellow" | "dark";
};

export default function AuthShell({
  children,
  mediaSrc,
  mediaType = "video",
  mediaAlt,
  mediaTheme = "yellow",
}: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[#05070b] p-3 text-[#f2f4f8] sm:p-4">
      <div className="grid min-h-[calc(100vh-1.5rem)] grid-cols-1 gap-3 lg:grid-cols-[minmax(420px,0.98fr)_minmax(480px,1fr)]">
        <section className="relative overflow-hidden rounded-[34px] bg-[#0b0e14] px-6 py-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:px-10 sm:py-8 lg:px-12 lg:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#151b26,transparent_48%)] opacity-80" />
          <div className="relative flex min-h-[calc(100vh-3rem)] flex-col lg:min-h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-between gap-4">
              <Image
                src="/solflare-text-logo.svg"
                alt="BWICK Wallet"
                width={180}
                height={48}
                className="h-auto w-[140px] sm:w-[172px]"
                priority
              />
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70">
                <GlobeHemisphereWest className="h-5 w-5" weight="duotone" />
              </div>
            </div>

            <div className="flex flex-1 items-center">{children}</div>
          </div>
        </section>

        <aside
          className={`relative hidden overflow-hidden rounded-[34px] lg:block ${mediaTheme === "yellow" ? "bg-[#ffea4f]" : "bg-[#04070d]"}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_45%)]" />
          <div className="relative flex h-full items-center justify-center p-8">
            {mediaType === "video" ? (
              <video
                src={mediaSrc}
                autoPlay
                loop
                muted
                playsInline
                aria-label={mediaAlt}
                className="max-h-[88%] w-full object-contain"
              />
            ) : (
              <Image
                src={mediaSrc}
                alt={mediaAlt}
                width={1200}
                height={1200}
                className="max-h-[88%] w-full object-contain"
                priority
              />
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
