import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { getMyRequests, type ServiceRequest } from '../api/client'
import { Loader2, Phone, RotateCcw, Search } from 'lucide-react'

function formatDate(iso: string, t: (en: string, te: string) => string) {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000))
  if (diffDays === 0) return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
  if (diffDays === 1) return t('Yesterday', 'నిన్న')
  if (diffDays < 7) return d.toLocaleDateString(undefined, { weekday: 'short' })
  return d.toLocaleDateString()
}

export default function MyRequests() {
  const { t } = useI18n()
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('nizamabad-services-phone')
    if (stored) setPhone(stored)
  }, [])

  const loadRequests = () => {
    if (!phone.trim()) return
    setLoading(true)
    setSearched(true)
    localStorage.setItem('nizamabad-services-phone', phone.trim())
    getMyRequests(phone.trim()).then((data) => {
      setRequests(data)
      setLoading(false)
    })
  }

  return (
    <div className="page-container">
      <div className="text-center mb-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EFE8F9] mb-4">
          <RotateCcw size={32} className="text-[var(--color-brand)]" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">{t('My Requests', 'నా అభ్యర్థనలు')}</h2>
        <p className="mt-1 text-sm text-slate-500">
          {t('Enter your phone to see your requests.', 'మీ అభ్యర్థనలు చూడటానికి ఫోన్ నంబర్ నమోదు చేయండి.')}
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <label className="block text-sm font-medium text-slate-700">
          {t('Phone Number', 'ఫోన్ నంబర్')}
        </label>
        <div className="relative">
          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadRequests()}
            placeholder={t('Enter your phone number', 'మీ ఫోన్ నంబర్ నమోదు చేయండి')}
            className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 bg-slate-50/80 text-sm placeholder:text-slate-400 focus:outline-none focus:border-[var(--color-brand)] input-focus"
          />
        </div>
        <button
          type="button"
          onClick={loadRequests}
          disabled={loading}
          className="w-full py-3 rounded-full bg-[var(--color-brand)] text-white font-semibold text-sm hover:bg-[var(--color-brand-dark)] disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            t('Load Requests', 'అభ్యర్థనలు లోడ్ చేయండి')
          )}
        </button>
      </div>

      {loading && (
        <div className="py-12 flex flex-col items-center justify-center gap-3">
          <Loader2 size={32} className="text-[var(--color-brand)] animate-spin" />
          <p className="text-slate-500 text-sm">{t('Loading...', 'లోడ్ అవుతోంది...')}</p>
        </div>
      )}

      {!loading && searched && requests.length > 0 && (
        <div className="space-y-3">
          {requests.map((r) => (
            <div key={r.id} className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm">
              <div className="flex justify-between items-start gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 capitalize">
                    {r.service_slug.replace(/-/g, ' ')}
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">{r.address}</p>
                  <p className="text-xs text-slate-400 mt-2">{formatDate(r.created_at, t)}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full shrink-0 ${
                    r.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                    r.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-slate-100 text-slate-600'
                  }`}
                >
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && searched && requests.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200/80">
            <Search size={28} className="text-slate-400" />
          </div>
          <p className="text-sm text-slate-500 max-w-xs">
            {t('Enter your phone and tap Load to see your requests.', 'మీ అభ్యర్థనలు చూడటానికి ఫోన్ నమోదు చేసి లోడ్ నొక్కండి.')}
          </p>
        </div>
      )}

      {!loading && !searched && (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200/80">
            <Search size={28} className="text-slate-400" />
          </div>
          <p className="text-sm text-slate-500 max-w-xs">
            {t('Enter your phone and tap Load to see your requests.', 'మీ అభ్యర్థనలు చూడటానికి ఫోన్ నమోదు చేసి లోడ్ నొక్కండి.')}
          </p>
        </div>
      )}
    </div>
  )
}
