import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Bell, ChevronRight, User, Search } from 'lucide-react'
import { useI18n } from '../i18n'
import { SERVICES } from '../data/services'
import AreaSelector from '../components/AreaSelector'
import { WHATSAPP_NUMBER } from '../data/constants'

export default function Home() {
  const { t, lang, setLang } = useI18n()
  const [cardPage, setCardPage] = useState(0)
  const [search, setSearch] = useState('')

  const cardsPerPage = 4

  const normalizedSearch = search.trim().toLowerCase()
  const filteredServices = SERVICES.filter((service) => {
    if (!normalizedSearch) return true
    const name = `${service.name} ${service.nameTe}`.toLowerCase()
    const desc = `${service.description} ${service.descriptionTe}`.toLowerCase()
    return name.includes(normalizedSearch) || desc.includes(normalizedSearch)
  })

  const cardPageCount = Math.max(1, Math.ceil(filteredServices.length / cardsPerPage))

  useEffect(() => {
    // Reset to first page whenever the search query changes
    setCardPage(0)
  }, [normalizedSearch])

  return (
    <div className="min-h-full">
      {/* Mobile header */}
      <header className="md:hidden sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200/80">
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-2 min-w-0">
            <img src="/logo.svg" alt="" className="h-9 w-9 shrink-0 rounded-lg" />
            <h1 className="text-xl font-bold text-slate-800 tracking-tight truncate">
              {t('Nizamabad services', 'నిజామాబాద్ సర్వీసెస్')}
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <a
              href={`tel:${WHATSAPP_NUMBER}`}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label={t('Call support', 'సపోర్ట్‌కి కాల్ చేయండి')}
            >
              <Phone size={22} />
            </a>
            <button
              type="button"
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label={t('Notifications', 'నోటిఫికేషన్లు')}
            >
              <Bell size={22} />
            </button>
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'te' : 'en')}
              className="ml-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-200"
            >
              {lang === 'en' ? 'Telugu' : 'English'}
            </button>
          </div>
        </div>
        <div className="px-4 pb-3">
          <AreaSelector variant="inline" />
        </div>
      </header>

      {/* Desktop: hero + area */}
      <div className="hidden md:block border-b border-slate-200/80 bg-white/80">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h2 className="text-2xl font-bold text-slate-800">Services in Nizamabad</h2>
          <p className="text-slate-600 mt-1">Choose a category to find providers</p>
          <div className="mt-4">
            <AreaSelector variant="inline" />
          </div>
        </div>
      </div>

      <main className="pb-6 px-4 md:px-6 md:py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Hero + search */}
          <section className="mt-4 md:mt-0 grid grid-cols-[minmax(0,1.5fr)] md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-4 items-center">
            <div>
              <p className="text-sm font-medium text-[var(--color-brand-dark)] mb-1">
                {t('Local services', 'స్థానిక సేవలు')}
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {t('Fast help', 'త్వరిత సహాయం')}
                <br />
                <span className="text-[var(--color-brand)]">
                  {t('in Nizamabad!', 'నిజామాబాద్‌లో!')}
                </span>
              </h2>
              <p className="mt-2 text-sm text-slate-500 max-w-md">
                {t(
                  'Pick a category and see trusted providers with one tap.',
                  'ఒక వర్గాన్ని ఎంచుకుని నమ్మకమైన ప్రొవైడర్లను ఒకే ట్యాప్‌లో చూడండి.'
                )}
              </p>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="h-32 w-40 rounded-3xl bg-gradient-to-br from-[var(--color-brand)] via-emerald-400 to-amber-300 shadow-xl flex items-end justify-center overflow-hidden">
                <div className="mb-4 w-24 h-24 rounded-3xl bg-white/90 shadow-lg flex flex-col items-center justify-center gap-1 text-xs text-slate-700">
                  <span className="font-semibold text-[var(--color-brand-dark)]">
                    {t('Today', 'ఈరోజు')}
                  </span>
                  <span className="text-[11px]">{t('Requests', 'అభ్యర్థనలు')}</span>
                  <span className="text-2xl font-bold text-slate-900">12</span>
                </div>
              </div>
            </div>
          </section>

          {/* Search bar */}
          <section className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1 rounded-2xl bg-white shadow-sm border border-slate-100 px-3 py-2">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input
                type="search"
                placeholder={t('Search service or area', 'సేవ లేదా ప్రాంతం వెతకండి')}
            className="flex-1 border-none bg-transparent text-sm placeholder:text-slate-400 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.currentTarget.blur()
              }
            }}
              />
            </div>
          </section>

          {/* Categories carousel */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-slate-800">
                {t('Categories', 'వర్గాలు')}
              </h3>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
          {filteredServices.map((service, index) => {
                const Icon = service.icon
                const isPrimary = index === 0
                return (
                  <Link
                    key={service.slug}
                    to={`/service/${service.slug}`}
                    className={`min-w-[130px] rounded-3xl px-3 py-3 flex flex-col gap-2 shadow-[0_10px_25px_rgba(15,23,42,0.08)] border transition-transform active:scale-95 ${
                      isPrimary
                        ? 'bg-[var(--color-brand)] text-white border-[var(--color-brand)]'
                        : 'bg-white text-slate-800 border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-9 w-9 rounded-2xl flex items-center justify-center ${
                          isPrimary ? 'bg-white/15' : 'bg-[var(--color-brand)]/10 text-[var(--color-brand)]'
                        }`}
                      >
                        <Icon size={20} strokeWidth={2.2} />
                      </div>
                      <span className="text-sm font-semibold line-clamp-1">
                        {t(service.name, service.nameTe)}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] ${
                        isPrimary ? 'text-white/90' : 'text-slate-500'
                      }`}
                    >
                      {t('~{{count}} providers', '~{{count}} ప్రొవైడర్లు').replace(
                        '{{count}}',
                        service.providerCount.toString()
                      )}
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* Recommended services grid */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-800">
                {t('Recommended for you', 'మీ కోసం సూచించినవి')}
              </h3>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filteredServices.length === 0 && (
            <div className="col-span-full text-center text-sm text-slate-500 py-6">
              {t('No services match your search.', 'మీ శోధనకి సరిపడే సేవలు లేవు.')}
            </div>
          )}
          {filteredServices.slice(
                cardPage * cardsPerPage,
                cardPage * cardsPerPage + cardsPerPage
              ).map((service) => (
                <Link key={service.slug} to={`/service/${service.slug}`} className="block">
                  <article className="bg-white rounded-3xl shadow-[0_18px_45px_rgba(15,23,42,0.08)] border border-slate-100/80 overflow-hidden hover:shadow-[0_22px_55px_rgba(15,23,42,0.12)] transition-all h-full flex flex-col">
                    <div className="h-28 bg-[radial-gradient(circle_at_top_left,#fce7ff_0%,#f5ecff_40%,#ecfdf5_100%)] flex items-center justify-center">
                      <div className="h-16 w-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-[var(--color-brand)]">
                        <service.icon size={28} strokeWidth={2.2} />
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col gap-2">
                      <h3 className="font-semibold text-slate-900">
                        {t(service.name, service.nameTe)}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {t(service.description, service.descriptionTe)}
                      </p>
                      <div className="mt-1 flex items-center justify-end text-xs text-slate-500">
                        <span>{service.rating.toFixed(1)} ★</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {[1, 2].map((i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center"
                            >
                              <User size={14} className="text-slate-500" />
                            </div>
                          ))}
                        </div>
                        <div className="w-9 h-9 rounded-full bg-[var(--color-brand)] text-white flex items-center justify-center shrink-0">
                          <ChevronRight size={18} strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            {cardPageCount > 1 && (
              <div className="flex items-center justify-center gap-3 pt-1">
                <div className="flex items-center gap-1">
                  {Array.from({ length: cardPageCount }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCardPage(i)}
                      className={`h-2.5 rounded-full transition-all ${
                        i === cardPage ? 'w-5 bg-[var(--color-brand)]' : 'w-2 bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setCardPage((prev) => (prev + 1) % cardPageCount)}
                  className="h-7 px-4 rounded-full text-[11px] font-medium bg-[var(--color-brand)] text-white shadow-sm"
                >
                  {t('Next', 'తర్వాత')}
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
