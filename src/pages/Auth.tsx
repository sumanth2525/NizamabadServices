import { Link, useLocation } from 'react-router-dom'

type AuthMode = 'login' | 'signup'

export default function Auth() {
  const location = useLocation()
  const mode: AuthMode = location.pathname === '/signup' ? 'signup' : 'login'

  const isLogin = mode === 'login'

  return (
    <div className="page-container max-w-md">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {isLogin
            ? 'Sign in to manage your requests and favourites.'
            : 'Sign up to save your details and track bookings.'}
        </p>
      </div>

      <div className="card p-5 space-y-4">
        {!isLogin && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-600">Full name</label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-sm input-focus"
              placeholder="Your name"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600">Email</label>
          <input
            type="email"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-sm input-focus"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600">{isLogin ? 'Password' : 'Create password'}</label>
          <input
            type="password"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-sm input-focus"
            placeholder="••••••••"
          />
        </div>

        {!isLogin && (
          <p className="text-[11px] text-slate-500">
            By continuing you agree to our <span className="font-medium text-slate-700">Terms</span> and{' '}
            <span className="font-medium text-slate-700">Privacy Policy</span>.
          </p>
        )}

        <button type="button" className="btn-primary mt-2">
          {isLogin ? 'Login' : 'Sign up'}
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-slate-500">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <Link
          to={isLogin ? '/signup' : '/login'}
          className="font-semibold text-[var(--color-brand)] hover:underline"
        >
          {isLogin ? 'Sign up' : 'Login'}
        </Link>
      </p>
    </div>
  )
}

