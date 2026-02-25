import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, ChevronRight, X } from 'lucide-react'
import { useI18n } from '../i18n'
import { SERVICES } from '../data/services'
import { APP_NAME, TAGLINE, DEMO_PROVIDERS_ONLINE } from '../data/constants'
import AreaSelector from '../components/AreaSelector'

export default function Home() {
  const { t } = useI18n()
  const [search, setSearch] = useState('')

  const filtered = SERVICES.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.slug.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page-container">
      <section className="mb-6">
        <div className="rounded-2xl bg-gradient-to-br from-[var(--color-brand)]/10 to-[var(--color-brand)]/5 p-5 border border-[var(--color-brand)]/10">
          <h2 className="section-title text-slate-800">{APP_NAME}</h2>
          <p className="section-subtitle text-slate-600 mt-1">{TAGLINE}</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            {t(`${DEMO_PROVIDERS_ONLINE} providers online now`, `${DEMO_PROVIDERS_ONLINE} ప్రొవైడర్లు ఇప్పుడు ఆన్‌లైన్`)}
          </div>
        </div>
      </section>

      <div className="mb-4">
        <AreaSelector variant="inline" />
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
        <input
          type="search"
          placeholder={t('Search services...', 'సేవలు శోధించండి...')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-focus w-full pl-11 pr-11 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 shadow-sm"
          aria-label={t('Search services', 'సేవలు శోధించండి')}
        />
        {search.length > 0 && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label={t('Clear search', 'శోధన క్లియర్')}
          >
            <X size={18} />
          </button>
        )}
      </div>

      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
        {t('Service categories', 'సేవా వర్గాలు')}
      </h3>

      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-slate-500">{t('No services match your search.', 'మీ శోధనకు సేవలు లేవు.')}</p>
            <button
              type="button"
              onClick={() => setSearch('')}
              className="mt-3 text-[var(--color-brand)] font-medium"
            >
              {t('Clear search', 'శోధన క్లియర్')}
            </button>
          </div>
        ) : (
          filtered.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.slug}
                to={`/service/${service.slug}`}
                className="card card-hover flex items-center gap-4 p-4 group"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand)]/10 text-[var(--color-brand)] transition-transform group-hover:scale-105">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-800 group-hover:text-[var(--color-brand)] transition-colors">
                    {t(service.name, service.nameTe)}
                  </h3>
                  <p className="text-sm text-slate-500 truncate mt-0.5">
                    {t(service.description, service.descriptionTe)}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-600">
                    <Star size={14} className="text-amber-500 fill-amber-500 shrink-0" />
                    <span>{service.rating}</span>
                    <span className="text-slate-300">·</span>
                    <span>{t(`${service.providerCount} providers`, `${service.providerCount} ప్రొవైడర్లు`)}</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-[var(--color-brand)] shrink-0 transition-colors" />
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
