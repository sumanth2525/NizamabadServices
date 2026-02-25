import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { getMyRequests, type ServiceRequest } from '../api/client'
import { FileText, Loader2 } from 'lucide-react'

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
      <h2 className="section-title text-slate-800 mb-1">{t('My Requests', 'నా అభ్యర్థనలు')}</h2>
      <p className="section-subtitle mb-5">{t('Enter your phone to see your requests.', 'మీ అభ్యర్థనలు చూడటానికి ఫోన్ నంబర్ నమోదు చేయండి.')}</p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {t('Your phone number', 'మీ ఫోన్ నంబర్')}
        </label>
        <div className="flex gap-2">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadRequests()}
            placeholder="9876543210"
            className="input-focus flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white min-h-[48px]"
          />
          <button
            type="button"
            onClick={loadRequests}
            disabled={loading}
            className="btn-primary-sm min-w-[100px]"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : t('Load', 'లోడ్')}
          </button>
        </div>
      </div>

      {loading && (
        <div className="card p-8 flex flex-col items-center justify-center gap-3">
          <Loader2 size={32} className="text-[var(--color-brand)] animate-spin" />
          <p className="text-slate-500">{t('Loading...', 'లోడ్ అవుతోంది...')}</p>
        </div>
      )}

      {!loading && searched && requests.length === 0 && (
        <div className="card p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
            <FileText size={32} strokeWidth={1.5} />
          </div>
          <p className="font-medium text-slate-600">{t('No requests yet.', 'ఇంకా అభ్యర్థనలు లేవు.')}</p>
          <p className="text-sm text-slate-500 mt-2">{t('Submit a request from Home to see it here.', 'ఇక్కడ చూడటానికి హోమ్ నుండి అభ్యర్థన సమర్పించండి.')}</p>
        </div>
      )}

      {!loading && requests.length > 0 && (
        <div className="space-y-3">
          {requests.map((r) => (
            <div key={r.id} className="card card-hover p-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 capitalize">
                    {r.service_slug.replace(/-/g, ' ')}
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">{r.address}</p>
                  <p className="text-xs text-slate-400 mt-2">{formatDate(r.created_at, t)}</p>
                </div>
                <span
                  className={`badge-${r.status === 'pending' ? 'pending' : r.status === 'completed' ? 'completed' : 'default'} text-xs font-semibold px-3 py-1.5 rounded-full shrink-0 w-fit`}
                >
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !searched && (
        <div className="card p-8 text-center text-slate-500">
          <p className="text-sm">{t('Enter your phone and tap Load to see your requests.', 'మీ అభ్యర్థనలు చూడటానికి ఫోన్ నమోదు చేసి లోడ్ నొక్కండి.')}</p>
        </div>
      )}
    </div>
  )
}
