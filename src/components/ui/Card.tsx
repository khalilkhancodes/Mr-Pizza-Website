'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MenuItem } from '@/types';
import { formatPrice, cn } from '@/lib/utils';

interface MenuCardProps {
  item: MenuItem;
  variant?: 'menu' | 'deal'; // Allows switching between Menu and Deal styles
  className?: string;
}

export function MenuCard({ item, variant = 'menu', className }: MenuCardProps) {
  const isDeal = variant === 'deal';

  // Format the price string (e.g., "Rs. 700 (small)")
  let priceDisplay = formatPrice(item.price);
  const sizeOption = item.options?.find(o => o.type === 'size');
  
  if (sizeOption && sizeOption.choices.length > 0) {
    const smallest = sizeOption.choices[0];
    const smallestPrice = item.price + smallest.priceDelta;
    priceDisplay = `${formatPrice(smallestPrice)} (${smallest.name.toLowerCase()})`;
  }

  return (
    <article className={cn(
      'card-menu group',
      variant === 'deal' && 'card-gold-frame',
    )}>
      <Link href={`/product/${item.id}`} className="relative aspect-[4/3] w-full overflow-hidden block">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>

      <div className="p-2 lg:p-[20px] flex flex-col flex-1">
        <div className="flex-1">
          <Link href={`/product/${item.id}`}>
            <h3 className="font-display text-[18px] lg:text-[20px] leading-[1.3] font-semibold text-[var(--color-cream)] mb-3 transition-colors group-hover:text-[var(--color-gold)] uppercase tracking-wide">
              {item.name}
            </h3>
          </Link>
          <p className="text-body-sm line-clamp-2">
            {item.description}
          </p>
        </div>
        
        <div className="flex items-end justify-between mt-4">          
          <span className="font-display text-h5 text-gold font-bold">
            {priceDisplay}
          </span>

          {isDeal ? (
            <Link 
              href={`/product/${item.id}`}
              className="btn-primary"
            >
              Order Now
            </Link>
          ) : (
            <Link 
              href={`/product/${item.id}`}
              className="font-body text-h5 font-bold uppercase tracking-widest text-[var(--color-gold)] flex items-center gap-2 hover:text-[var(--color-cream)] transition-colors justify-self-end"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}