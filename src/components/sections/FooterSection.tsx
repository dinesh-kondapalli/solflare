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
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 28 28" fill="currentColor">
        <title>X</title>
        <path d="M16.6643 11.849L27.0879 -0.000976562H24.6179L15.567 10.2882L8.33814 -0.000976562H0.000488281L10.932 15.5581L0.000488281 27.9847H2.4707L12.0286 17.1189L19.6628 27.9847H28.0005L16.6637 11.849H16.6643ZM13.281 15.6952L12.1734 14.1458L3.36075 1.81764H7.15484L14.2668 11.7669L15.3744 13.3162L24.619 26.2487H20.8249L13.281 15.6958V15.6952Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@SolflareWallet",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 36 36" fill="currentColor">
        <title>YouTube</title>
        <path d="M30.4036 7.89995C25.5011 7.54381 18.0753 7.54381 18 7.54381V7.56689H17.9902C17.9182 7.56689 10.4989 7.57019 5.58982 7.92303L5.37382 7.94281L5.35924 7.94424C4.72464 8.00651 4.00709 8.07691 3.31855 8.79359C2.99782 9.11675 2.61818 10.2841 2.49055 11.125C2.28415 12.9545 2.1749 14.7939 2.16327 16.6352V19.326C2.17441 21.1673 2.28366 23.0067 2.49055 24.8362C2.61491 25.6672 2.988 26.8313 3.31527 27.161C3.924 27.7975 4.77164 27.8997 5.51782 27.9887C5.70764 28.0085 5.868 28.0316 6.03491 28.058C8.83964 28.2987 17.6269 28.3877 18.0033 28.3877C18.3305 28.3877 25.5862 28.3547 30.4036 28.025L30.6262 28.0019L30.6313 28.0014C31.2682 27.9389 31.9895 27.8681 32.6782 27.1511C32.9989 26.8412 33.3818 25.6573 33.5029 24.8428C33.7094 23.0122 33.8186 21.1717 33.8302 19.3293V16.6121C33.819 14.7708 33.7098 12.9314 33.5029 11.1019C33.3753 10.2676 33.0022 9.10026 32.6749 8.7705C31.9811 8.04834 31.2742 7.97909 30.6196 7.91973L30.4036 7.89995ZM23.9994 17.9996L14.3994 23.3996V12.5996L23.9994 17.9996Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/solflare-official/",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <title>LinkedIn</title>
        <path d="M16.527 19.7638H19.649V13.3579C19.649 10.155 17.6978 9.08732 15.8441 9.08732C14.1856 9.08732 13.0148 10.155 12.7222 10.8344V9.3785H9.60022V19.7638H12.9173V14.2314C12.9173 12.7756 13.8929 11.9991 14.8685 11.9991C15.8441 11.9991 16.527 12.4844 16.527 14.1344V19.7638Z" />
        <path d="M4.42949 9.3785V19.7638H7.74657V9.3785H4.42949Z" />
        <path d="M4.23438 6.07849C4.23438 7.14614 5.01486 7.92261 6.08803 7.92261C7.16119 7.92261 7.94169 7.14614 7.94169 6.07849C7.94169 5.01085 7.16119 4.23438 6.08803 4.23438C5.11242 4.23438 4.23438 5.01085 4.23438 6.07849Z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "https://discord.com/invite/solflare",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 29 23" fill="currentColor">
        <title>Discord</title>
        <path d="M23.7188 2.28125C26.8125 6.875 28.3594 12.0312 27.7969 17.9844C27.7969 17.9844 27.7969 18.0312 27.75 18.0312C25.6875 19.5781 23.3438 20.75 20.8594 21.5C20.8125 21.5469 20.8125 21.5 20.7656 21.5C20.25 20.75 19.7812 20 19.3594 19.2031C19.3594 19.1562 19.3594 19.1562 19.3594 19.1094L19.4062 19.0625C20.1562 18.7812 20.8594 18.4531 21.5625 18.0312C21.5625 18.0312 21.6094 18.0312 21.6094 17.9844C21.6094 17.9375 21.6094 17.9375 21.5625 17.8906C21.4219 17.7969 21.2812 17.7031 21.1406 17.5625C21.0938 17.5625 21.0938 17.5625 21.0469 17.5625C16.5938 19.625 11.7188 19.625 7.21875 17.5625C7.17188 17.5625 7.125 17.5625 7.125 17.5625C6.98438 17.7031 6.84375 17.7969 6.70312 17.8906C6.65625 17.9375 6.65625 17.9375 6.65625 17.9844C6.65625 18.0312 6.65625 18.0312 6.70312 18.0312C7.35938 18.4531 8.10938 18.7812 8.85938 19.0625C8.85938 19.0625 8.85938 19.1094 8.90625 19.1094C8.90625 19.1562 8.90625 19.1562 8.90625 19.2031C8.48438 20 8.01562 20.75 7.5 21.5C7.45312 21.5 7.40625 21.5469 7.40625 21.5C4.92188 20.75 2.57812 19.5781 0.515625 18.0312C0.46875 18.0312 0.46875 17.9844 0.46875 17.9844C0 12.8281 0.984375 7.625 4.54688 2.28125C4.54688 2.28125 4.54688 2.28125 4.59375 2.28125C6.375 1.4375 8.25 0.875 10.1719 0.546875C10.2188 0.5 10.2656 0.546875 10.2656 0.546875C10.5469 1.01562 10.7812 1.53125 10.9688 2C13.0781 1.67188 15.1875 1.67188 17.2969 2C17.4844 1.53125 17.7188 1.01562 18 0.546875C18 0.546875 18.0469 0.5 18.0938 0.546875C20.0156 0.875 21.8906 1.4375 23.6719 2.28125C23.7188 2.28125 23.7188 2.28125 23.7188 2.28125ZM9.5625 14.8438C10.9219 14.8438 12.0469 13.5781 12.0469 12.0781C12.0469 10.5312 10.9688 9.3125 9.5625 9.3125C8.20312 9.3125 7.07812 10.5312 7.07812 12.0781C7.07812 13.5781 8.20312 14.8438 9.5625 14.8438ZM18.7031 14.8438C20.1094 14.8438 21.1875 13.5781 21.1875 12.0781C21.2344 10.5312 20.1094 9.3125 18.7031 9.3125C17.3438 9.3125 16.2656 10.5312 16.2656 12.0781C16.2656 13.5781 17.3438 14.8438 18.7031 14.8438Z" />
      </svg>
    ),
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
