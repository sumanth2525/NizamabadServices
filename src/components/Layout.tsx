import { Link, useLocation } from 'react-router-dom'
import { Home, MessageCircle, FileText, Menu } from 'lucide-react'
import { useI18n } from '../i18n'
import AreaSelector from './AreaSelector'
import type { ReactNode } from 'react'

const navItems = [
  { path: '/', icon: Home, labelEn: 'Home', labelTe: 'హోమ్' },
  { path: '/support', icon: MessageCircle, labelEn: 'Support', labelTe: 'సపోర్ట్' },
  { path: '/requests', icon: FileText, labelEn: 'My Requests', labelTe: 'నా అభ్యర్థనలు' },
  { path: '/menu', icon: Menu, labelEn: 'Menu', labelTe: 'మెను' },
]

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { lang, setLang, t } = useI18n()

  return (
    <div className="app-shell flex flex-col bg-gradient-to-b from-slate-50/80 to-slate-100/80">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-2 px-4 py-3 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 shadow-sm">
        <h1 className="text-lg font-bold text-slate-800 truncate tracking-tight min-w-0">
          Nizamabad Services
        </h1>
        <div className="flex items-center gap-2 shrink-0">
          <AreaSelector variant="header" />
          <div className="flex items-center rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`min-h-[36px] min-w-[44px] px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${lang === 'en' ? 'bg-white text-[var(--color-brand)] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang('te')}
            className={`min-h-[36px] min-w-[44px] px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${lang === 'te' ? 'bg-white text-[var(--color-brand)] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            TE
          </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto pb-24 min-h-0">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around gap-1 py-2 px-2 bg-white/95 backdrop-blur-sm border-t border-slate-200/80 shadow-[0_-2px_10px_rgba(0,0,0,0.04)] safe-area-inset">
        {navItems.map(({ path, icon: Icon, labelEn, labelTe }) => {
          const active = location.pathname === path || (path === '/' && location.pathname === '/')
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-4 min-h-[56px] min-w-[64px] rounded-xl transition-all duration-200 ${
                active
                  ? 'text-[var(--color-brand)] bg-[var(--color-brand-muted)]'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/80'
              }`}
            >
              <Icon size={24} strokeWidth={active ? 2.5 : 2} />
              <span className="text-xs font-medium">{t(labelEn, labelTe)}</span>
            </Link>
          )
        })}
      </nav>

      <a
        href={`https://wa.me/${(import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210').replace(/\D/g, '')}?text=${encodeURIComponent(import.meta.env.VITE_WHATSAPP_MESSAGE || 'Hi, I need help with a service request from Nizamabad Services app.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg shadow-green-500/30 hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  )
}
