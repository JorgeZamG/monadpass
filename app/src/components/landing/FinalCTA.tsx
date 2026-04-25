import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export interface FinalCTAProps {
  headline?:    string
  description?: string
  ctaPrimary?:  { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
}

export default function FinalCTA({
  headline     = '¿Listo para vender boletos sin miedo?',
  description  = 'Crea tu primer evento en menos de 2 minutos. Sin tarjeta de crédito, sin permisos, sin intermediarios.',
  ctaPrimary   = { label: 'Crear mi evento ahora', href: '/organizer/new' },
  ctaSecondary = { label: 'Ver documentación',     href: '#'             },
}: FinalCTAProps) {
  return (
    <section className="section relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900/60 via-surface-secondary to-surface" />
      <div className="orb orb-purple w-[600px] h-[600px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-30" />

      {/* Border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-600/50 to-transparent" />

      <div className="container-lg relative z-10">
        <div
          className="rounded-3xl p-10 sm:p-16 text-center space-y-7 relative overflow-hidden"
          style={{
            background: 'rgba(139,92,246,0.06)',
            border: '1px solid rgba(139,92,246,0.2)',
          }}
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-700/10 to-transparent rounded-3xl pointer-events-none" />

          <div className="relative z-10 space-y-7">
            <div className="flex justify-center">
              <span className="badge">
                <Sparkles size={12} className="text-brand-400" />
                Gratis para empezar
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold max-w-2xl mx-auto leading-tight">
              {headline.split('boletos')[0]}
              <span className="text-gradient">boletos sin miedo</span>
              {headline.split('boletos sin miedo')[1]}
            </h2>

            <p className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={ctaPrimary.href} className="btn-primary text-base px-8 py-3.5">
                {ctaPrimary.label}
                <ArrowRight size={18} />
              </Link>
              <Link href={ctaSecondary.href} className="btn-outline text-base px-8 py-3.5">
                {ctaSecondary.label}
              </Link>
            </div>

            <p className="text-slate-600 text-sm">
              Sin tarjeta de crédito · Sin contratos · Cancela cuando quieras
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
