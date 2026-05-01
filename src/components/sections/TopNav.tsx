import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const navItems = [
  { label: "Product", hasDropdown: true },
  { label: "Token Prices", hasDropdown: false },
  { label: "Resources", hasDropdown: true },
  { label: "Explore Solana", hasDropdown: true },
];

export default function TopNav() {
  return (
    <nav className="relative z-20 w-full bg-[#050608] px-10 pt-6">
      <div className="w-full">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a
              href="/"
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent)] text-black"
            >
              <Image
                src="/App-Icon.svg"
                alt="Solflare logo"
                width={40}
                height={40}
                priority
              />
            </a>
            <ul className="hidden items-center gap-8 text-lg font-medium text-white/90 lg:flex">
              {navItems.map((item) => (
                <li key={item.label} className="flex items-center gap-1">
                  <span>{item.label}</span>
                  {item.hasDropdown ? (
                    <CaretDown weight="fill" className="h-3.5 w-3.5" />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 text-lg font-semibold">
            <button
              type="button"
              className="rounded-full bg-[var(--accent)] px-8 py-3 text-black transition hover:-translate-y-0.5"
            >
              Get extension
            </button>
            <button
              type="button"
              className="rounded-full border border-white/15 bg-white/10 px-8 py-3 text-white/90 transition hover:-translate-y-0.5"
            >
              Download now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
