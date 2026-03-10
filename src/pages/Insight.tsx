import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, MoreVertical, Target, Flame, Footprints } from 'lucide-react'
import { useI18n } from '../i18n'
import { getAnalytics, type Analytics } from '../api/client'

type Range = 'week' | 'month' | 'year' | 'all'

const WEEK_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const FALLBACK_BAR = [0, 0, 0, 0, 0, 0, 0]

export default function Insight() {
  const { t } = useI18n()
  const [range, setRange] = useState<Range>('week')
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getAnalytics()
      .then((data) => {
        setAnalytics(data)
      })
      .finally(() => setLoading(false))
  }, [])

  const ranges: { key: Range; labelEn: string; labelTe: string }[] = [
    { key: 'week', labelEn: 'Week', labelTe: 'వారం' },
    { key: 'month', labelEn: 'Month', labelTe: 'నెల' },
    { key: 'year', labelEn: 'Year', labelTe: 'సంవత్సరం' },
    { key: 'all', labelEn: 'All Time', labelTe: 'అన్ని సమయం' },
  ]

  const barValues = analytics?.requests_per_day ?? FALLBACK_BAR
  const maxBar = Math.max(1, ...barValues)
  const goalsDone = analytics?.goals_done ?? 0
  const goalsTotal = analytics?.goals_total ?? 7
  const daysCompleted = analytics?.days_with_requests ?? [false, false, false, false, false, false, false]
  const totalRequests = analytics?.total_requests ?? 0
  const totalProviders = analytics?.total_providers ?? 0
  const lastWeekRequests = analytics?.last_week_requests ?? 0

  return (
    <div className="min-h-full bg-[#fefefe]">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200/80">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100" aria-label="Back">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold text-slate-800">
            {t('Insight', 'ఇన్‌సైట్')}
          </h1>
          <button type="button" className="p-2 rounded-lg text-slate-600 hover:bg-slate-100" aria-label="More">
            <MoreVertical size={22} />
          </button>
        </div>

        <div className="flex gap-1 px-4 pb-3">
          {ranges.map(({ key, labelEn, labelTe }) => (
            <button
              key={key}
              type="button"
              onClick={() => setRange(key)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                range === key
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t(labelEn, labelTe)}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 py-5 pb-8">
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800">{t('This week', 'ఈ వారం')}</h2>
            <span className="text-sm text-slate-500">
              {t('Last week', 'గత వారం')} {lastWeekRequests} {t('requests', 'అభ్యర్థనలు')}
            </span>
          </div>
          {loading ? (
            <div className="h-32 flex items-center justify-center text-slate-400 text-sm">{t('Loading...', 'లోడ్ అవుతోంది...')}</div>
          ) : (
            <>
              <div className="flex items-end justify-between gap-1 h-32">
                {WEEK_LABELS.map((day, i) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md bg-[#f97316] min-h-[4px] transition-all"
                      style={{ height: `${(barValues[i] / maxBar) * 100}%` }}
                    />
                    <span className="text-xs text-slate-500">{day}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-1 text-xs text-slate-400">
                <span>0</span>
                <span>{maxBar > 2 ? Math.ceil(maxBar / 2) : ''}</span>
                <span>{maxBar}</span>
              </div>
            </>
          )}
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-5">
          <div className="flex items-center gap-2 mb-1">
            <Target size={20} className="text-[#f97316]" />
            <h2 className="font-bold text-slate-800">{t('Your daily goals', 'మీ రోజువారీ లక్ష్యాలు')}</h2>
          </div>
          <p className="text-sm text-slate-500 mb-3">{t('Last 7 days', 'గత 7 రోజులు')}</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-slate-800">{goalsDone}/{goalsTotal}</span>
            <span className="text-sm text-slate-500">
              {goalsTotal - goalsDone} {t('days left', 'రోజులు మిగిలివి')}
            </span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-[#f97316] rounded-full transition-all"
              style={{ width: `${(goalsDone / goalsTotal) * 100}%` }}
            />
          </div>
          <div className="flex justify-between">
            {WEEK_LABELS.map((day, i) => (
              <div
                key={day}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  daysCompleted[i]
                    ? 'bg-[#f97316] text-white'
                    : 'border-2 border-[#f97316] text-[#f97316]'
                }`}
              >
                {day.charAt(0)}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800">{t('Overview', 'అవలోకనం')}</h2>
            <button type="button" className="text-sm font-medium text-[#f97316] hover:underline">
              {t('See details', 'వివరాలు చూడండి')}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#f97316]/15 flex items-center justify-center">
                <Footprints size={24} className="text-[#f97316]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{totalRequests.toLocaleString()}</p>
                <p className="text-sm text-slate-500">{t('Requests', 'అభ్యర్థనలు')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#f97316]/15 flex items-center justify-center">
                <Flame size={24} className="text-[#f97316]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{totalProviders.toLocaleString()}</p>
                <p className="text-sm text-slate-500">{t('Providers', 'ప్రొవైడర్లు')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
