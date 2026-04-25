import {
  ShieldCheck,
  QrCode,
  Gem,
  RefreshCcw,
  BarChart3,
  Wallet,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Feature {
  icon:        LucideIcon
  title:       string
  description: string
  accent?:     string
}

export interface FeaturesProps {
  eyebrow?:  string
  headline?: string
  features?: Feature[]
}

const defaultFeatures: Feature[] = [
  {
    icon:        ShieldCheck,
    title:       'Anti-falsificación',
    description: 'Cada boleto vive on-chain como ERC-721. No hay capturas de pantalla ni PDFs que clonar.',
    accent:      'from-emerald-500/20 to-teal-500/10',
  },
  {
    icon:        QrCode,
    title:       'Check-in con QR',
    description: 'Escanea el código QR del NFT en la puerta. La validación es instantánea y sin servidor.',
    accent:      'from-brand-500/20 to-violet-500/10',
  },
  {
    icon:        Gem,
    title:       'Badge conmemorativo',
    description: 'Al entrar al evento, el boleto se quema y se mintea un NFT badge como recuerdo eterno.',
    accent:      'from-pink-500/20 to-rose-500/10',
  },
  {
    icon:        RefreshCcw,
    title:       'Reventa controlada',
    description: 'El creador define reglas de reventa: precio máximo, royalties y lista blanca de wallets.',
    accent:      'from-blue-500/20 to-cyan-500/10',
  },
  {
    icon:        BarChart3,
    title:       'Analytics en tiempo real',
    description: 'Dashboard on-chain: ventas, check-ins, wallets únicas y métricas de reventa al instante.',
    accent:      'from-amber-500/20 to-yellow-500/10',
  },
  {
    icon:        Wallet,
    title:       'Sin fricción para el fan',
    description: 'Compra con wallet o tarjeta. Recibe tu boleto como NFT directo en tu billetera digital.',
    accent:      'from-purple-500/20 to-fuchsia-500/10',
  },
]

export default function Features({
  eyebrow  = 'Por qué MonadPass',
  headline = 'Todo lo que necesitas para un evento impecable',
  features = defaultFeatures,
}: FeaturesProps) {
  return (
    <section id="features" className="section">
      <div className="container-lg">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
          <p className="badge mx-auto w-fit">{eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold">
            Todo lo que necesitas para un{' '}
            <span className="text-gradient">evento impecable</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Infraestructura blockchain que protege a organizadores y fans desde el primer clic hasta la salida.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, description, accent }) => (
            <div
              key={title}
              className="glass-card rounded-2xl p-6 group cursor-default space-y-4"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accent ?? 'from-brand-500/20 to-violet-500/10'} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
              >
                <Icon size={22} className="text-brand-300" strokeWidth={1.8} />
              </div>
              <h3 className="text-base font-display font-bold text-white">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
