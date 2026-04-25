'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, ChevronDown, Copy, ExternalLink, LogOut, Wallet } from 'lucide-react'
import { useWallet } from './WalletContext'
import { getActiveChain } from '@/lib/chains'

/* Generates a deterministic hue from the first bytes of an address */
function addrHue(addr: string) {
  return parseInt(addr.slice(2, 6), 16) % 360
}

function Avatar({ address }: { address: string }) {
  const hue = addrHue(address)
  return (
    <span
      aria-hidden
      className="w-7 h-7 rounded-full flex-shrink-0 inline-block"
      style={{ background: `linear-gradient(135deg, hsl(${hue},70%,55%), hsl(${(hue + 60) % 360},70%,45%))` }}
    />
  )
}

function truncate(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

export default function ConnectButton() {
  const { address, balance, isConnecting, isConnected, isWrongChain, connect, disconnect, switchChain } = useWallet()
  const [open,   setOpen]   = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const chain = getActiveChain()

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const copyAddress = async () => {
    if (!address) return
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  /* ── Not connected ── */
  if (!isConnected) {
    return (
      <button
        onClick={connect}
        disabled={isConnecting}
        className="btn-primary text-sm py-2.5 px-5 cursor-pointer disabled:opacity-60"
        aria-label="Conectar wallet"
      >
        <Wallet size={15} />
        {isConnecting ? 'Conectando…' : 'Conectar wallet'}
      </button>
    )
  }

  /* ── Wrong chain ── */
  if (isWrongChain) {
    return (
      <button
        onClick={switchChain}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
          bg-amber-500/15 border border-amber-500/30 text-amber-300
          hover:bg-amber-500/25 transition-colors cursor-pointer"
        aria-label="Cambiar red"
      >
        <AlertTriangle size={14} />
        Cambiar a {chain.shortName}
      </button>
    )
  }

  /* ── Connected ── */
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 glass-card px-3 py-2 rounded-xl cursor-pointer
          hover:border-brand-500/50 transition-colors"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Avatar address={address!} />
        <div className="hidden sm:flex flex-col items-start leading-none">
          <span className="text-xs font-mono font-semibold text-white">{truncate(address!)}</span>
          {balance && (
            <span className="text-[10px] text-slate-500 mt-0.5">
              {balance} {chain.nativeCurrency.symbol}
            </span>
          )}
        </div>
        <ChevronDown
          size={13}
          className={`text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-56 rounded-2xl py-2 z-50
            glass-strong shadow-2xl shadow-black/40 animate-fade-in"
        >
          {/* Address block */}
          <div className="px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <Avatar address={address!} />
              <span className="text-xs font-mono text-white">{truncate(address!)}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
                aria-hidden
              />
              <span className="text-[10px] text-slate-500">{chain.name}</span>
            </div>
          </div>

          {/* Copy */}
          <button
            role="menuitem"
            onClick={copyAddress}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm
              text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Copy size={13} />
            {copied ? '¡Copiado!' : 'Copiar dirección'}
          </button>

          {/* Explorer */}
          {chain.explorer && (
            <a
              role="menuitem"
              href={`${chain.explorer}/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm
                text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <ExternalLink size={13} />
              Ver en explorer
            </a>
          )}

          {/* Disconnect */}
          <div className="border-t border-white/5 mt-1 pt-1">
            <button
              role="menuitem"
              onClick={() => { disconnect(); setOpen(false) }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm
                text-red-400 hover:text-red-300 hover:bg-red-500/8 transition-colors cursor-pointer"
            >
              <LogOut size={13} />
              Desconectar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
