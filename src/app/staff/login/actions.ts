'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const redirectTo = (formData.get('redirect') as string) || '/staff/orders'

  console.log('[login action] attempting login for:', email)

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  console.log('[login action] result — user:', data?.user?.email ?? null, '| session:', !!data?.session, '| error:', error?.message ?? null)

  if (error) {
    redirect(`/staff/login?error=invalid_credentials&redirect=${encodeURIComponent(redirectTo)}`)
  }

  redirect(redirectTo)
}