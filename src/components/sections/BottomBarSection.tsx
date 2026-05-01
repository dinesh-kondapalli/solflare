import Image from "next/image";

export default function BottomBarSection() {
  return (
    <section className="relative z-10 flex h-full min-h-[620px] flex-col bg-panel px-4 py-8 text-center text-[#0f4d39] sm:min-h-[calc(100vh-1.5rem)] sm:px-8 sm:py-12 md:px-16 md:py-16">
      {/* Top Spacer - pushes content to center */}
      <div className="flex-1" />

      {/* Solflare Logo - Centered */}
      <div className="flex flex-col items-center">
        <Image
          src="https://www.solflare.com/wp-content/uploads/2024/11/solflare-text-logo.svg"
          alt="Solflare"
          width={800}
          height={160}
          className="h-auto w-[min(16rem,100%)] sm:w-80 md:w-[28rem] lg:w-[42rem]"
        />

        {/* Taglines - Below Solflare */}
        <div className="mt-6 flex flex-col items-center sm:mt-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#0f4d39]">
            The stronghold of the free
          </p>
          <p className="mb-6 text-sm font-medium uppercase tracking-wider text-[#0f4d39]">
            Population 3,000,000+ · Est 2021
          </p>
          <p className="text-xl font-bold uppercase tracking-widest text-[#0f4d39]">
            Hold strong
          </p>
        </div>
      </div>

      {/* Bottom Spacer - pushes copyright to bottom */}
      <div className="flex-1" />

      {/* Copyright - Bottom */}
      <div>
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#0f4d39]">
          Copyright ©2026 Solflare.
        </p>
        <p className="text-sm text-[#0f4d39]/70">
          Solrise Finance Ltd
          <br />
          2nd Floor, Ellen L. Skelton Building, Fishers Lane | Road Town,
          Tortola, British Virgin Islands, VG 1110
        </p>
      </div>
    </section>
  );
}
