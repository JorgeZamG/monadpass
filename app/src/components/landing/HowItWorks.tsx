import { PlusCircle, CreditCard, ScanLine, Flame, Star } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Step {
  number:      number
  icon:        LucideIcon
  title:       string
  description: string
  tag?:        string
}

export interface HowItWorksProps {
  eyebrow?:  string
  headline?: string
  steps?:    Step[]
}

const defaultSteps: Step[] = [
  {
    number:      1,
    icon:        PlusCircle,
    title:       'Crea tu evento',
    description: 'Define nombre, fecha, supply de boletos y precio en USDC o MON. Se despliega un contrato ERC-721 en segundos.',
    tag:         'Organizador',
  },
  {
    number:      2,
    icon:        CreditCard,
    title:       'Fans compran on-chain',
    description: 'El usuario conecta su wallet o usa tarjeta. El boleto NFT se mintea directamente en su billetera.',
    tag:         'Fan',
  },
  {
    number:      3,
    icon:        ScanLine,
    title:       'Check-in con QR',
    description: 'En la puerta, el organizador escanea el QR del NFT. La firma on-chain confirma autenticidad al instante.',
    tag:         'Acceso',
  },
  {
    number:      4,
    icon:        Flame,
    title:       'Ticket se quema',
    description: 'El boleto usado se incinera en la blockchain. Imposible reutilizarlo o transferirlo después del check-in.',
    tag:         'Seguridad',
  },
  {
    number:      5,
    icon:        Star,
    title:       'Badge conmemorativo',
    description: 'Se mintea un NFT coleccionable como prueba de asistencia. El fan se lleva un recuerdo digital eterno.',
    tag:         'Coleccionable',
  },
]

export default function HowItWorks({
  eyebrow  = 'Flujo completo',
  headline = 'De la venta al badge en 5 pasos',
  steps    = defaultSteps,
}: HowItWorksProps) {
  return (
    <section id="how-it-works" className="section relative overflow-hidden">
      {/* Background orb */}
      <div className="orb orb-purple w-[500px] h-[500px] right-0 top-1/4 opacity-20" />

      <div className="container-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 max-w-xl mx-auto">
          <p className="badge mx-auto w-fit">{eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold">
            <span className="text-gradient">5 pasos</span> del ticket al badge
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Un flujo pensado para organizadores y fans. Sin papeles, sin apps propietarias.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line desktop */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brand-700/50 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map(({ number, icon: Icon, title, description, tag }) => (
              <div key={number} className="relative flex flex-col items-center text-center group">
                {/* Step number bubble */}
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center border border-brand-600/40 group-hover:border-brand-400/60 transition-colors duration-200">
                    <Icon size={24} className="text-brand-400" strokeWidth={1.8} />
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center font-display">
                    {number}
                  </span>
                </div>

                {/* Tag */}
                {tag && (
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-400 mb-2">
                    {tag}
                  </span>
                )}

                <h3 className="text-sm font-display font-bold text-white mb-2">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[180px]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
