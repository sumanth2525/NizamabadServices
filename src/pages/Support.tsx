import { MessageCircle, Mail, Facebook, Instagram, ChevronRight } from 'lucide-react'
import { useI18n } from '../i18n'
import { SUPPORT_EMAIL, FACEBOOK_URL, INSTAGRAM_URL, HOURS, AREA_TAGLINE, WHATSAPP_MESSAGE } from '../data/constants'

export default function Support() {
  const { t } = useI18n()
  const waNum = (import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210').replace(/\D/g, '')
  const waUrl = `https://wa.me/${waNum}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  const channels = [
    {
      href: waUrl,
      external: true,
      icon: MessageCircle,
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-600',
      title: 'WhatsApp',
      subtitle: t('Chat with us', 'మాతో చాట్ చేయండి'),
    },
    {
      href: `mailto:${SUPPORT_EMAIL}`,
      external: false,
      icon: Mail,
      iconBg: 'bg-[var(--color-brand)]/10',
      iconColor: 'text-[var(--color-brand)]',
      title: 'Email',
      subtitle: SUPPORT_EMAIL,
    },
    {
      href: FACEBOOK_URL,
      external: true,
      icon: Facebook,
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-600',
      title: 'Facebook',
      subtitle: t('Follow us', 'మమ్మల్ని ఫాలో చేయండి'),
    },
    {
      href: INSTAGRAM_URL,
      external: true,
      icon: Instagram,
      iconBg: 'bg-pink-500/10',
      iconColor: 'text-pink-600',
      title: 'Instagram',
      subtitle: t('See stories & updates', 'స్టోరీస్ మరియు అప్‌డేట్స్ చూడండి'),
    },
  ]

  const linkClass = "card card-hover flex items-center gap-4 p-4 group"

  return (
    <div className="page-container">
      <div className="mb-6">
        <h2 className="section-title text-slate-800">{t('Support', 'సపోర్ట్')}</h2>
        <p className="section-subtitle mt-1 max-w-md">
          {t('Reach us via WhatsApp, Email or Facebook. We respond within 5 minutes.', 'వాట్సాప్, ఇమెయిల్ లేదా ఫేస్‌బుక్ ద్వారా మమ్మల్ని సంప్రదించండి. మేము 5 నిమిషాలలో ప్రతిస్పందిస్తాము.')}
        </p>
      </div>

      <div className="space-y-2.5">
        {channels.map((ch) => {
          const Icon = ch.icon
          const content = (
            <>
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${ch.iconBg} ${ch.iconColor}`}>
                <Icon size={24} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-slate-800 group-hover:text-[var(--color-brand)] transition-colors">{ch.title}</h3>
                <p className="text-sm text-slate-500 truncate mt-0.5">{ch.subtitle}</p>
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-[var(--color-brand)] shrink-0 transition-colors" />
            </>
          )
          return ch.external ? (
            <a key={ch.title} href={ch.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {content}
            </a>
          ) : (
            <a key={ch.title} href={ch.href} className={linkClass}>
              {content}
            </a>
          )
        })}
      </div>

      <footer className="mt-10 pt-6 border-t border-slate-200/80 text-center">
        <p className="text-sm font-medium text-slate-600">{AREA_TAGLINE}</p>
        <p className="text-sm text-slate-500 mt-1">{t('Hours', 'గంటలు')}: {HOURS}</p>
      </footer>
    </div>
  )
}
