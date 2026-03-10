import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div className="page-container max-w-md">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Account</h2>
        <p className="mt-1 text-sm text-slate-500">
          Login or create an account to access your services.
        </p>
      </div>

      <div className="space-y-3">
        <Link
          to="/login"
          className="flex w-full items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[var(--color-brand)] text-white font-semibold text-base hover:bg-[var(--color-brand-dark)] transition-colors"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="flex w-full items-center justify-center gap-2 py-4 px-6 rounded-2xl border-2 border-[var(--color-brand)] text-[var(--color-brand)] font-semibold text-base hover:bg-[var(--color-brand)]/10 transition-colors"
        >
          Create account
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
        <a href="#" className="underline-offset-2 hover:underline">Terms of use</a>
        <a href="#" className="underline-offset-2 hover:underline">Privacy policy</a>
      </div>
    </div>
  )
}
