import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div className="page-container max-w-md">
      {/* In-page header like the design */}
      <div className="mb-5 flex items-center justify-between text-slate-800">
        <button
          type="button"
          className="h-9 w-9 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-sm"
        >
          ‹
        </button>
        <div className="text-sm font-semibold tracking-tight">
          Profile &amp; Settings
        </div>
        <button
          type="button"
          className="h-9 w-9 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-xl leading-none"
        >
          ···
        </button>
      </div>

      {/* Profile card */}
      <div className="relative overflow-hidden rounded-3xl bg-[#fdf5ff] p-6 shadow-md mb-6">
        <div className="absolute -right-16 -top-24 h-44 w-44 rounded-full bg-[#f1d5ff] blur-3xl opacity-80" />
        <div className="relative flex flex-col items-center text-center gap-3">
          <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-[#ffc6d8] via-[#ffd6a5] to-[#fff5c7] flex items-center justify-center ring-4 ring-[#fef6ff] shadow-lg overflow-hidden">
            <span className="text-3xl font-semibold text-slate-800">NS</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Nizamabad citizen
            </h2>
          </div>
        </div>
      </div>

      {/* Settings list */}
      <div className="rounded-3xl bg-[#fefcfb] border border-[#f4e9f9] overflow-hidden shadow-sm">
        <SettingRow label="Email" value="you@example.com" to="/login" />
        <SettingRow label="Theme" value="System default" />
        <SettingRow label="Data & storage" value="28% used" />
        <SettingRow label="Change password" />
        <SettingRow
          label="Send feedback"
          description="Chatbot AI can make mistakes. Consider checking important information and send us your feedback."
        />
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <span>Chat Bot AI · Version 2.0.5</span>
        <div className="flex gap-3">
          <button type="button" className="underline-offset-2 hover:underline">
            Terms of use
          </button>
          <button type="button" className="underline-offset-2 hover:underline">
            Privacy policy
          </button>
        </div>
      </div>
    </div>
  )
}

type SettingRowProps = {
  label: string
  value?: string
  description?: string
  to?: string
}

function SettingRow({ label, value, description, to }: SettingRowProps) {
  const content = (
    <>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-slate-800">{label}</span>
          {value && <span className="text-xs text-slate-500">{value}</span>}
        </div>
        {description && (
          <p className="mt-1 text-[11px] leading-snug text-slate-500">
            {description}
          </p>
        )}
      </div>
      <span className="ml-1 text-slate-300 text-lg">{'›'}</span>
    </>
  )

  if (to) {
    return (
      <Link
        to={to}
        className="flex w-full items-center gap-3 px-4 py-3.5 bg-transparent hover:bg-white/80 transition-colors text-left"
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 px-4 py-3.5 bg-transparent hover:bg-white/80 transition-colors text-left"
    >
      {content}
    </button>
  )
}
