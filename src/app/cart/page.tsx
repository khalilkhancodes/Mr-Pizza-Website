"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { menuItems } from "@/content/menu";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/components/ui/Toaster";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import type { CartItem as CartItemType } from "@/types";
import { getOptionDisplayName } from "@/lib/menu-utils";

const DELIVERY_FEE = 0; // Kept for logic, but hidden in UI to match template

const crossSellItems = menuItems
  .filter((i) => ["sp-5", "brg-5", "app-2", "bev-7"].includes(i.id))
  .slice(0, 2);

export default function CartPage() {
  const router = useRouter();
  const { items, getSubtotal, getItemCount, addItem } = useCartStore();
  const { success } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  // Tax logic removed as requested.
  const total = subtotal + DELIVERY_FEE;

  if (!isMounted) return null;

  if (itemCount === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16 bg-[var(--color-surface)]">
        <div className="text-center container-padding">
          <h1 className="font-display text-[80px] lg:text-[130px] text-[var(--color-cream)] mb-4 uppercase tracking-tight">
            Your cart is empty
          </h1>
          <p className="font-body text-[20px] lg:text-[24px] text-[var(--color-on-surface-variant)] mb-14">
            Add some items before checking out.
          </p>
          <Link
            href="/menu"
            className="bg-[var(--color-gold)] text-[#131313] font-body text-[14px] font-bold uppercase tracking-[1px] px-14 py-[16px] rounded-[2px] hover:bg-[var(--color-cream)] transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)] pt-12 pb-24">
      <div className="container-padding">
        {/* Massive Typographic Header exactly matching the template */}
        <div className="my-64">
          <h1 className="font-display text-start text-[80px] lg:text-9xl md:text-hero-title text-primary-text leading-[0.94] -mt-2 mb-4">
            YOUR
            <br />
            <span className="text-gold">CART</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* 1. Main Content: Cart Items */}
          <div className="lg:col-span-8 lg:col-start-1 lg:row-start-1 flex flex-col gap-8">
            <ul
              role="list"
              aria-label="Cart items"
              className="flex flex-col gap-4"
            >
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          </div>

          {/* 2. Order Summary Sidebar */}
          <div className="lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:row-span-2">
            <div className="bg-[var(--color-surface-elevated)] p-8 lg:p-8 sticky top-32 rounded-[var(--radius-component)] border border-[var(--color-border)]">
              <h2 className="font-display text-[26px] text-[var(--color-cream)] uppercase tracking-wide mb-12">
                Order Summary
              </h2>

              {/* Itemized list matching the template image */}
              <div className="space-y-2 mb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start gap-4 border border-[var(--color-border)] p-[8px]"
                  >
                    <span className="font-body text-[14px] text-[var(--color-on-surface-variant)] leading-snug">
                      {item.name}
                    </span>
                    <span className="font-body text-[14px] text-[var(--color-cream)] whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--color-border)] pt-4 mb-8 flex justify-between items-center">
                <span className="font-display text-[20px] text-[var(--color-cream)] uppercase">
                  Total
                </span>
                <span className="font-display text-[32px] text-[var(--color-gold)]">
                  {formatPrice(total)}
                </span>
              </div>

              <Link
                href={`/checkout?total=${total}`}
                className="btn-interactive w-full bg-[var(--color-gold)] text-[#131313] font-body text-[14px] font-bold uppercase tracking-[1px] flex items-center justify-center py-[16px] rounded-[2px] hover:bg-[#ffffff] transition-colors"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-6 text-center">
                <Link
                  href="/menu"
                  className="font-body text-[12px] font-bold uppercase tracking-[1px] text-[var(--color-on-surface-variant)] hover:text-[var(--color-cream)] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Cross-sell Section */}
          <div className="lg:col-span-8 lg:col-start-1 lg:row-start-2 pt-4 lg:pt-0">
            <h3 className="font-display text-[24px] uppercase text-[var(--color-cream)] mb-6 tracking-wider">
              Complete the experience
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {crossSellItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-[var(--radius-component)] overflow-hidden hover:border-[#555555] transition-colors"
                >
                  <Link
                    href={`/product/${item.id}`}
                    className="block"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                  </Link>

                  <div className="p-16">
                    <Link
                      href={`/product/${item.id}`}
                      className="block"
                    >
                      <p className="font-body font-bold text-[16px] text-[var(--color-cream)] truncate mb-1 uppercase group-hover:text-[var(--color-gold)] transition-colors">
                        {item.name}
                      </p>
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-body font-bold text-[14px] text-[var(--color-gold)]">
                        {formatPrice(item.price)}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          addItem(item);
                          success("Added! \u2713", `${item.name} added to cart.`);
                        }}
                        className="border border-[var(--color-border)] text-[var(--color-gold)] font-body text-[11px] font-bold uppercase tracking-[1px] px-3 py-1.5 rounded-[2px] hover:bg-[var(--color-gold)] hover:text-[var(--color-on-gold)] transition-colors"
                      >
                        + ADD
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Cart Item Component (Refactored to match template)
// ==========================================
function CartItem({ item }: { item: CartItemType }) {
  const { removeItem, updateQuantity } = useCartStore();

  return (
    <li className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] p-4 sm:p-5 flex flex-row gap-4 sm:gap-6 rounded-[var(--radius-component)]">
      <div className="relative w-[100px] mr-4 h-full flex-shrink-0 bg-[#131313] rounded-[2px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
        />
      </div>

      {/* Middle Column: Details & Quantity */}
      <div className="flex-1 flex flex-col justify-between py-0.5">
        <div>
          <h3 className="font-body font-bold text-[16px] sm:text-[18px] text-[var(--color-cream)] uppercase tracking-wide leading-tight">
            {item.name}
          </h3>

          <div className="font-body font-bold text-[14px] sm:text-[15px] text-[var(--color-gold)] mt-1">
            {formatPrice(item.price)}
          </div>

          {/* Deal Items List */}
          {item.dealItems && item.dealItems.length > 0 && (
            <div className="flex flex-col gap-0.5 mt-2">
              {item.dealItems.map((di, i) => (
                <span key={i} className="font-body text-[11px] text-[var(--color-on-surface-variant)]">
                  {di.quantity > 1 ? `${di.quantity}x ` : ''}{di.name}
                </span>
              ))}
            </div>
          )}

          {/* Subtitles & Notes */}
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-[var(--color-on-surface-variant)] uppercase tracking-widest mt-1">
            {Object.entries(item.selectedOptions).length > 0 && (
              <span>
                {getOptionDisplayName(item.menuItemId, item.selectedOptions)}
              </span>
            )}
            {item.note && (
              <span className="text-[var(--color-gold)] before:content-['▪'] before:text-[var(--color-border)] before:mr-1.5 before:ml-0.5">
                {item.note}
              </span>
            )}
          </div>
        </div>

        <div className="w-24 mt-4">
          <QuantitySelector
            value={item.quantity}
            onChange={(qty) => updateQuantity(item.id, qty)}
            max={20}
            aria-label={`${item.name} quantity`}
          />
        </div>
      </div>

      {/* Right Column: Trash Icon & Item Total */}
      <div className="flex flex-col items-end justify-between py-0.5 ml-2">
        {/* Subtle Trash Icon matching the template */}
        <button
          onClick={() => removeItem(item.id)}
          className="text-[var(--color-border)] hover:text-[#FFB4AB] transition-colors p-1 -mr-1 -mt-1"
          aria-label={`Remove ${item.name} from cart`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>

        <span className="font-body font-bold text-[16px] sm:text-[20px] text-[var(--color-cream)] leading-none mt-auto">
          {formatPrice(item.price * item.quantity)}
        </span>
      </div>
    </li>
  );
}
