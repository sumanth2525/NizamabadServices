import { MapPin } from 'lucide-react'
import { useI18n } from '../i18n'
import { useArea, type AreaValue } from '../context/AreaContext'

type Variant = 'header' | 'inline'

function toAreaValue(value: string, areas: readonly string[]): AreaValue {
  if (value === '') return ''
  return areas.includes(value) ? (value as AreaValue) : ''
}

interface AreaSelectorProps {
  variant?: Variant
}

export default function AreaSelector({ variant = 'header' }: AreaSelectorProps) {
  const { t } = useI18n()
  const { area, setArea, areas } = useArea()

  const labelAll = t('All areas', 'అన్ని ప్రాంతాలు')

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-slate-600 flex items-center gap-1.5">
          <MapPin size={16} className="text-[var(--color-brand)]" />
          {t('Location', 'ప్రాంతం')}:
        </span>
        <select
          value={area}
          onChange={(e) => setArea(toAreaValue(e.target.value, areas))}
          className="input-focus rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 min-h-[44px]"
          aria-label={t('Select area', 'ప్రాంతాన్ని ఎంచుకోండి')}
        >
          <option value="">{labelAll}</option>
          {areas.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <select
        value={area}
        onChange={(e) => setArea(toAreaValue(e.target.value, areas))}
        className="input-focus rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 text-sm font-medium text-slate-700 min-h-[36px] max-w-[140px] truncate"
        aria-label={t('Filter by area', 'ప్రాంతం ప్రకారం ఫిల్టర్')}
        title={area || labelAll}
      >
        <option value="">{labelAll}</option>
        {areas.map((a) => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>
    </div>
  )
}
