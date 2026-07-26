'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Deal, MenuItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';

interface DealCardProps {
  deal: Deal;
  dealItems: (Deal['items'][number] & { item: MenuItem | null })[];
  variant?: 'vertical' | 'horizontal';
}

export function DealCard({ deal, dealItems, variant = 'vertical' }: DealCardProps) {
  const router = useRouter();
  const { addDeal } = useCartStore();
  const src = deal.image;

  const description = dealItems.map(di => {
    const name = di.item ? di.item.name : 'Item';
    const qty = di.quantity > 1 ? `${di.quantity} ` : '';
    const note = di.note ? ` (${di.note})` : '';
    return `${qty}${name}${note}`;
  }).join(', ');

  const dealItemNames = dealItems.map(di => ({
    name: di.item ? di.item.name : 'Item',
    quantity: di.quantity,
  }));

  const hasDiscount = deal.discount > 0;
  const badgeText = deal.badge || (hasDiscount ? `${deal.discount}% OFF` : null);

  function handleAddDeal() {
    addDeal(deal, dealItemNames);
    router.push('/cart');
  }

  if (variant === 'horizontal') {
    return (
      <button
        onClick={handleAddDeal}
        className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-[var(--radius-component)] group flex flex-row h-full overflow-hidden hover:border-[#555555] transition-all duration-300 text-left w-full"
      >
        <div className="relative w-2/5 sm:w-1/3 shrink-0 overflow-hidden">
          <Image
            src={src}
            alt={deal.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 40vw, 33vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/10" />
        </div>

        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-center">
          {badgeText && (
            <span className="self-start mb-3 bg-[var(--color-gold)] text-[#131313] font-body text-[11px] font-bold uppercase tracking-[1px] px-2 py-1 rounded-[2px]">
              {badgeText}
            </span>
          )}

          <h3 className="font-body text-[18px] sm:text-[20px] font-bold text-[var(--color-cream)] mb-2 uppercase group-hover:text-[var(--color-gold)] transition-colors">
            {deal.name}
          </h3>

          <p className="font-body text-[13px] text-[var(--color-on-surface-variant)] line-clamp-2 mb-4">
            {description}
          </p>

          <div className="flex items-baseline gap-3 mt-auto">
            <span className="font-body text-[20px] font-bold text-[var(--color-gold)] leading-none">
              {formatPrice(deal.price)}
            </span>
            {deal.originalPrice > deal.price && (
              <span className="font-body text-[12px] text-[var(--color-on-surface-variant)] line-through">
                {formatPrice(deal.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </button>
    );
  }

  return (
    <article className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-[var(--radius-component)] group flex flex-col h-full hover:border-[#555555] transition-all duration-300 overflow-hidden">
      <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0">
        <Image
          src={src}
          alt={deal.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/10" />

        {badgeText && (
          <span className="absolute top-4 right-4 bg-[var(--color-gold)] text-[#131313] font-body text-[11px] font-bold uppercase tracking-[1px] px-3 py-1.5 rounded-[2px] z-10">
            {badgeText}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-body text-[20px] font-bold text-[var(--color-cream)] mb-2 uppercase">
            {deal.name}
          </h3>

          <p className="font-body text-[13px] text-[var(--color-on-surface-variant)] line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-end justify-between mt-6 pt-1">
          <div className="flex items-baseline gap-2">
            <span className="font-body text-[22px] font-bold text-[var(--color-gold)] leading-none">
              {formatPrice(deal.price)}
            </span>
            {deal.originalPrice > deal.price && (
              <span className="font-body text-[12px] text-[var(--color-on-surface-variant)] line-through">
                {formatPrice(deal.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddDeal}
            className="bg-[var(--color-gold)] text-[#131313] font-body text-[12px] font-bold uppercase tracking-[1px] px-6 py-2.5 rounded-[2px] hover:bg-[var(--color-gold-hover)] transition-colors"
          >
            ORDER NOW
          </button>
        </div>
      </div>
    </article>
  );
}
