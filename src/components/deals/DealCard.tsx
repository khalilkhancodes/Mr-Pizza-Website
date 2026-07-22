'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Deal, MenuItem } from '@/types';
import { formatPrice } from '@/lib/utils';

interface DealCardProps {
  deal: Deal;
  dealItems: (Deal['items'][number] & { item: MenuItem | null })[];
}

export function DealCard({ deal, dealItems }: DealCardProps) {
  // Fallback image if deal doesn't have a specific one
  const src = '/images/Deal.png';

  // Format the deal items into a clean, comma-separated sentence 
  // to match the sleek editorial look of the template image.
  const description = dealItems.map(di => {
    const name = di.item ? di.item.name : 'Item';
    const qty = di.quantity > 1 ? `${di.quantity} ` : '';
    const note = di.note ? ` (${di.note})` : '';
    return `${qty}${name}${note}`;
  }).join(', ');

  return (
    <article className="card-premium group flex flex-col h-full bg-[var(--color-surface)] p-2">
      
      {/* Image Container - Aspect 4:3 with Hover Scaling */}
      <div className="relative aspect-[4/3] w-full overflow-hidden shrink-0">
        <Image
          src={src}
          alt={deal.name}
          fill
          className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={85}
        />
        
        {/* Subtle shadow gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Top Right Badge matching the luxury aesthetic */}
        {deal.badge && (
          <span className="absolute top-4 right-4 bg-[#e5b209] border border-[var(--color-gold)] text-label-bold px-3 py-1 rounded-[var(--radius-component)] backdrop-blur-sm z-10 text-[10px] text-[#000000b2] font-bold uppercase">
            {deal.badge}
          </span>
        )}
      </div>

      {/* Content Container */}
      <div className="py-4 px-1 md:py-6 md:px-1 flex flex-col flex-1">
        
        <div className="flex-1">
          <h3 className="text-h4 text-[var(--color-cream)] mb-4 uppercase tracking-wide">
            {deal.name}
          </h3>
          
          <p className="text-h5 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Bottom Row: Price & Button Aligned */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-[var(--color-border)] ">
          {/* Elegant, smaller price display */}
          <span className="text-label-bold text-[var(--color-gold)] text-[16px] flex-1 w-[50%]">
            {formatPrice(deal.price)}
          </span>

          {/* Solid Gold CTA Button */}
          <Link 
            href={`/menu?deal=${deal.id}`}
            className="btn-interactive flex-1 bg-[var(--color-gold)] text-[var(--color-on-gold)] text-label-bold px-6 py-3 rounded-[var(--radius-component)] hover:bg-[var(--color-gold-hover)] transition-colors inline-flex items-center justify-center text-h5"
          >
            ADD TO CART
          </Link>
          
        </div>
      </div>
    </article>
  );
}