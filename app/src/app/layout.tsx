import type { Metadata } from "next";
import "./globals.css";
import WalletStatus from "@/components/WalletStatus";

export const metadata: Metadata = {
  title: 'MonadPass — NFT Event Ticketing on Monad',
  description:
    'Buy, sell, and verify event tickets as ERC-721 NFTs on Monad. Anti-counterfeit, on-chain check-in, and commemorative badges for every attendee.',
  keywords: ['NFT tickets', 'Monad', 'blockchain', 'event ticketing', 'web3'],
  openGraph: {
    title: 'MonadPass',
    description: 'NFT-based event ticketing on Monad blockchain.',
    type: 'website',
  },
}

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
  )
}
