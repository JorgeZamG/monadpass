import Link from 'next/link'
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react'

export interface HeroProps {
  eyebrow?:    string
  headline?:   string
  subheadline?: string
  ctaPrimary?:  { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  trustedLabel?: string
}

export default function Hero({
  eyebrow      = 'Powered by Monad Blockchain',
  headline     = 'Boletos que no se pueden falsificar, perder ni revender sin permiso.',
  subheadline  = 'Compra, vende y gestiona boletos NFT on-chain. Cada boleto es un ERC-721 — verificable, transferible y convertido en coleccionable al asistir.',
  ctaPrimary   = { label: 'Crear mi evento',    href: '/organizer/new' },
  ctaSecondary = { label: 'Ver demostración', href: '#how-it-works'  },
  trustedLabel = 'Confiado por más de 50 organizadores • +10,000 boletos emitidos',
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      {/* ── Background orbs ── */}
      <div className="orb orb-purple w-[600px] h-[600px] -top-32 -left-40 opacity-40" />
      <div className="orb orb-violet w-[500px] h-[500px] top-1/2 -right-40 opacity-30" />
      <div className="orb orb-indigo w-[300px] h-[300px] bottom-0 left-1/3 opacity-25" />

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(139,92,246,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container-lg relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* ── Left: Copy ── */}
          <div className="space-y-7 animate-fade-up">
            {/* Eyebrow badge */}
            <div className="badge">
              <Zap size={12} className="text-brand-400" fill="currentColor" />
              {eyebrow}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-[1.1] tracking-tight">
              Boletos que{' '}
              <span className="text-gradient">no se pueden</span>
              <br />falsificar, perder
              <br />ni revender.
            </h1>

            {/* Subheadline */}
            <p className="text-slate-400 text-lg leading-relaxed max-w-[520px]">
              {subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href={ctaPrimary.href} className="btn-primary">
                {ctaPrimary.label}
                <ArrowRight size={17} />
              </Link>
              <Link href={ctaSecondary.href} className="btn-outline">
                {ctaSecondary.label}
              </Link>
            </div>

            {/* Trust signal */}
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <ShieldCheck size={15} className="text-brand-400" />
              {trustedLabel}
            </p>
          </div>

          {/* ── Right: NFT Ticket visual ── */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px]">
              {/* Floating ticket card */}
              <div className="animate-float">
                <TicketCard />
              </div>

              {/* Badge pill — floats below */}
              <div
                className="absolute -bottom-6 -left-4 glass rounded-2xl p-3.5 flex items-center gap-3 animate-float-slow"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <ShieldCheck size={18} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Check-in verificado</p>
                  <p className="text-[11px] text-slate-500">Hace 2 minutos</p>
                </div>
              </div>

              {/* NFT badge pill — floats above-right */}
              <div
                className="absolute -top-4 -right-2 glass rounded-2xl p-3.5 flex items-center gap-3 animate-float-slow"
                style={{ animationDelay: '0.8s' }}
              >
                <div className="w-9 h-9 rounded-xl bg-brand-500/20 flex items-center justify-center">
                  <StarIcon />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Badge minteado</p>
                  <p className="text-[11px] text-slate-500">Token #4291</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── NFT Ticket Card SVG ─── */
function TicketCard() {
  return (
    <div className="relative w-full max-w-[380px] mx-auto">
      {/* Glow behind card */}
      <div className="absolute inset-0 bg-brand-600/30 rounded-3xl blur-3xl scale-90 translate-y-4" />

      {/* Card */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e1040 0%, #2d1b69 50%, #1a0f3a 100%)',
          border: '1px solid rgba(167,139,250,0.3)',
          boxShadow: '0 25px 60px rgba(124,58,237,0.4)',
        }}
      >
        {/* Holographic shimmer overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, rgba(167,139,250,0.3) 50%, transparent 60%)',
          }}
        />

        <div className="p-7">
          {/* Top row */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[11px] font-mono text-brand-300 mb-1 uppercase tracking-widest">MonadPass</p>
              <p className="text-xl font-display font-bold text-white">ETH México 2025</p>
            </div>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(139,92,246,0.25)', border: '1px solid rgba(167,139,250,0.3)' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 10V6C22 5.45 21.55 5 21 5H3C2.45 5 2 5.45 2 6V10C3.1 10 4 10.9 4 12S3.1 14 2 14V18C2 18.55 2.45 19 3 19H21C21.55 19 22 18.55 22 18V14C20.9 14 20 13.1 20 12S20.9 10 22 10Z"
                  fill="#A78BFA"
                />
              </svg>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Fecha',   value: '14 Jun 2025' },
              { label: 'Asiento', value: 'A-12'        },
              { label: 'Token',   value: '#4291'       },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Divider dashed */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-5 h-5 rounded-full bg-surface" />
            <div className="flex-1 border-t border-dashed border-brand-800/60" />
            <div className="w-5 h-5 rounded-full bg-surface" />
          </div>

          {/* QR + info */}
          <div className="flex items-center gap-5">
            <QRCode />
            <div className="space-y-1.5">
              <p className="text-[11px] text-slate-500">Portador</p>
              <p className="text-sm font-bold text-white">0x4a2f…c891</p>
              <p className="text-[10px] font-mono text-brand-400 truncate max-w-[120px]">
                ERC-721 · Monad Testnet
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Válido
              </span>
            </div>
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div className="h-2 w-full bg-gradient-to-r from-brand-600 via-violet-500 to-brand-400" />
      </div>
    </div>
  )
}

function QRCode() {
  const cells = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,0,1,1,0,1,0,1,1,0,1],
    [0,1,0,1,0,0,0,1,1,0,1,0,1,0,1,0,0,1,0],
    [1,0,1,0,1,1,1,0,0,1,0,1,0,1,1,0,1,0,1],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,1,0,1,0],
    [1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,0,1,1,1],
    [1,0,0,0,0,0,1,0,1,1,0,0,0,1,0,0,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,0,0,1,0,1,1],
    [1,0,1,1,1,0,1,1,0,0,1,1,0,0,1,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,0,1,0,0,1,0,0],
    [1,0,0,0,0,0,1,0,0,1,1,0,0,0,1,1,0,1,0],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,1,1,0,1],
  ]

  return (
    <div
      className="p-1.5 rounded-xl flex-shrink-0"
      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(167,139,250,0.2)' }}
    >
      <svg width="64" height="64" viewBox="0 0 19 19">
        {cells.map((row, r) =>
          row.map((cell, c) =>
            cell ? (
              <rect
                key={`${r}-${c}`}
                x={c}
                y={r}
                width={1}
                height={1}
                fill="#A78BFA"
              />
            ) : null
          )
        )}
      </svg>
    </div>
  )
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill="#A78BFA"
        stroke="#A78BFA"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
