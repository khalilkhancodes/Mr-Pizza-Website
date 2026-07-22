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
      {/* Hero Header */}
      <section className="relative min-h-[40vh] lg:h-[90vh] flex items-center justify-center overflow-hidden">
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
          <div className="image-scrim-overlay" />
        </div>
        <div className="container-padding relative z-10 py-16 lg:py-24">
          <div className="max-w-3xl animate-fade-in">
            <span className="font-body label-lg text-gold tracking-widest mb-4 block">SPECIAL OFFERS</span>
            <h1 className="font-display text-headline-lg-mobile lg:text-headline-lg text-cream mb-4">
              Deals & <span className="text-gold">Combos</span>
            </h1>
            <p className="font-body body-lg text-on-surface-variant">
              Curated combinations at exceptional value. Perfect for sharing or treating yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Deal Grid */}
      <section className="section-spacing bg-charcoal">
        <div className="container-padding">
          {deals.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body body-lg text-on-surface-variant">No active deals at the moment. Check back soon!</p>
              <a href="/menu" className="btn-tertiary inline-flex mt-4">View Full Menu <ChevronRightIcon className="w-4 h-4" /></a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* How It Works — Gold Frame */}
      <section className="section-spacing bg-background">
        <div className="container-padding">
          <div className="gold-frame text-center max-w-3xl mx-auto">
            <span className="font-body label-lg text-gold tracking-widest mb-4 block">HOW IT WORKS</span>
            <h2 className="font-display text-headline-lg-mobile lg:text-headline-lg text-cream mb-6">
              Simple Ordering, Maximum Value
            </h2>
            <p className="font-body body-lg text-on-surface-variant mb-8">
              Select a deal, customize if needed, and checkout via WhatsApp. Cash on delivery.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              {[
                { icon: '🛒', title: 'Pick a Deal', desc: 'Choose from our curated combos' },
                { icon: '📱', title: 'Checkout Fast', desc: 'WhatsApp handoff in seconds' },
                { icon: '🍕', title: 'Enjoy', desc: 'Delivered hot, pay on arrival' },
              ].map((step, i) => (
                <div key={i} className="animate-slide-up" style={{ animationDelay: `${(i + 1) * 0.1}s` }}>
                  <div className="text-4xl mb-3">{step.icon}</div>
                  <h3 className="font-display text-headline-sm text-cream mb-2">{step.title}</h3>
                  <p className="font-body body-md text-on-surface-variant">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
