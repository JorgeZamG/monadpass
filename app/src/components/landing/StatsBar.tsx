export interface Stat { value: string; label: string; suffix?: string }

export interface StatsBarProps { stats?: Stat[] }

const defaultStats: Stat[] = [
  { value: '10,000', suffix: '+', label: 'Boletos emitidos'   },
  { value: '500',    suffix: '+', label: 'Eventos realizados' },
  { value: '50',     suffix: '+', label: 'Organizadores'      },
  { value: '$0',     suffix: '',  label: 'Fraude en reventa'  },
]

export default function StatsBar({ stats = defaultStats }: StatsBarProps) {
  return (
    <section className="relative py-0 overflow-hidden">
      {/* Gradient band */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/40 via-brand-800/20 to-brand-900/40" />
      <div className="absolute inset-0 border-y border-brand-800/30" />

      <div className="container-lg relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-brand-800/30">
          {stats.map(({ value, suffix, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center py-10 px-4 gap-1"
            >
              <span className="text-3xl sm:text-4xl font-display font-extrabold text-gradient">
                {value}<span className="text-brand-400">{suffix}</span>
              </span>
              <span className="text-sm text-slate-500 font-medium text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
