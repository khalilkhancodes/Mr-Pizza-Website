import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: { path?: string; maxAge?: number; domain?: string; secure?: boolean; httpOnly?: boolean; sameSite?: 'lax' | 'strict' | 'none' } }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user }, error } = await supabase.auth.getUser()

  // temp:
    console.log('[middleware]', request.nextUrl.pathname,
    '| cookies seen:', request.cookies.getAll().map(c => c.name),
    '| user:', user?.email ?? null,
    '| error:', error?.message ?? null)
    console.log('[middleware] raw cookie value length:',
  request.cookies.get('sb-dtbfsjaqjlvupkvraatr-auth-token')?.value?.length,
  '| first 40 chars:',
  request.cookies.get('sb-dtbfsjaqjlvupkvraatr-auth-token')?.value?.slice(0, 40))

  const isStaffRoute = request.nextUrl.pathname.startsWith('/staff') &&
    !request.nextUrl.pathname.startsWith('/staff/login')

  if (!user && isStaffRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/staff/login'
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
