import { Check, X, Zap } from 'lucide-react'
import Link from 'next/link'

export interface PricingFeature { text: string; included: boolean }

export interface Plan {
  name:        string
  price:       string
  period?:     string
  description: string
  features:    PricingFeature[]
  ctaLabel:    string
  ctaHref:     string
  highlighted?: boolean
  badge?:       string
}

export interface PricingProps {
  eyebrow?:  string
  headline?: string
  plans?:    Plan[]
}

const defaultPlans: Plan[] = [
  {
    name:        'Gratuito',
    price:       '$0',
    period:      'siempre',
    description: 'Para probar y eventos pequeños.',
    ctaLabel:    'Empezar gratis',
    ctaHref:     '/organizer/new',
    features: [
      { text: 'Hasta 100 boletos por evento',      included: true  },
      { text: '1 evento activo',                    included: true  },
      { text: 'Check-in con QR',                    included: true  },
      { text: 'Badge conmemorativo para asistentes',included: true  },
      { text: 'Analytics en tiempo real',           included: false },
      { text: 'Reglas de reventa personalizadas',   included: false },
      { text: 'Soporte prioritario',                included: false },
    ],
  },
  {
    name:        'Pro',
    price:       '$49',
    period:      '/mes',
    description: 'Para organizadores con eventos recurrentes.',
    ctaLabel:    'Empezar prueba de 14 días',
    ctaHref:     '#',
    highlighted: true,
    badge:       'Más popular',
    features: [
      { text: 'Boletos ilimitados',                included: true  },
      { text: 'Eventos ilimitados',                included: true  },
      { text: 'Check-in con QR',                   included: true  },
      { text: 'Badge conmemorativo para asistentes',included: true  },
      { text: 'Analytics en tiempo real',          included: true  },
      { text: 'Reglas de reventa personalizadas',  included: true  },
      { text: 'Soporte prioritario',               included: false },
    ],
  },
  {
    name:        'Enterprise',
    price:       'Custom',
    period:      '',
    description: 'Para venues y productoras a gran escala.',
    ctaLabel:    'Hablar con ventas',
    ctaHref:     '#',
    features: [
      { text: 'Boletos ilimitados',                included: true  },
      { text: 'Eventos ilimitados',                included: true  },
      { text: 'Check-in con QR',                   included: true  },
      { text: 'Badge conmemorativo para asistentes',included: true  },
      { text: 'Analytics en tiempo real',          included: true  },
      { text: 'Reglas de reventa personalizadas',  included: true  },
      { text: 'Soporte prioritario 24/7',          included: true  },
    ],
  },
]

export default function Pricing({
  eyebrow  = 'Precios',
  headline = 'Planes para cada tipo de organizador',
  plans    = defaultPlans,
}: PricingProps) {
  return (
    <section id="pricing" className="section relative overflow-hidden">
      <div className="orb orb-purple w-[500px] h-[500px] left-1/2 -translate-x-1/2 top-0 opacity-15" />

      <div className="container-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-14 space-y-4 max-w-xl mx-auto">
          <p className="badge mx-auto w-fit">{eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold">
            Planes para cada{' '}
            <span className="text-gradient">tipo de organizador</span>
          </h2>
          <p className="text-slate-400">
            Sin tarifas ocultas. Cancela cuando quieras. La blockchain es tuya.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 flex flex-col gap-6 ${
                plan.highlighted
                  ? 'border border-brand-500/60 bg-gradient-to-b from-brand-900/60 to-surface-card shadow-2xl shadow-brand-900/40'
                  : 'glass-card'
              }`}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-brand-700/40">
                    <Zap size={11} fill="currentColor" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name & price */}
              <div>
                <p className="text-sm font-semibold text-brand-300 mb-2">{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-display font-extrabold text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-slate-500 text-sm mb-1.5">{plan.period}</span>
                  )}
                </div>
                <p className="text-slate-500 text-sm mt-2">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {plan.features.map(({ text, included }) => (
                  <li key={text} className="flex items-start gap-2.5">
                    {included ? (
                      <Check size={16} className="text-brand-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X size={16} className="text-slate-700 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${included ? 'text-slate-300' : 'text-slate-600'}`}>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.ctaHref}
                className={plan.highlighted ? 'btn-primary text-center justify-center' : 'btn-outline text-center justify-center'}
              >
                {plan.ctaLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
