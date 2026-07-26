'use client';

import Image from 'next/image';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { categories, menuItems, getMenuItemsByCategory } from '@/content/menu';
import { MenuCard } from '@/components/ui/Card';
import { ScrollChevron } from '@/components/ui/ScrollChevron';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SearchIcon } from '@/components/ui/Icons';

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="container-padding py-16"><p className="font-body text-base text-primary-text/60 animate-pulse">Loading menu...</p></div>}>
      <MenuContent />
    </Suspense>
  );
}

function MenuContent() {
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || categories[0].slug);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const activeCat = categories.find(c => c.slug === activeCategory);
  const heroImage = activeCat?.image || '/assets/Hero/Menu.webp';

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = !searchQuery
      || item.name.toLowerCase().includes(searchQuery.toLowerCase())
      || item.briefDescription.toLowerCase().includes(searchQuery.toLowerCase())
      || item.description.toLowerCase().includes(searchQuery.toLowerCase())
      || item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <section className="relative h-screen min-h-[550px] flex items-center justify-center overflow-hidden bg-background border-b border-border mb-9">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Mr. Pizza menu"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-gradient)] via-[var(--color-gradient)] to-[var(--color-gradient)]" />
        </div>
        <div className="container-padding relative z-10 py-20 lg:py-28 w-full">
          <div className="max-w-2xl">
            <h1 className="font-display text-start text-[80px] lg:text-9xl md:text-hero-title text-primary-text leading-[0.94] -mt-2 mb-4">
              {activeCat?.name || 'SIGNATURE'}
              <br />
              <span className="text-gold">SELECTION</span>
            </h1>
            <p className="font-body text-base lg:text-lg text-primary-text/70 leading-relaxed">
              {activeCat?.description || 'Explore our full range of signature pizzas, gourmet burgers, and more.'}
            </p>
          </div>
        </div>

        <ScrollChevron targetId="menu-content" />
      </section>

      <div id="menu-content" className="container-padding py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <aside className="w-full lg:w-[260px] xl:w-[280px] flex-shrink-0">
            <div className="sticky top-24 lg:top-28 max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-fade">
              <style>{`.scrollbar-fade::-webkit-scrollbar{width:4px}.scrollbar-fade::-webkit-scrollbar-track{background:transparent}.scrollbar-fade::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.3);border-radius:2px}.scrollbar-fade::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,0.5)}`}</style>
              <Input
                type="search"
                placeholder="Search menu..."
                value={searchQuery}
                className='mb-5'
                onChange={(e) => setSearchQuery(e.target.value)}
                rightIcon={<SearchIcon className="w-6 h-6" />}
              />

              <nav aria-label="Menu categories">
                <ul className="space-y-1">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => setActiveCategory(cat.slug)}
                        className={`w-full text-left px-4 py-3 font-body text-xs tracking-[1.5px] uppercase transition-all duration-fast ${
                          activeCategory === cat.slug
                            ? 'text-gold border-l-2 border-gold bg-gold/5'
                            : 'text-primary-text/60 hover:text-primary-text border-l-2 border-transparent hover:border-border'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="float-right text-primary-text/40">
                          {getMenuItemsByCategory(cat.slug).length}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            {searchQuery && (
              <div className="mb-6 flex items-center gap-2 font-body text-xs tracking-[1.5px] uppercase text-primary-text/60">
                <span>Showing {filteredItems.length} results for</span>
                <span className="text-gold">&quot;{searchQuery}&quot;</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-primary-text/60 hover:text-gold transition-colors ml-1"
                >
                  &times;
                </button>
              </div>
            )}

            {filteredItems.length === 0 ? (
              <div className="text-center py-24">
                <SearchIcon className="w-6 h-6 mx-auto text-border mb-6" />
                <h3 className="font-display text-2xl text-primary-text mb-2 uppercase">No items found</h3>
                <p className="font-body text-sm text-primary-text/60 mb-6">
                  Try adjusting your search or category.
                </p>
                <Button variant="outline" onClick={() => { setSearchQuery(''); }}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
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
