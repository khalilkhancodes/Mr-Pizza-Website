'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function ToastNotification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);

  const message = searchParams.get('message');
  const error = searchParams.get('error');

  useEffect(() => {
    if (message || error) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        const params = new URLSearchParams(searchParams.toString());
        params.delete('message');
        params.delete('error');
        const query = params.toString();
        router.replace(query ? `/staff/orders?${query}` : '/staff/orders');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error, router, searchParams]);

  if (!visible || (!message && !error)) return null;

  return (
    <div className="fixed bottom-24 left-0 z-50 flex items-center p-4 pr-6 bg-[#131313] border border-[#333] border-l-4 shadow-2xl rounded-r-[4px] animate-[slideInRight_0.4s_ease-out_forwards]"
      style={{ borderLeftColor: error ? '#ef4444' : 'var(--color-gold)' }}>
      {error ? (
        <svg className="w-6 h-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      ) : (
        <svg className="w-6 h-6 text-[var(--color-gold)] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      )}
      <div>
        <h4 className="font-display text-[16px] text-white uppercase tracking-wider">{error ? 'Action Failed' : 'System Update'}</h4>
        <p className="font-body text-[12px] text-[#888]">{error || message}</p>
      </div>
    </div>
  );
}
