'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { loginRateLimiter } from '@/lib/rate-limit';

export async function staffLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const redirectTo = (formData.get('redirect') as string) || '/staff/orders';

  const reqHeaders = await headers();
  const ip = reqHeaders.get('x-forwarded-for') || 'unknown';
  const ua = reqHeaders.get('user-agent') || 'unknown';
  const identifier = `${ip}:${ua.slice(0, 50)}`;
  const rateLimit = await loginRateLimiter(identifier);
  if (rateLimit.limited) {
    throw new Error('Too many login attempts. Please try again later.');
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error('Invalid email or password.');
  }

  redirect(redirectTo);
}
