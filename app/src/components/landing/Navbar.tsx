'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Ticket, Menu, X } from 'lucide-react'
import { ConnectButton } from '@/components/wallet'

export interface NavLink { label: string; href: string }

export interface NavbarProps {
  logo?:  string
  links?: NavLink[]
}

const defaultLinks: NavLink[] = [
  { label: 'Funciones',     href: '#features'     },
  { label: 'Cómo funciona', href: '#how-it-works' },
  { label: 'Precios',       href: '#pricing'      },
  { label: 'Docs',          href: '#'             },
]

export default function Navbar({
  logo  = 'MonadPass',
  links = defaultLinks,
}: NavbarProps) {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-lg">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" aria-label="MonadPass home">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center glow-purple">
              <Ticket size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">{logo}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Wallet button — desktop */}
          <div className="hidden md:block">
            <ConnectButton />
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-colors"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 glass rounded-2xl p-5 space-y-1 animate-fade-in">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-slate-300 hover:text-white py-2.5 px-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <ConnectButton />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
