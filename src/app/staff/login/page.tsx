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

  // Explicitly confirm the session is persisted before navigating away —
  // closes the race between the cookie write and the next request.
  await supabase.auth.getSession()

  window.location.href = redirectTo
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-xl lg:py-[120px]">

        <div className="card-elevated p-6 lg:p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="redirect" value={redirectTo} />

            {error && (
              <div className="p-4 bg-red-900/30 border border-red-900/50 rounded-soft-sm text-red-300 font-body body-md">
                Invalid email or password.
              </div>
            )}

            <div>
              <label className="font-body label-md text-cream mb-2 block" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="staff@mrpizza.pk"
                  className="w-full h-12 pl-12 pr-4 p-20 font-body body-md text-cream bg-surface-elevated/50 border border-border rounded-soft-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-fast"
                />
              </div>
            </div>

            <div>
              <label className="font-body label-md text-cream mb-2 block" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full h-12 pl-12 pr-4 p-20 bg-black font-body body-md text-cream bg-surface-elevated/50 border border-border rounded-soft-sm placeholder:text-on-surface-variant/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-fast"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 font-body label-lg text-cream bg-gold hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-soft-sm transition-all duration-fast"
            >
              Sign In
            </button>

            <p className="font-body label-md text-on-surface-variant/60 text-center">
              Forgot password?{' '}
              <a href="/staff/reset-password" className="text-gold hover:underline">Reset it</a>
            </p>
          </form>
      </div>
    </div>
  )
}