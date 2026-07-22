'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { menuItems } from '@/content/menu';
import { formatPrice } from '@/lib/utils';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import type { CartItem as CartItemType } from '@/types';
import { getOptionDisplayName } from '@/lib/menu-utils';
import { ArrowLeftIcon, ShieldIcon } from '@/components/ui/Icons';
import { div } from 'framer-motion/client';

const TAX_RATE = 0.08;
const DELIVERY_FEE = 0;

const crossSellItems = menuItems.filter(i =>
  ['sp-5', 'brg-5', 'app-2', 'bev-7'].includes(i.id)
).slice(0, 2); // Showing 2 items to match the template scale

export default function CartPage() {
  const router = useRouter();
  const { items, getSubtotal, getItemCount } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  // Hydration Fix: Ensure client is mounted before rendering cart state from local storage
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + DELIVERY_FEE;

  // Protect against hydration mismatch
  if (!isMounted) return null;

  if (itemCount === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16 bg-[var(--color-surface)]">
        <div className="text-center container-padding">
          <h2 className="text-section text-[var(--color-cream)] mb-4">Your cart is empty</h2>
          <p className="text-body-regular mb-8">Add some items before checking out.</p>
          <Link 
            href="/menu" 
            className="btn-interactive bg-[var(--color-gold)] text-[var(--color-on-gold)] text-label-bold px-8 py-4 rounded-[var(--radius-component)] hover:bg-[var(--color-gold-hover)]"
          >
            BROWSE MENU
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)] pt-8 pb-24">
      <div className="container-padding">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Header */}
            <div>
              <h1 className="text-h1 text-[var(--color-cream)] uppercase mt-10 mb-6">YOUR CART</h1>
              <p className="text-label-bold text-[var(--color-on-surface-variant)]">
                {itemCount} ITEM{itemCount !== 1 ? 'S' : ''} SELECTED FOR INDULGENCE
              </p>
            </div>

            {/* Cart Items List */}
            <ul className="space-y-2" role="list" aria-label="Cart items">
              {items.map((item) => (
                <div className='bg-[var(--color-surface)]'>
                  <CartItem key={item.id} item={item} />
                </div>
              ))}
            </ul>

            {/* Cross-sell Section */}
            <div className="pt-8">
              <h3 className="text-label-bold text-[var(--color-cream)] mb-6 tracking-widest">
                COMPLETE THE EXPERIENCE
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {crossSellItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.id}`}
                    className="group"
                  >
                    <div className="relative aspect-[4/3] rounded-[var(--radius-component)] overflow-hidden bg-[var(--color-surface-elevated)] border border-[var(--color-border)] mb-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                    <p className="text-label-bold text-[var(--color-cream)] truncate mb-1">{item.name}</p>
                    <p className="text-body-regular text-[var(--color-gold)] font-bold">{formatPrice(item.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar — Order Summary (Right Column) */}
          <div className="lg:col-span-5    p-3 lg:p-4 lg:mt-36">
            {/* position: sticky added here so it follows the user */}
            <div className="card-premium bg-[var(--color-surface-elevated)] border border-[var(--color-border)] p-8 lg:p-10 sticky top-32">
              <h2 className="text-section text-[32px] text-[var(--color-cream)] mb-8 tracking-wide">
                ORDER SUMMARY
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center text-label-bold text-[var(--color-on-surface-variant)]">
                  <span>SUBTOTAL</span>
                  <span className="text-[var(--color-cream)]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-label-bold text-[var(--color-on-surface-variant)]">
                  <span>TAX (EST.)</span>
                  <span className="text-[var(--color-cream)]">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between items-center text-label-bold text-[var(--color-on-surface-variant)]">
                  <span>DELIVERY</span>
                  <span className="text-[var(--color-cream)]">{DELIVERY_FEE === 0 ? 'FREE' : formatPrice(DELIVERY_FEE)}</span>
                </div>
              </div>

              <div className="border-t border-[var(--color-border)] pt-8 mb-10 flex justify-between items-center">
                <span className="text-label-bold text-[var(--color-cream)] text-[16px]">TOTAL</span>
                <span className="text-product text-[var(--color-gold)] text-[32px]">{formatPrice(total)}</span>
              </div>

              <Link 
                href={`/checkout?total=${total}`} 
                className="btn-interactive w-full bg-[var(--color-gold)] text-[var(--color-on-gold)] text-label-bold px-6 py-4 rounded-[var(--radius-component)] hover:bg-[var(--color-cream)] text-center flex justify-center mb-6 tracking-widest"
              >
                PROCEED TO CHECKOUT
              </Link>
              
              <div className="flex items-center justify-center gap-2 text-[var(--color-on-surface-variant)] text-label-bold text-[10px]">
                <ShieldIcon className="w-4 h-4" />
                <span>SECURE TRANSACTIONS ONLY</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// Cart Item Component
// ==========================================
function CartItem({ item }: { item: CartItemType }) {
  const { removeItem, updateQuantity } = useCartStore();

  return (
    <li className="p-4 sm:p-6 flex flex-col sm:flex-row gap-5 sm:gap-6 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-[var(--radius-component)]">
  
  {/* Product Image - Strict Square exactly like the template */}
  <div className="relative w-full sm:w-[120px] h-[120px] flex-shrink-0 rounded-[var(--radius-component)] overflow-hidden bg-[#131313]">
    <Image
      src={item.image}
      alt={item.name}
      fill
      className="object-cover"
      sizes="120px"
    />
  </div>

  {/* Content Wrapper */}
  <div className="flex-1 flex flex-row justify-between sm:min-h-[120px]">
    
    {/* Middle Column: Details & Quantity */}
    <div className="flex flex-col justify-between">
      
      <div>
        <h3 className="font-body font-bold text-[20px] sm:text-[22px] text-[var(--color-cream)] uppercase tracking-wide mb-1.5">
          {item.name}
        </h3>
        
        {/* Inline Subtitle: Size and Notes separated by a bullet */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-[var(--color-on-surface-variant)] uppercase tracking-widest">
          {Object.entries(item.selectedOptions).length > 0 && (
            <span>{getOptionDisplayName(item.menuItemId, item.selectedOptions)}</span>
          )}
          
          {Object.entries(item.selectedOptions).length > 0 && item.note && (
            <span className="text-[var(--color-border)] mt-[-2px]">▪</span>
          )}
          
          {item.note && (
            <span className="text-[var(--color-gold)]">{item.note}</span>
          )}
        </div>
      </div>
      
      {/* Quantity Selector aligned to the bottom left of this column */}
      <div className="w-28 mt-6 sm:mt-0">
        <QuantitySelector
          value={item.quantity}
          onChange={(qty) => updateQuantity(item.id, qty)}
          max={20}
          aria-label={`${item.name} quantity`}
        />
      </div>

    </div>

    {/* Right Column: Price & Remove Action */}
    <div className="flex flex-col items-end justify-between ml-4">
      
      <span className="font-body font-bold text-[20px] sm:text-[24px] text-[var(--color-gold)] tracking-wide">
        {formatPrice(item.price * item.quantity)}
      </span>
      
      <button
        onClick={() => removeItem(item.id)}
        className="text-[11px] font-bold text-[#FFB4AB] hover:text-[#ff9b8f] uppercase tracking-widest transition-colors pb-1 sm:pb-2"
        aria-label={`Remove ${item.name} from cart`}
      >
        REMOVE
      </button>

    </div>
  </div>
</li>
  );
}