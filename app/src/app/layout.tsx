import type { Metadata } from "next";
import "./globals.css";
import WalletStatus from "@/components/WalletStatus";

export const metadata: Metadata = {
  title: "MonadPass",
  description: "NFT-based event ticketing on Monad",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a href="/" className="site-logo">MonadPass</a>
          <WalletStatus />
        </header>
        {children}
      </body>
    </html>
  );
}
