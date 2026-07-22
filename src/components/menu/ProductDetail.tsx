'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { MenuItem } from '@/types';
import { useToast } from '@/components/ui/Toaster';
import { menuItems } from '@/content/menu';

export function ProductDetail({ item }: { item: MenuItem }) {
  const { addItem } = useCartStore();
  const { success } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    item.options?.forEach(opt => {
      if (opt.required) {
        const def = opt.choices.find(c => c.default);
        if (def) initial[opt.id] = def.id;
      }
    });
    return initial;
  });
  
  const [addonChecked, setAddonChecked] = useState<Record<string, boolean>>({});
  const [fallbackMods, setFallbackMods] = useState({ cheese: false, meat: false, toppings: false });

  const sizeOptions = item.options?.filter(o => o.type === 'size') ?? [];
  const addonOptions = item.options?.filter(o => o.type !== 'size') ?? [];

  const basePrice = item.price + Object.entries(selectedOptions).reduce((sum, [optId, choiceId]) => {
    const opt = item.options?.find(o => o.id === optId);
    const choice = opt?.choices.find(c => c.id === choiceId);
    return sum + (choice?.priceDelta ?? 0);
  }, 0);

  const addonsTotal = Object.entries(addonChecked).reduce((sum, [choiceId, checked]) => {
    if (!checked) return sum;
    for (const opt of addonOptions) {
      const ch = opt.choices.find(c => c.id === choiceId);
      if (ch) return sum + ch.priceDelta;
    }
    return sum;
  }, 0);

  const fallbackTotal = (fallbackMods.cheese ? 100 : 0) + (fallbackMods.meat ? 100 : 0) + (fallbackMods.toppings ? 100 : 0);
  const totalPrice = (basePrice + addonsTotal + fallbackTotal) * quantity;

  const handleSizeChange = (optionId: string, choiceId: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionId]: choiceId }));
  };

  const handleAddonToggle = (choiceId: string) => {
    setAddonChecked(prev => ({ ...prev, [choiceId]: !prev[choiceId] }));
  };

  const handleAddToCart = () => {
    const allOptions = { ...selectedOptions };
    addonOptions.forEach(opt => {
      opt.choices.forEach(ch => {
        if (addonChecked[ch.id]) allOptions[opt.id] = ch.id;
      });
    });
    
    let notes = [];
    if (fallbackMods.cheese) notes.push("Extra Cheese");
    if (fallbackMods.meat) notes.push("Extra Meat");
    if (fallbackMods.toppings) notes.push("Extra Toppings");

    addItem({ ...item, note: notes.join(", ") } as any, quantity, allOptions);
    
    success('Added! ✓', `${quantity}x ${item.name} added to your cart.`);
  };

  const ingredients = item.ingredients ?? [];
  const relatedItems = (item.relatedItems ?? [])
    .map(id => menuItems.find(mi => mi.id === id))
    .filter((mi): mi is MenuItem => mi !== null);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative w-full h-[55vh] lg:h-[70vh]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
      </section>

      <section className="relative z-10 -mt-32 pb-24">
        <div className="container-padding">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-4 block">our menu</span>
            <h1 className="font-display text-h2 lg:text-h1 text-primary-text mb-6">{item.name}</h1>
            <p className="font-body text-base text-primary-text/60 leading-relaxed px-4">{item.description}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Size Options */}
            {sizeOptions.length > 0 && (
              <div className="bg-surface border border-border p-8 lg:p-10">
                <h3 className="font-display text-xl text-primary-text mb-8 uppercase tracking-[1px]">size</h3>
                <div className="space-y-4">
                  {sizeOptions.map(opt => (
                    opt.choices.map(ch => {
                      const isSelected = selectedOptions[opt.id] === ch.id;
                      return (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => handleSizeChange(opt.id, ch.id)}
                          className={`w-full flex items-center justify-between p-4 border transition-all duration-300 ${
                            isSelected ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/30'
                          }`}
                        >
                          <span className="font-body text-sm text-primary-text">{ch.name}</span>
                          <span className="font-display text-base text-gold">
                            {formatPrice(item.price + ch.priceDelta)}
                          </span>
                        </button>
                      );
                    })
                  ))}
                </div>
              </div>
            )}

            {/* Personalize */}
            <div className="bg-surface border border-border p-8 lg:p-10 flex flex-col lg:col-span-1">
              <h3 className="font-display text-xl text-primary-text mb-8 uppercase tracking-[1px]">personalize</h3>
              <div className="flex-1 space-y-4">
                {addonOptions.length > 0 ? (
                  addonOptions.map(opt => (
                    opt.choices.map(ch => (
                      <label key={ch.id} className="flex items-center gap-4 p-4 border border-border hover:border-gold/30 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!addonChecked[ch.id]}
                          onChange={() => handleAddonToggle(ch.id)}
                          className="w-4 h-4 accent-gold"
                        />
                        <span className="flex-1 font-body text-sm text-primary-text">{ch.name}</span>
                        {ch.priceDelta > 0 && (
                          <span className="text-gold font-bold text-sm">+{formatPrice(ch.priceDelta)}</span>
                        )}
                      </label>
                    ))
                  ))
                ) : (
                  <div className="space-y-4">
                    {[
                      { key: 'cheese' as const, label: 'Extra Cheese' },
                      { key: 'meat' as const, label: 'Extra Meat' },
                      { key: 'toppings' as const, label: 'Extra Toppings' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-4 p-4 border border-border hover:border-gold/30 cursor-pointer">
                        <input type="checkbox" checked={fallbackMods[key]} onChange={() => setFallbackMods(p => ({...p, [key]: !p[key]}))} className="w-4 h-4 accent-gold" />
                        <span className="flex-1 font-body text-sm text-primary-text">{label}</span>
                        <span className="text-gold font-bold text-sm">+{formatPrice(100)}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-8 mt-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs tracking-[1.5px] uppercase text-primary-text/60">quantity</span>
                  <QuantitySelector value={quantity} onChange={setQuantity} min={1} max={20} />
                </div>
                <Button variant="default" size="lg" fullWidth onClick={handleAddToCart}>
                  Add to Cart &mdash; {formatPrice(totalPrice)}
                </Button>
              </div>
            </div>

            {/* Ingredients */}
            {ingredients.length > 0 && (
              <div className="bg-surface border border-border p-8 lg:p-10">
                <h3 className="font-display text-xl text-primary-text mb-8 uppercase tracking-[1px]">ingredients</h3>
                <ul className="space-y-4">
                  {ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <span className="w-2 h-2 bg-gold flex-shrink-0" />
                      <span className="font-body text-sm text-primary-text/70">{ing}</span>
                    </li>
                  ))}
                </ul>

                {relatedItems.length > 0 && (
                  <div className="mt-10 pt-8 border-t border-border">
                    <h3 className="font-display text-lg text-primary-text mb-6 uppercase tracking-[1px]">you may also like</h3>
                    <ul className="space-y-4">
                      {relatedItems.map((ri) => (
                        <li key={ri.id} className="flex items-center justify-between">
                          <span className="font-body text-sm text-primary-text">{ri.name}</span>
                          <span className="font-display text-base text-gold">{formatPrice(ri.price)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
