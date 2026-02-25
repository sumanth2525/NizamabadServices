import { Link } from 'react-router-dom'
import { UserPlus, Info, ChevronRight } from 'lucide-react'
import { useI18n } from '../i18n'

const menuItems = [
  {
    to: '/register-provider',
    icon: UserPlus,
    iconBg: 'bg-[var(--color-brand)]/10',
    iconColor: 'text-[var(--color-brand)]',
    titleEn: 'Register as provider',
    titleTe: 'ప్రొవైడర్‌గా నమోదు చేయండి',
    subtitleEn: 'Join our network of local service providers',
    subtitleTe: 'స్థానిక సేవా ప్రొవైడర్ల నెట్‌వర్క్‌లో చేరండి',
  },
  {
    to: '/support',
    icon: Info,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    titleEn: 'About',
    titleTe: 'గురించి',
    subtitleEn: 'Contact & support',
    subtitleTe: 'సంప్రదించండి మరియు సపోర్ట్',
  },
]

export default function Menu() {
  const { t } = useI18n()

  return (
    <div className="page-container">
      <h2 className="section-title text-slate-800 mb-6">{t('Menu', 'మెను')}</h2>

      <div className="space-y-2.5">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              className="card card-hover flex items-center gap-4 p-4 group"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor}`}>
                <Icon size={24} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-slate-800 group-hover:text-[var(--color-brand)] transition-colors">
                  {t(item.titleEn, item.titleTe)}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  {t(item.subtitleEn, item.subtitleTe)}
                </p>
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-[var(--color-brand)] shrink-0 transition-colors" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
