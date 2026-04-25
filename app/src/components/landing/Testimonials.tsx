import { Star } from 'lucide-react'

export interface Testimonial {
  name:    string
  role:    string
  company: string
  quote:   string
  stars?:  number
  initials: string
  accent:  string
}

export interface TestimonialsProps {
  eyebrow?:      string
  headline?:     string
  testimonials?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  {
    name:     'Daniela Torres',
    role:     'Productora de eventos',
    company:  'VibeXP',
    quote:    'Nunca pensé que el check-in de 800 personas podría ser tan fluido. Cero falsificaciones, cero papel, cero dolores de cabeza. MonadPass fue un game-changer para nuestro festival.',
    stars:    5,
    initials: 'DT',
    accent:   'from-violet-500 to-purple-700',
  },
  {
    name:     'Carlos Mendoza',
    role:     'Organizador independiente',
    company:  'DevCon MX',
    quote:    'La parte de royalties en reventa nos generó ingresos extra que nunca habíamos tenido con boleteras tradicionales. El contrato se despliega en literalmente 30 segundos.',
    stars:    5,
    initials: 'CM',
    accent:   'from-blue-500 to-indigo-700',
  },
  {
    name:     'Sofía Ramírez',
    role:     'Fan & coleccionista',
    company:  'Asistente frecuente',
    quote:    'Tengo 12 badges de eventos a los que fui. Son mis NFTs más valorados porque tienen significado real — estuve ahí. Ninguna plataforma tradicional puede darte eso.',
    stars:    5,
    initials: 'SR',
    accent:   'from-pink-500 to-rose-700',
  },
]

export default function Testimonials({
  eyebrow      = 'Lo que dicen',
  headline     = 'Organizadores y fans que ya confían en MonadPass',
  testimonials = defaultTestimonials,
}: TestimonialsProps) {
  return (
    <section className="section relative overflow-hidden">
      <div className="orb orb-violet w-[400px] h-[400px] right-0 bottom-0 opacity-15" />

      <div className="container-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-14 space-y-4 max-w-xl mx-auto">
          <p className="badge mx-auto w-fit">{eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold">
            Organizadores y fans que ya{' '}
            <span className="text-gradient">confían en MonadPass</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, company, quote, stars = 5, initials, accent }) => (
            <div key={name} className="glass-card rounded-2xl p-6 flex flex-col gap-5">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400" fill="currentColor" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-slate-300 text-sm leading-relaxed flex-1">
                &ldquo;{quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-1 border-t border-brand-800/40">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${accent} flex items-center justify-center text-white text-sm font-bold font-display flex-shrink-0`}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{name}</p>
                  <p className="text-xs text-slate-500">{role} · {company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
