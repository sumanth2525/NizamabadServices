import { Link } from 'react-router-dom'
import { Search, MapPin, ChevronDown } from 'lucide-react'
import { useI18n } from '../i18n'
import { SERVICES } from '../data/services'
import { useArea, type AreaValue } from '../context/AreaContext'

const FEATURED = [
  {
    slug: 'ac-appliance',
    name: 'Pro Cooling Solutions',
    subtitle: 'AC Installation & Repair',
    price: '299',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400',
  },
  {
    slug: 'home-cleaning',
    name: 'Elite Deep Cleaning',
    subtitle: 'Full Home Deep Clean',
    price: '999',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
  },
]

export default function Home() {
  const { t } = useI18n()
  const { area, setArea, areas } = useArea()

  return (
    <div className="min-h-full bg-white">
      {/* Mobile: header with search + area */}
      <div className="md:hidden px-4 pt-4 pb-3 space-y-3">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Nizamabad Services</h1>
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search for services..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/80 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/20"
          />
        </div>
        <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
          <MapPin size={18} className="text-[var(--color-brand)] shrink-0" />
          <select
            value={area}
            onChange={(e) => setArea((e.target.value === '' || areas.includes(e.target.value) ? e.target.value : '') as AreaValue)}
            className="text-sm font-medium bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer appearance-none pr-5"
          >
            <option value="">{t('All areas', 'అన్ని ప్రాంతాలు')}</option>
            {areas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <ChevronDown size={18} className="text-slate-400 -ml-3 pointer-events-none" />
        </label>
      </div>

      {/* Desktop: hero + area */}
      <div className="hidden md:block border-b border-slate-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h2 className="text-2xl font-bold text-slate-800">Services in Nizamabad</h2>
          <div className="mt-4 flex items-center gap-2">
            <MapPin size={18} className="text-[var(--color-brand)]" />
            <select
              value={area}
              onChange={(e) => setArea((e.target.value === '' || areas.includes(e.target.value) ? e.target.value : '') as AreaValue)}
              className="input-focus rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium"
            >
              <option value="">{t('All areas', 'అన్ని ప్రాంతాలు')}</option>
              {areas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <main className="px-4 pb-6 md:px-6 md:py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Hero banner */}
          <section className="rounded-2xl overflow-hidden bg-gradient-to-r from-[var(--color-brand)] via-[var(--color-brand)] to-orange-400 shadow-lg">
            <div className="flex min-h-[140px] md:min-h-[160px]">
              <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  Fast help in Nizamabad!
                </h2>
                <p className="mt-1.5 text-sm text-white/90 max-w-xs">
                  Expert services delivered to your doorstep within 60 minutes.
                </p>
              </div>
              <div className="w-32 md:w-48 shrink-0 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300)`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-orange-400/80" />
              </div>
            </div>
          </section>

          {/* Categories */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900">Categories</h3>
              <Link to="/" className="text-sm font-semibold text-[var(--color-brand)] hover:underline">
                View All
              </Link>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
              {SERVICES.slice(0, 8).map((service) => {
                const Icon = service.icon
                return (
                  <Link
                    key={service.slug}
                    to={`/service/${service.slug}`}
                    className="min-w-[100px] md:min-w-[120px] rounded-2xl bg-white border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-2"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center text-[var(--color-brand)]">
                      <Icon size={22} strokeWidth={2} />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 text-center line-clamp-1">
                      {t(service.name, service.nameTe)}
                    </span>
                    <span className="text-xs text-slate-500">
                      {service.providerCount}+ providers
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* Recommended for You */}
          <section className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Recommended for You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FEATURED.map((item) => (
                <Link
                  key={item.slug}
                  to={`/service/${item.slug}`}
                  className="block rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-32 md:h-36 bg-slate-100">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/50 text-white text-xs font-medium">
                      <span>★</span>
                      <span>{item.rating}</span>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 truncate">{item.name}</h4>
                      <p className="text-sm text-slate-500 truncate">{item.subtitle}</p>
                      <p className="text-sm font-semibold text-[var(--color-brand)] mt-0.5">
                        Starting from ₹{item.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="shrink-0 px-4 py-2 rounded-xl bg-[var(--color-brand)] text-white text-sm font-semibold hover:bg-[var(--color-brand-dark)] transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
