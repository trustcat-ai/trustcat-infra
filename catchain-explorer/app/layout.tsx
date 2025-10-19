import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "CatChain | TrustCat.ai Block Explorer",
  description: "Welcome to the Trust Machine. Explore TrustCat.ai's immutable compute ledger with full transparency.",
  keywords: ["blockchain", "compute", "GPU", "TrustCat.ai", "USDC", "Web3", "trust machine"],
  openGraph: {
    title: "CatChain Block Explorer",
    description: "Welcome to the Trust Machine",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TrustCatAI",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
