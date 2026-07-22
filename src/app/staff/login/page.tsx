'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/staff/orders'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  setLoading(true)
  setError('')

  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.session) {
    setError('Invalid email or password.')
    setLoading(false)
    return
  }

  await supabase.auth.getSession()

  window.location.href = redirectTo
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-16 lg:py-24">
      <div className="w-full max-w-md px-4">
        <div className="bg-surface border border-border p-8 lg:p-10 animate-slide-up">
          <div className="text-center mb-8">
            <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-2 block">staff access</span>
            <h1 className="font-display text-2xl text-primary-text uppercase tracking-[1px]">sign in</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="redirect" value={redirectTo} />

            {error && (
              <div className="p-4 bg-error/10 border border-error/30 text-error font-body text-sm">
                Invalid email or password.
              </div>
            )}

            <div>
              <label className="font-body text-xs tracking-[1.5px] uppercase text-primary-text/70 mb-2 block" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="staff@mrpizza.pk"
                className="w-full h-12 px-4 font-body text-sm text-primary-text bg-surface-elevated border border-border placeholder:text-primary-text/40 focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label className="font-body text-xs tracking-[1.5px] uppercase text-primary-text/70 mb-2 block" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full h-12 px-4 font-body text-sm text-primary-text bg-surface-elevated border border-border placeholder:text-primary-text/40 focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="font-body text-xs tracking-[1px] text-primary-text/50 text-center">
              Forgot password?{' '}
              <a href="/staff/reset-password" className="text-gold hover:underline">Reset it</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
