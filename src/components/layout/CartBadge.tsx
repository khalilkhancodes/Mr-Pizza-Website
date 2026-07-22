'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cart';
import { cn } from '@/lib/utils';

export function CartBadge() {
  const [isMounted, setIsMounted] = useState(false);
  const { getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <span className={cn(
        'absolute -top-1 -right-1 min-w-[18px] h-5 bg-gold text-charcoal text-[10px] font-body font-bold rounded-full flex items-center justify-center px-1 opacity-0 pointer-events-none'
      )}>
        0
      </span>
    );
  }

  if (itemCount === 0) {
    return (
      <span className={cn(
        'absolute -top-1 -right-1 min-w-[18px] h-5 bg-gold text-charcoal text-[10px] font-body font-bold rounded-full flex items-center justify-center px-1 opacity-0 pointer-events-none'
      )}>
        0
      </span>
    );
  }

  return (
    <span className={cn(
      'absolute -top-1 -right-1 min-w-[18px] h-5 bg-gold text-charcoal text-[10px] font-body font-bold rounded-full flex items-center justify-center px-1 opacity-100'
    )}>
      {itemCount > 99 ? '99+' : itemCount}
    </span>
  );
}