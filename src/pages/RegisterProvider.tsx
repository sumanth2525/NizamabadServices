import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useI18n } from '../i18n'
import { createProvider } from '../api/client'
import { SERVICES } from '../data/services'
import { AREAS } from '../data/constants'

export default function RegisterProvider() {
  const { t } = useI18n()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [categorySlug, setCategorySlug] = useState('')
  const [area, setArea] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !phone.trim() || !categorySlug || !area) {
      setError(t('Please fill all fields.', 'దయచేసి అన్ని ఫీల్డ్‌లను పూరించండి.'))
      return
    }
    setLoading(true)
    const res = await createProvider({ name: name.trim(), phone: phone.trim(), category_slug: categorySlug, area })
    setLoading(false)
    if (res.ok) {
      setDone(true)
    } else {
      setError(res.error || t('Registration failed.', 'నమోదు విఫలమైంది.'))
    }
  }

  if (done) {
    return (
      <div className="page-container py-8">
        <div className="card p-8 text-center max-w-md mx-auto">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-5">
            <CheckCircle2 size={48} strokeWidth={2} />
          </div>
          <h2 className="section-title text-slate-800 mb-2">
            {t('Registration received', 'నమోదు స్వీకరించబడింది')}
          </h2>
          <p className="text-slate-600">
            {t('We will get in touch with you shortly.', 'మేము త్వరలో మీతో సంప్రదిస్తాము.')}
          </p>
          <Link to="/menu" className="btn-primary mt-8 inline-flex max-w-[220px] mx-auto">
            {t('Back to Menu', 'మెనుకు తిరిగి')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <Link to="/menu" className="btn-ghost -ml-1 mb-4 inline-flex">
        <ArrowLeft size={20} />
        <span>{t('Back', 'వెనుక')}</span>
      </Link>

      <h2 className="section-title text-slate-800 mb-1">
        {t('Register as provider', 'ప్రొవైడర్‌గా నమోదు చేయండి')}
      </h2>
      <p className="section-subtitle mb-6">
        {t('Fill the form below. We’ll contact you soon.', 'క్రింద ఫారమ్ పూరించండి. మేము త్వరలో సంప్రదిస్తాము.')}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">{t('Name', 'పేరు')}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            className="input-focus w-full px-4 py-3 rounded-xl border border-slate-200 bg-white"
            placeholder={t('Your name', 'మీ పేరు')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">{t('Phone', 'ఫోన్')}</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={15}
            className="input-focus w-full px-4 py-3 rounded-xl border border-slate-200 bg-white"
            placeholder="9876543210"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">{t('Service category', 'సేవా వర్గం')}</label>
          <select
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="input-focus w-full px-4 py-3 rounded-xl border border-slate-200 bg-white min-h-[48px]"
          >
            <option value="">{t('Select category', 'వర్గాన్ని ఎంచుకోండి')}</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">{t('Area', 'ప్రాంతం')}</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="input-focus w-full px-4 py-3 rounded-xl border border-slate-200 bg-white min-h-[48px]"
          >
            <option value="">{t('Select area', 'ప్రాంతాన్ని ఎంచుకోండి')}</option>
            {AREAS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
            {error}
          </div>
        )}
        <button type="submit" disabled={loading} className="btn-primary py-4 text-base">
          {loading ? t('Submitting...', 'సమర్పిస్తోంది...') : t('Submit', 'సమర్పించండి')}
        </button>
      </form>
    </div>
  )
}
