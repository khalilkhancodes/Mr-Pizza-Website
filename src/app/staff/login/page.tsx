'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient as createSupabaseClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toaster';
import { LockIcon, EyeIcon, EyeOffIcon, LoaderIcon, ShieldIcon, UserIcon } from '@/components/ui/Icons';

export default function StaffLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="font-body body-lg text-on-surface-variant animate-pulse">Loading...</p></div>}>
      <StaffLoginContent />
    </Suspense>
  );
}

function StaffLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/staff/orders';
  const { error: toastError, success } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const supabase = createSupabaseClient();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrors({ form: 'Invalid email or password' });
        } else {
          throw error;
        }
        return;
      }

      success('Welcome back!', 'You are now signed in.');
      router.push(redirectTo);
      router.refresh();
    } catch {
      toastError('Login Failed', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-xl lg:py-[120px]">
      <div className="container-padding w-full max-w-md">
        <div className="text-center mb-10 animate-fade-in">
          <ShieldIcon className="w-12 h-12 mx-auto text-gold mb-4" />
          <h1 className="font-display text-headline-lg text-cream mb-2">Staff Login</h1>
          <p className="font-body body-md text-on-surface-variant">Secure access to order management</p>
        </div>

        <div className="card-elevated p-6 lg:p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {errors.form && (
              <div className="p-4 bg-red-900/30 border border-red-900/50 rounded-soft-sm text-red-300 font-body body-md">
                {errors.form}
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: '' })); }}
              error={errors.email}
              placeholder="staff@mrpizza.pk"
              required
              disabled={isLoading}
              leftIcon={<UserIcon className="w-5 h-5" />}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: '' })); }}
                error={errors.password}
                placeholder="Enter your password"
                required
                disabled={isLoading}
                leftIcon={<LockIcon className="w-5 h-5" />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-on-surface-variant hover:text-cream transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              type="submit"
            >
              <LoaderIcon className="w-5 h-5" />
              Sign In
            </Button>

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
  );
}