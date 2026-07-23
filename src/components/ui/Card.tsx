'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MenuItem } from '@/types';
import { formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { useToast } from '@/components/ui/Toaster';

interface MenuCardProps {
  item: MenuItem;
  variant?: 'menu' | 'deal';
  className?: string;
}

export function MenuCard({ item, variant = 'menu', className }: MenuCardProps) {
  const { addItem } = useCartStore();
  const { success } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(item as any);
    success("Added! ✓", `${item.name} added to cart.`);
  };
  const isDeal = variant === 'deal';

  let priceDisplay = formatPrice(item.price);
  const sizeOption = item.options?.find(o => o.type === 'size');

  if (sizeOption && sizeOption.choices.length > 0) {
    const smallest = sizeOption.choices[0];
    const smallestPrice = item.price + smallest.priceDelta;
    priceDisplay = `${formatPrice(smallestPrice)} (${smallest.name.toLowerCase()})`;
  }

  return (
    <article className={cn(
      'bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-[var(--radius-component)] group flex flex-col overflow-hidden transition-all duration-300 hover:border-[#555555]',
      variant === 'deal' && 'border-[var(--color-gold)]',
      className
    )}>
      
      {/* Image Section with Fade Overlay */}
      <Link href={`/product/${item.id}`} className="relative aspect-[4/3] w-full overflow-hidden block">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Dark gradient fade over the image mapping to the second image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/90 via-[#131313]/30 to-[#131313]/30 pointer-events-none" />

        {/* Badge - Top Left Solid Gold */}
        {(item.popular || item.featured) && (
          <span className="absolute top-3 left-3 bg-[var(--color-gold)] text-[var(--color-on-gold)] text-[10px] font-bold uppercase tracking-widest px-2 py-1 z-10 rounded-[2px]">
            {item.featured ? 'Featured' : 'Popular'}
          </span>
        )}
      </Link>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <Link href={`/product/${item.id}`}>
            {/* Standard case sans-serif title as per second image */}
            <h3 className="font-body text-[18px] font-bold text-[var(--color-cream)] mb-2 transition-colors group-hover:text-[var(--color-gold)]">
              {item.name}
            </h3>
          </Link>
          <p className="font-body text-[14px] text-[var(--color-on-surface-variant)] leading-relaxed line-clamp-2">
            {item.briefDescription}
          </p>
        </div>

        {/* Bottom Row - Price & Action */}
        <div className="flex items-center justify-between mt-5 pt-1">
          
          <span className="font-body text-[16px] font-bold text-[var(--color-gold)]">
            {priceDisplay}
          </span>

          {/* Action Box styled as the '+ ADD' button from the template */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="border border-[var(--color-border)] text-[var(--color-gold)] font-body text-[11px] font-bold uppercase tracking-[1px] px-3 py-1.5 rounded-[2px] hover:bg-[var(--color-gold)] hover:text-[var(--color-on-gold)] transition-colors"
          >
            {isDeal ? 'ORDER NOW' : '+ ADD'}
          </button>
          
        </div>
      </div>
    </article>
  );
}