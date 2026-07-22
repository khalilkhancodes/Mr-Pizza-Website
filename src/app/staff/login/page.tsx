import { login } from './actions'
import { ShieldIcon, UserIcon, LockIcon } from '@/components/ui/Icons'

export default async function StaffLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-xl lg:py-[120px]">
      <div className="container-padding w-full max-w-md">
        <div className="text-center mb-10 animate-fade-in">
          <ShieldIcon className="w-12 h-12 mx-auto text-gold mb-4" />
          <h1 className="font-display text-headline-lg text-cream mb-2">Staff Login</h1>
          <p className="font-body body-md text-on-surface-variant">Secure access to order management</p>
        </div>

        <div className="card-elevated p-6 lg:p-8 animate-slide-up">
          <form action={login} className="space-y-6">
            <input type="hidden" name="redirect" value={params.redirect ?? '/staff/orders'} />

            {params.error && (
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
                  <UserIcon className="w-5 h-5 text-on-surface-variant" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
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
                  <LockIcon className="w-5 h-5 text-on-surface-variant" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
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

          <div className="mt-8 pt-6 border-t border-border">
            <div className="space-y-3 text-left">
              <p className="font-body label-md text-cream">Demo Credentials</p>
              <div className="font-body body-md text-on-surface-variant/70 space-y-1">
                <p>Email: staff@mrpizza.pk</p>
                <p>Password: MrPizza2024!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
