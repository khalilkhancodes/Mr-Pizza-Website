'use client';

import Image from 'next/image';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { categories, menuItems, getMenuItemsByCategory } from '@/content/menu';
import { MenuCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SearchIcon } from '@/components/ui/Icons';

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="container-padding py-16"><p className="font-body body-lg text-on-surface-variant animate-pulse">Loading menu...</p></div>}>
      <MenuContent />
    </Suspense>
  );
}

function MenuContent() {
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || categories[0].slug);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = !searchQuery
      || item.name.toLowerCase().includes(searchQuery.toLowerCase())
      || item.description.toLowerCase().includes(searchQuery.toLowerCase())
      || item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative min-h-[40vh] lg:h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Menu_Items.png"
            alt="Mr. Pizza menu"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          <div className="image-scrim-overlay" />
        </div>
        <div className="container-padding relative z-10 py-16 lg:py-28">
          <div className="max-w-3xl animate-fade-in">
            <span className="font-body label-lg text-gold tracking-widest mb-6 lg:mb-16 block">OUR MENU</span>
            <h1 className="font-display text-headline-lg-mobile lg:text-headline-lg text-cream mb-6 lg:mb-8">
              Hand-crafted with <span className="text-gold">Premium Ingredients</span>
            </h1>
            <p className="font-body body-lg text-on-surface-variant leading-relaxed">Explore our full range of signature pizzas, gourmet burgers, and more.</p>
          </div>
        </div>
      </section>

      <div className="container-padding py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0">
            <div className="sticky top-24 lg:top-28 space-y-5">
              <Input
                type="search"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="relative"
                rightIcon={<SearchIcon className="w-5 h-5" />}
              />

              <nav aria-label="Menu categories">
                <ul className="space-y-1.5">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => setActiveCategory(cat.slug)}
                        className={`w-full text-left px-4 py-3 rounded-soft-sm font-body label-md transition-all duration-fast ${
                          activeCategory === cat.slug
                            ? 'bg-gold/10 text-gold border border-gold/30'
                            : 'text-on-surface-variant hover:text-cream hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="float-right text-on-surface-variant/50">
                          {getMenuItemsByCategory(cat.slug).length}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {searchQuery && (
              <div className="mb-6 flex items-center gap-2 font-body label-md text-on-surface-variant">
                <span>Showing {filteredItems.length} results for</span>
                <span className="text-gold">&quot;{searchQuery}&quot;</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-on-surface-variant hover:text-gold transition-colors ml-1"
                >
                  &times;
                </button>
              </div>
            )}

            {filteredItems.length === 0 ? (
              <div className="text-center py-24">
                <SearchIcon className="w-16 h-16 mx-auto text-border mb-4" />
                <h3 className="font-display text-headline-sm text-cream mb-2">No items found</h3>
                <p className="font-body body-md text-on-surface-variant mb-6">
                  Try adjusting your search.
                </p>
                <Button variant="secondary" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {filteredItems.map((item) => (
                  <MenuCard key={item.id} item={item} variant="menu" />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
