'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { MenuCard } from '@/components/ui/Card';
import { useCartStore } from '@/store/cart';
import { getFeaturedItems, getPopularItems } from '@/content/menu';
import { useToast } from '@/components/ui/Toaster';

export default function HomePage() {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { success } = useToast();

  const handleAddToCart = (item: { id: string; name: string; price: number; image: string }) => {
    addItem(item as any);
    success('Added! ✓', `${item.name} added to cart.`);
  };

  const featuredItems = getFeaturedItems().slice(0, 4); // Adjusted for grid sizing
  const popularItems = getPopularItems().slice(0, 4);

  return (
    <>
      <section className="relative w-full min-h-[600px] h-[85vh] lg:h-[90vh] bg-[var(--color-surface)] overflow-hidden flex ">

      <div className="container-padding relative z-5 w-full flex flex-col mt-10">
        
        {/* Massive Background Typography */}
        <div className="relative z-0 flex flex-col items-center leading-[0.85] [font-family:var(--font-bricolage)] font-extrabold uppercase tracking-tighter">
          
          <span className="text-[100px] md:text-[120px] lg:text-[100px] text-[var(--color-cream)]">
            SAVOR
          </span>
          
          <span className="text-[100px] md:text-[150px] lg:text-[100px] text-[var(--color-cream)]">
            THE
          </span>
          
          {/* 
            Skewed Highlight Box 
            Replicates the offset rectangular background from the reference 
          */}
          <div className="bg-[var(--color-gold)] px-8 md:px-12 mt-2 -rotate-3 transform shadow-2xl">
            <span className="text-[100px] md:text-[150px] lg:text-[120px] text-[var(--color-surface)]">
              MELT
            </span>
          </div>

        </div>

        {/* 
          Floating Transparent Image 
          Positioned absolutely to overlap the bottom half of the typography 
        */}

      </div>
    </section>

      {/* Featured Specialties */}
      <section className="bg-background pt-32 lg:pt-40 pb-20">
        <div className="container-padding">
          <div className="mb-10">
            <h2 className="text-h2 text-cream mb-6">Featured Specialties</h2>
            <p className="text-body-large">Hand-selected favorites from our kitchen</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item, i) => (
<MenuCard
              key={item.id}
              item={{ ...item, image: i < 4 ? '/images/Menu_Items.png' : '/images/Deal.png' }}
              variant="menu"
            />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-background pb-20">
        <div className="container-padding">
          <div className="mb-10">
            <h2 className="text-h2 text-cream mb-6">Best Sellers</h2>
            <p className="text-body-large">Customer favorites, ordered again and again</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item, i) => (
<MenuCard
              key={item.id}
              item={{ ...item, image: i < 2 ? '/images/Menu_Items.png' : '/images/Deal.png' }}
              variant="menu"
            />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}