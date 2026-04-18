import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const fkGrotesk = localFont({
  src: "../../public/FKGroteskTrial-Regular.otf",
  variable: "--font-fk-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solflare - Spend with your Solflare Mastercard",
  description: "Clone of Solflare homepage hero and sections.",
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
      <body className={`${fkGrotesk.variable} ${spaceMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
