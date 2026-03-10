import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Headphones, Plus, Clock, Menu } from 'lucide-react'
import { useI18n } from '../i18n'
import AreaSelector from './AreaSelector'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { lang, setLang } = useI18n()
  const isHome = location.pathname === '/'

  const showBackButton = !isHome && !['/'].includes(location.pathname)

  return (
    <div className="app-shell flex flex-col bg-white">
      {/* Desktop: top bar */}
      <header className="hidden md:flex sticky top-0 z-20 items-center justify-between gap-6 px-6 py-3 bg-white border-b border-slate-200/80">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-lg font-bold text-slate-800 tracking-tight">Nizamabad Services</span>
        </Link>
        <div className="flex items-center gap-3 shrink-0">
          <AreaSelector variant="header" />
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
            className="min-h-[36px] px-4 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200"
          >
            {lang === 'en' ? 'Telugu' : 'English'}
          </button>
        </div>
      </header>

      {/* Mobile: header with back button on inner pages */}
      <header className="md:hidden sticky top-0 z-20 flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200/80">
        {showBackButton && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="flex-1 text-center text-lg font-bold text-slate-900 truncate pr-8">
          {location.pathname === '/support' && 'Support'}
          {location.pathname === '/requests' && 'My Requests'}
          {location.pathname === '/menu' && 'Menu'}
          {(location.pathname === '/login' || location.pathname === '/signup') && 'Nizamabad Services'}
          {location.pathname === '/' && ''}
          {!['/', '/support', '/requests', '/menu', '/login', '/signup'].includes(location.pathname) && location.pathname.startsWith('/service') && 'Service'}
          {!['/', '/support', '/requests', '/menu', '/login', '/signup'].includes(location.pathname) && !location.pathname.startsWith('/service') && 'Nizamabad Services'}
        </h1>
      </header>

      <main className="flex-1 overflow-auto pb-20 md:pb-8 min-h-0">{children}</main>

      {/* Mobile: bottom nav - 5 items with Request as central FAB */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around py-2 px-1 bg-white border-t border-slate-200/80 shadow-[0_-2px_10px_rgba(0,0,0,0.04)] safe-area-inset">
        <Link
          to="/"
          className={`flex flex-col items-center gap-0.5 py-2 px-3 min-w-[56px] rounded-xl transition-colors ${
            location.pathname === '/' ? 'text-[var(--color-brand)]' : 'text-slate-500'
          }`}
        >
          <Home size={24} strokeWidth={location.pathname === '/' ? 2.5 : 2} />
          <span className="text-[10px] font-medium uppercase">Home</span>
        </Link>
        <Link
          to="/support"
          className={`flex flex-col items-center gap-0.5 py-2 px-3 min-w-[56px] rounded-xl transition-colors ${
            location.pathname === '/support' ? 'text-[var(--color-brand)]' : 'text-slate-500'
          }`}
        >
          <Headphones size={24} strokeWidth={location.pathname === '/support' ? 2.5 : 2} />
          <span className="text-[10px] font-medium uppercase">Support</span>
        </Link>
        <Link
          to="/"
          className="flex flex-col items-center gap-0.5 -mt-6"
        >
          <div className="h-14 w-14 rounded-full bg-[var(--color-brand)] text-white flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Plus size={28} strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-medium text-slate-500 uppercase">Request</span>
        </Link>
        <Link
          to="/requests"
          className={`flex flex-col items-center gap-0.5 py-2 px-3 min-w-[56px] rounded-xl transition-colors ${
            location.pathname === '/requests' ? 'text-[var(--color-brand)]' : 'text-slate-500'
          }`}
        >
          <Clock size={24} strokeWidth={location.pathname === '/requests' ? 2.5 : 2} />
          <span className="text-[10px] font-medium uppercase">Bookings</span>
        </Link>
        <Link
          to="/menu"
          className={`flex flex-col items-center gap-0.5 py-2 px-3 min-w-[56px] rounded-xl transition-colors ${
            location.pathname === '/menu' ? 'text-[var(--color-brand)]' : 'text-slate-500'
          }`}
        >
          <Menu size={24} strokeWidth={location.pathname === '/menu' ? 2.5 : 2} />
          <span className="text-[10px] font-medium uppercase">Menu</span>
        </Link>
      </nav>
    </div>
  )
}
