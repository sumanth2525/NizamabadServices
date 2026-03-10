import { MessageCircle, Mail, Facebook, Instagram, ChevronRight, MapPin, Clock } from 'lucide-react'
import { SUPPORT_EMAIL, FACEBOOK_URL, INSTAGRAM_URL, HOURS, AREA_TAGLINE } from '../data/constants'

export default function Support() {
  const waNum = (import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210').replace(/\D/g, '')
  const waUrl = `https://wa.me/${waNum}`

  const channels = [
    {
      href: waUrl,
      icon: MessageCircle,
      iconBg: 'bg-green-500/15',
      iconColor: 'text-green-600',
      title: 'WhatsApp',
      subtitle: 'Chat with us instantly',
    },
    {
      href: `mailto:${SUPPORT_EMAIL}`,
      icon: Mail,
      iconBg: 'bg-blue-500/15',
      iconColor: 'text-blue-600',
      title: 'Email',
      subtitle: 'Send us a detailed message',
    },
    {
      href: FACEBOOK_URL,
      icon: Facebook,
      iconBg: 'bg-[var(--color-brand)]/15',
      iconColor: 'text-[var(--color-brand)]',
      title: 'Facebook',
      subtitle: 'Join our community',
    },
    {
      href: INSTAGRAM_URL,
      icon: Instagram,
      iconBg: 'bg-pink-500/15',
      iconColor: 'text-pink-600',
      title: 'Instagram',
      subtitle: 'Follow us for updates',
    },
  ]

  return (
    <div className="page-container">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Reach us via WhatsApp, Email or Facebook.
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          We respond within 5 minutes. Our team is here to help you with any service requests in Nizamabad.
        </p>
      </div>

      <div className="space-y-2">
        {channels.map((ch) => {
          const Icon = ch.icon
          return (
            <a
              key={ch.title}
              href={ch.href}
              target={ch.href.startsWith('http') ? '_blank' : undefined}
              rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${ch.iconBg} ${ch.iconColor}`}>
                <Icon size={24} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900">{ch.title}</h3>
                <p className="text-sm text-slate-500 truncate">{ch.subtitle}</p>
              </div>
              <ChevronRight size={20} className="text-slate-400 shrink-0" />
            </a>
          )
        })}
      </div>

      <div className="mt-6 p-5 rounded-2xl bg-[var(--color-brand)] text-white">
        <div className="flex gap-3 mb-4">
          <MapPin size={20} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Business Address</p>
            <p className="text-sm text-white/90 mt-0.5">{AREA_TAGLINE}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Clock size={20} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Operating Hours</p>
            <p className="text-sm text-white/90 mt-0.5">Monday - Sunday: {HOURS}</p>
          </div>
        </div>
      </div>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-8 right-4 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 hover:bg-[#20bd5a] hover:scale-105 transition-all"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  )
}
