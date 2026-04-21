import {
  DiscordLogo,
  LinkedinLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  secondary: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
    { label: "Sitemap", href: "#" },
    { label: "Brand Kit", href: "#" },
  ],
  primary: [
    {
      title: "Product",
      links: [
        { label: "Overview", href: "#" },
        { label: "Essential features", href: "#" },
        { label: "Security", href: "#" },
        { label: "Trading", href: "#" },
        { label: "Staking", href: "#" },
      ],
    },
    {
      title: "Education",
      links: [
        { label: "Resources", href: "#" },
        { label: "Explore Solana", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Newsletter", href: "#" },
      ],
    },
  ],
};

const socialLinks = [
  {
    label: "X",
    href: "https://x.com/solflare/",
    icon: <XLogo weight="fill" className="h-6 w-6" />,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@SolflareWallet",
    icon: <YoutubeLogo weight="fill" className="h-6 w-6" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/solflare-official/",
    icon: <LinkedinLogo weight="fill" className="h-6 w-6" />,
  },
  {
    label: "Discord",
    href: "https://discord.com/invite/solflare",
    icon: <DiscordLogo weight="fill" className="h-6 w-6" />,
  },
];

export default function FooterSection() {
  return (
    <footer className="relative z-10 bg-[#050608] px-4 pb-4">
      <div className="grid min-h-screen gap-4 lg:grid-cols-2">
        {/* Left Card - CTA */}
        <div className="flex min-h-screen flex-col items-center justify-between rounded-[36px] bg-[#15171e] px-8 py-12 text-center lg:px-16 lg:py-20">
          {/* Top Content */}
          <div className="w-full">
            {/* Eyebrow */}
            <p className="mb-8 text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              Enter the stronghold
            </p>

            {/* Title */}
            <h2 className="mx-auto max-w-lg text-balance text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl">
              Solflare: the most powerful wallet on Solana
            </h2>
          </div>

          {/* Logo */}
          <div className="my-16">
            <Image
              src="https://www.solflare.com/wp-content/uploads/2024/11/App-Icon.svg"
              alt="Solflare logo"
              width={280}
              height={280}
              className="h-auto w-56 lg:w-72"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.solflare.com/download/"
              className="rounded-full bg-white/10 px-8 py-4 text-base font-medium text-white transition hover:bg-white/20"
            >
              Download now
            </a>
            <Link
              href="/portfolio"
              className="rounded-full bg-white/10 px-8 py-4 text-base font-medium text-white transition hover:bg-white/20"
            >
              Access wallet
            </Link>
          </div>
        </div>

        {/* Right Card - Navigation */}
        <div className="flex min-h-screen flex-col rounded-[36px] bg-[#15171e] px-8 py-12 lg:px-16 lg:py-20">
          {/* Secondary Links */}
          <nav className="mb-16">
            <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium uppercase tracking-wider text-white/70 lg:justify-end">
              {footerLinks.secondary.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Primary Links */}
          <nav className="flex-1">
            {footerLinks.primary.map((section) => (
              <div
                key={section.title}
                className="border-t border-white/10 py-6 first:border-t-0 first:pt-0"
              >
                <div className="flex items-start justify-between">
                  <h3 className="pt-2 text-sm font-medium uppercase tracking-wider text-white/70">
                    {section.title}
                  </h3>
                  <ul className="flex flex-col items-end gap-4">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-2xl font-semibold text-white transition hover:text-white/70 lg:text-3xl"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </nav>

          {/* Social Links */}
          <div className="mt-auto flex justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-16 w-20 items-center justify-center rounded-full bg-[#1e2028] text-white transition hover:bg-[#2a2d36]"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
