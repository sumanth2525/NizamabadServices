import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Phone, Star, BadgeCheck, Clock } from 'lucide-react'
import { useI18n } from '../i18n'
import { useArea } from '../context/AreaContext'
import { getServiceBySlug } from '../data/services'
import { HOURS } from '../data/constants'
import { getProvidersByCategory, type Provider } from '../api/client'

export default function Request() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useI18n()
  const { area } = useArea()
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)

  const service = slug ? getServiceBySlug(slug) : undefined

  useEffect(() => {
    if (slug) {
      setLoading(true)
      getProvidersByCategory(slug, area || undefined).then((data) => {
        setProviders(data)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [slug, area])

  if (!service) {
    return (
      <div className="page-container text-center py-12">
        <div className="card p-8 max-w-sm mx-auto">
          <p className="text-slate-600">{t('Service not found.', 'సేవ కనుగొనబడలేదు.')}</p>
          <Link to="/" className="btn-primary mt-6 inline-flex max-w-[200px] mx-auto">
            {t('Back to Home', 'హోమ్‌కు తిరిగి')}
          </Link>
        </div>
      </div>
    )
  }

  const Icon = service.icon

  return (
    <div className="page-container">
      <Link
        to="/"
        className="btn-ghost -ml-1 mb-4 inline-flex"
      >
        <ArrowLeft size={20} />
        <span>{t('Back', 'వెనుక')}</span>
      </Link>

      <div className="card p-5 mb-6 bg-gradient-to-br from-white to-slate-50/50">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
            <Icon size={28} strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="section-title text-slate-800">{t(service.name, service.nameTe)}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <Clock size={16} className="shrink-0" />
              <span>{t('Hours', 'గంటలు')}: {HOURS}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 className="section-title text-slate-800">
          {t('Available providers', 'అందుబాటులో ఉన్న ప్రొవైడర్లు')}
        </h2>
        {area && (
          <span className="text-sm text-slate-500">
            {t('In', 'లో')} <strong className="text-slate-700">{area}</strong>
          </span>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 rounded bg-slate-200" />
                  <div className="h-3 w-24 rounded bg-slate-100" />
                </div>
                <div className="h-10 w-20 rounded-xl bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      ) : providers.length === 0 ? (
        <div className="card p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
            <Icon size={32} strokeWidth={1.5} />
          </div>
          <p className="text-slate-600 font-medium">{t('No providers listed yet.', 'ఇంకా ప్రొవైడర్లు జాబితా చేయబడలేదు.')}</p>
          <p className="text-sm text-slate-500 mt-2">{t('Contact support to request this service.', 'ఈ సేవను అభ్యర్థించడానికి సపోర్ట్‌ను సంప్రదించండి.')}</p>
          <a
            href={`https://wa.me/${(import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210').replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6 inline-flex max-w-[240px] mx-auto"
          >
            {t('Contact on WhatsApp', 'వాట్సాప్‌లో సంప్రదించండి')}
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {providers.map((p) => (
            <div key={p.id} className="card card-hover p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-800">{p.name}</span>
                  {p.verified && (
                    <span title={t('Verified', 'ధృవీకరించబడింది')}>
                      <BadgeCheck size={18} className="text-[var(--color-brand)] shrink-0" />
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-0.5">{p.area}</p>
                {p.rating != null && p.rating > 0 && (
                  <div className="flex items-center gap-1 mt-1.5 text-sm text-slate-600">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span>{p.rating}</span>
                    {p.rating_count != null && p.rating_count > 0 && (
                      <span className="text-slate-400">({p.rating_count})</span>
                    )}
                  </div>
                )}
              </div>
              <a
                href={`tel:${p.phone}`}
                className="btn-primary-sm shrink-0 inline-flex w-full sm:w-auto justify-center"
              >
                <Phone size={18} />
                {t('Call', 'కాల్')}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
