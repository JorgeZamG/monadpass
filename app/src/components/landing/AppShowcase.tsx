import { CheckCircle } from 'lucide-react'

export interface ShowcasePoint { text: string }

export interface AppShowcaseProps {
  eyebrow?:    string
  headline?:   string
  description?: string
  points?:     string[]
  ctaLabel?:   string
  ctaHref?:    string
  flipped?:    boolean
}

const defaultPoints = [
  'Dashboard de ventas en tiempo real',
  'Gestión de múltiples eventos desde una sola vista',
  'Control de acceso y check-in desde el móvil',
  'Reportes de asistencia exportables on-chain',
  'Configuración de royalties y reglas de reventa',
]

export default function AppShowcase({
  eyebrow     = 'Para organizadores',
  headline    = 'Tu evento bajo control, todo desde la app',
  description = 'El dashboard de MonadPass te da visibilidad completa sobre ventas, check-ins y asistencia en tiempo real, sin depender de servidores centralizados.',
  points      = defaultPoints,
  ctaLabel    = 'Ver demo del dashboard',
  ctaHref     = '#',
  flipped     = false,
}: AppShowcaseProps) {
  return (
    <section className="section relative overflow-hidden">
      <div className="orb orb-indigo w-[450px] h-[450px] -left-32 top-0 opacity-20" />

      <div className="container-lg relative z-10">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${flipped ? 'lg:flex-row-reverse' : ''}`}>
          {/* Phone mockup side */}
          <div className={`flex justify-center ${flipped ? 'lg:order-2' : ''}`}>
            <PhoneMockup />
          </div>

          {/* Copy side */}
          <div className={`space-y-6 ${flipped ? 'lg:order-1' : ''}`}>
            <p className="badge w-fit">{eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold leading-tight">
              {headline.split('app')[0]}
              <span className="text-gradient">app</span>
              {headline.split('app')[1]}
            </h2>
            <p className="text-slate-400 leading-relaxed">{description}</p>

            <ul className="space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-brand-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">{point}</span>
                </li>
              ))}
            </ul>

            <a href={ctaHref} className="btn-primary inline-flex w-fit mt-2">
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Phone mockup with dashboard UI ── */
function PhoneMockup() {
  const bars = [75, 60, 85, 45, 90, 70, 55, 80]

  return (
    <div className="relative w-[280px] sm:w-[300px] mx-auto animate-float">
      {/* Glow */}
      <div className="absolute inset-0 bg-brand-600/20 rounded-[3rem] blur-3xl scale-90 translate-y-6" />

      {/* Phone frame */}
      <div
        className="relative rounded-[2.5rem] overflow-hidden"
        style={{
          background: '#0d0d1f',
          border: '2px solid rgba(139,92,246,0.35)',
          boxShadow: '0 30px 70px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
          width: '100%',
          aspectRatio: '9/19',
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-10" />

        {/* Screen content */}
        <div className="absolute inset-0 p-4 pt-10 flex flex-col gap-3 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mt-1">
            <div>
              <p className="text-[9px] text-slate-500">Dashboard</p>
              <p className="text-xs font-display font-bold text-white">ETH México 2025</p>
            </div>
            <div
              className="px-2 py-1 rounded-lg text-[9px] font-bold text-emerald-400"
              style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.2)' }}
            >
              EN VIVO
            </div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Vendidos', value: '842' },
              { label: 'Check-ins', value: '631' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl p-3"
                style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.18)' }}
              >
                <p className="text-[9px] text-slate-500 mb-0.5">{label}</p>
                <p className="text-lg font-display font-bold text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Mini bar chart */}
          <div
            className="rounded-xl p-3 flex-1"
            style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.15)' }}
          >
            <p className="text-[9px] text-slate-500 mb-2">Ventas por hora</p>
            <div className="flex items-end gap-1 h-12">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: i === bars.length - 1
                      ? 'linear-gradient(to top, #8b5cf6, #a78bfa)'
                      : 'rgba(139,92,246,0.3)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Recent transactions */}
          <div className="space-y-1.5">
            {[
              { addr: '0xA1b2…c3d4', time: 'hace 1 min', amount: '0.5 MON' },
              { addr: '0xF9e8…7a6b', time: 'hace 3 min', amount: '0.5 MON' },
              { addr: '0x23C4…890F', time: 'hace 5 min', amount: '0.5 MON' },
            ].map(({ addr, time, amount }) => (
              <div
                key={addr}
                className="flex items-center justify-between rounded-lg px-2.5 py-2"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div>
                  <p className="text-[9px] font-mono text-brand-300">{addr}</p>
                  <p className="text-[8px] text-slate-600">{time}</p>
                </div>
                <p className="text-[9px] font-bold text-white">{amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Home bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-white/20" />
      </div>
    </div>
  )
}
