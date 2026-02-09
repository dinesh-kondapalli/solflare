import Image from "next/image";

export default function BottomBarSection() {
  return (
    <section className="relative z-10 bg-[#050608] px-4 pb-4">
      <div className="flex min-h-screen flex-col rounded-[36px] bg-[#ffef46] px-6 py-20 text-center sm:px-16">
        {/* Top Spacer - pushes content to center */}
        <div className="flex-1" />

        {/* Solflare Logo - Centered */}
        <div className="flex flex-col items-center">
          <Image
            src="https://www.solflare.com/wp-content/uploads/2024/11/solflare-text-logo.svg"
            alt="Solflare"
            width={800}
            height={160}
            className="h-auto w-80 sm:w-[28rem] lg:w-[700px]"
          />

          {/* Taglines - Below Solflare */}
          <div className="mt-8 flex flex-col items-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-black">
              The stronghold of the free
            </p>
            <p className="mb-6 text-sm font-medium uppercase tracking-wider text-black">
              Population 3,000,000+ · Est 2021
            </p>
            <p className="text-xl font-bold uppercase tracking-widest text-black">
              Hold strong
            </p>
          </div>
        </div>

        {/* Bottom Spacer - pushes copyright to bottom */}
        <div className="flex-1" />

        {/* Copyright - Bottom */}
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-black">
            Copyright ©2026 Solflare.
          </p>
          <p className="text-sm text-black/70">
            Solrise Finance Ltd
            <br />
            2nd Floor, Ellen L. Skelton Building, Fishers Lane | Road Town,
            Tortola, British Virgin Islands, VG 1110
          </p>
        </div>
      </div>
    </section>
  );
}
