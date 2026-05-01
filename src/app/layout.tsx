import type { Metadata } from "next";
import localFont from "next/font/local";
import { WalletProvider } from "@/providers/WalletProvider";
import "./globals.css";

const fkGrotesk = localFont({
  src: "../../public/FKGroteskTrial-Regular.otf",
  variable: "--font-fk-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BWICK Wallet",
  description: "Non-custodial BWICK chain wallet.",
  icons: {
    icon: "/App-Icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fkGrotesk.variable} antialiased`}
        style={{
          ["--font-space-mono" as string]:
            '"SFMono-Regular", "Liberation Mono", Consolas, monospace',
        }}
      >
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
