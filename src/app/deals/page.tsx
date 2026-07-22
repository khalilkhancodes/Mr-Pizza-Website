import Image from 'next/image';
import { getActiveDeals, menuItems } from '@/content/menu';
import { DealCard } from '@/components/deals/DealCard';
import { ChevronRightIcon } from '@/components/ui/Icons';
import { MenuItem } from '@/types';

export const metadata = {
  title: 'Deals & Offers',
  description: 'Discover our best value meal deals and combos. Save on signature pizzas, gourmet burgers, and family feasts.',
};

export default function DealsPage() {
  const deals = getActiveDeals();

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[50vh] lg:min-h-[60vh] flex items-center justify-center overflow-hidden bg-background border-b border-border">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Deal.png"
            alt="Mr. Pizza deals and combos"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>
        <div className="container-padding relative z-10 py-20 lg:py-28 w-full">
          <div className="max-w-2xl">
            <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-4 block">special offers</span>
            <h1 className="font-display text-h1 text-primary-text mb-6">
              deals &amp; <span className="text-gold">combos</span>
            </h1>
            <p className="font-body text-base lg:text-lg text-primary-text/70">
              Curated combinations at exceptional value. Perfect for sharing or treating yourself.
            </p>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-background">
        <div className="container-padding">
          {deals.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-base text-primary-text/60">No active deals at the moment. Check back soon!</p>
              <a href="/menu" className="btn-tertiary inline-flex mt-4">View Full Menu <ChevronRightIcon className="w-4 h-4" /></a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
              {deals.map((deal) => {
                const dealItems = deal.items.map(di => {
                  const item = menuItems.find(mi => mi.id === di.menuItemId);
                  return { ...di, item: item || null };
                });
                return <DealCard key={deal.id} deal={deal} dealItems={dealItems} />;
              })}
            </div>
          )}
        </div>
      </section>

      <section className="section-spacing bg-surface border-y border-border">
        <div className="container-padding">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-4 block">how it works</span>
            <h2 className="font-display text-h2 text-primary-text mb-6">
              simple ordering, maximum value
            </h2>
            <p className="font-body text-base text-primary-text/60 mb-10">
              Select a deal, customize if needed, and checkout via WhatsApp. Cash on delivery.
            </p>
            <div className="grid sm:grid-cols-3 gap-8 text-left">
              {[
                { icon: '🛒', title: 'pick a deal', desc: 'Choose from our curated combos' },
                { icon: '📱', title: 'checkout fast', desc: 'WhatsApp handoff in seconds' },
                { icon: '🍕', title: 'enjoy', desc: 'Delivered hot, pay on arrival' },
              ].map((step, i) => (
                <div key={i} className="animate-slide-up" style={{ animationDelay: `${(i + 1) * 0.1}s` }}>
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="font-display text-xl text-primary-text mb-2 uppercase tracking-[1px]">{step.title}</h3>
                  <p className="font-body text-sm text-primary-text/60">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
