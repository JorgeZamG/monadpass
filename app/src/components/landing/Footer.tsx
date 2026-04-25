import Link from 'next/link'
import { Ticket, GitBranch, X as XIcon } from 'lucide-react'

export interface FooterLink  { label: string; href: string }
export interface FooterGroup { title: string; links: FooterLink[] }

export interface FooterProps {
  logo?:       string
  tagline?:    string
  groups?:     FooterGroup[]
  socialLinks?: { icon: 'gitbranch' | 'x'; href: string; label: string }[]
  legal?:      string
}

const defaultGroups: FooterGroup[] = [
  {
    title: 'Producto',
    links: [
      { label: 'Funciones',      href: '#features'     },
      { label: 'Precios',        href: '#pricing'       },
      { label: 'Cómo funciona',  href: '#how-it-works'  },
      { label: 'Changelog',      href: '#'             },
    ],
  },
  {
    title: 'Organizadores',
    links: [
      { label: 'Crear evento',   href: '/organizer/new' },
      { label: 'Panel de control', href: '#'           },
      { label: 'Analytics',      href: '#'             },
      { label: 'Guía rápida',    href: '#'             },
    ],
  },
  {
    title: 'Desarrolladores',
    links: [
      { label: 'Documentación',  href: '#'             },
      { label: 'API Reference',  href: '#'             },
      { label: 'GitHub',         href: 'https://github.com/jorgezamg/monadpass' },
      { label: 'Contratos',      href: '#'             },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacidad',     href: '#'             },
      { label: 'Términos',       href: '#'             },
      { label: 'Cookies',        href: '#'             },
    ],
  },
]

const SocialIcons = {
  gitbranch: GitBranch,
  x:         XIcon,
}

export default function Footer({
  logo     = 'MonadPass',
  tagline  = 'NFT ticketing para el mundo real, en Monad.',
  groups   = defaultGroups,
  socialLinks = [
    { icon: 'gitbranch', href: 'https://github.com/jorgezamg/monadpass', label: 'GitHub' },
    { icon: 'x',         href: '#',                                        label: 'X'      },
  ],
  legal    = `© ${new Date().getFullYear()} MonadPass. Construido en Monad Blockchain.`,
}: FooterProps) {
  return (
    <footer className="relative border-t border-brand-900/40 pt-16 pb-10 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-secondary to-surface pointer-events-none" />

      <div className="container-lg relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5" aria-label="MonadPass">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center">
                <Ticket size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-lg text-white">{logo}</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[220px]">{tagline}</p>

            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon, href, label }) => {
                const Icon = SocialIcons[icon]
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-500 hover:text-white hover:border-brand-500/50 transition-colors cursor-pointer"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Link groups */}
          {groups.map(({ title, links }) => (
            <div key={title} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-slate-500 hover:text-white transition-colors cursor-pointer"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-900/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">{legal}</p>
          <p className="text-xs text-slate-700">
            Hecho con{' '}
            <span className="text-brand-500">♥</span>
            {' '}para la comunidad web3
          </p>
        </div>
      </div>
    </footer>
  )
}
