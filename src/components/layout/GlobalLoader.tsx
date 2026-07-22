'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function GlobalLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [prevPath, setPrevPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentPath = pathname + searchParams.toString();
    if (prevPath && prevPath !== currentPath) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 400);
      return () => clearTimeout(timer);
    }
    setPrevPath(currentPath);
  }, [pathname, searchParams, prevPath]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-gold z-[600] pointer-events-none"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page loading"
    >
      <div className="h-full w-full bg-gold origin-left animate-[progress-bar_1s_ease-in-out_infinite]" />
    </div>
  );
}
