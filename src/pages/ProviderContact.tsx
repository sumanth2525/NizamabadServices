import { Link, useParams, useLocation } from 'react-router-dom'
import { ArrowLeft, Phone, CheckCircle } from 'lucide-react'
import { useI18n } from '../i18n'
import { getServiceBySlug } from '../data/services'
import type { Provider } from '../api/client'
import { WHATSAPP_MESSAGE } from '../data/constants'

export default function ProviderContact() {
  const { slug } = useParams<{ slug: string; providerId: string }>()
  const location = useLocation()
  const { t } = useI18n()

  const provider = (location.state as { provider?: Provider })?.provider as Provider | undefined
  const service = slug ? getServiceBySlug(slug) : undefined

  if (!provider) {
    return (
      <div className="page-container text-center py-12">
        <div className="card p-8 max-w-sm mx-auto">
          <p className="text-slate-600">{t('Provider not found. Go back and select a provider.', 'ప్రొవైడర్ కనుగొనబడలేదు. వెనుకకు వెళ్లి ప్రొవైడర్ ఎంచుకోండి.')}</p>
          <Link to={slug ? `/service/${slug}` : '/'} className="btn-primary mt-6 inline-flex max-w-[200px] mx-auto">
            {t('Back', 'వెనుక')}
          </Link>
        </div>
      </div>
    )
  }

  const whatsappUrl = `https://wa.me/${provider.phone.replace(/\D/g, '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <div className="min-h-full bg-gradient-to-b from-[#f0fdf4] to-[#ecfdf5]">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200/80">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            to={slug ? `/service/${slug}` : '/'}
            className="p-2 -ml-1 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Back"
          >
            <ArrowLeft size={22} />
          </Link>
          <h1 className="text-lg font-bold text-slate-800 flex-1">
            {t('Contact provider', 'ప్రొవైడర్‌ను సంప్రదించండి')}
          </h1>
        </div>
      </header>

      <main className="page-container py-6">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-white border-2 border-emerald-400 flex items-center justify-center shadow-sm mb-3">
            <CheckCircle size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">{t('Ready to connect', 'కనెక్ట్ అవ్వడానికి సిద్ధం')}</h2>
          <p className="text-slate-600 mt-1 text-sm">
            {t('Call or message this provider directly.', 'ఈ ప్రొవైడర్‌ను నేరుగా కాల్ చేయండి లేదా మెసేజ్ చేయండి.')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t('Service', 'సేవ')}</p>
              <p className="font-semibold text-slate-800 mt-0.5">
                {service ? t(service.name, service.nameTe) : provider.category_slug}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t('Area', 'ప్రాంతం')}</p>
              <p className="font-semibold text-slate-800 mt-0.5">{provider.area}</p>
            </div>
          </div>
        </div>

        <section className="mb-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">{t('Provider details', 'ప్రొవైడర్ వివరాలు')}</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex items-center gap-4 p-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center text-[var(--color-brand)] font-bold text-lg">
                {provider.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-800">{provider.name}</p>
                <p className="text-sm text-slate-500">{provider.phone}</p>
              </div>
            </div>
          </div>
        </section>

        <a
          href={`tel:${provider.phone}`}
          className="btn-primary flex items-center justify-center gap-2 mb-3"
        >
          <Phone size={22} />
          {t('Call provider', 'ప్రొవైడర్‌ను కాల్ చేయండి')}
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-xl font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-lg shadow-green-500/25 transition-all active:scale-[0.98]"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t('WhatsApp provider', 'వాట్సాప్‌లో సంప్రదించండి')}
        </a>
      </main>
    </div>
  )
}
