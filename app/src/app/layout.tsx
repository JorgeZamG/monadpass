import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

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
    <html lang="es" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
