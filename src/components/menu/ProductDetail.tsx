'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { MenuItem } from '@/types';
import { useToast } from '@/components/ui/Toaster';

const metaTags = new Set([
  'signature', 'premium', 'popular', 'classic', 'special', 'spicy', 'featured',
  'stuffer', 'sandwich', 'loaded', 'mocktail', 'refreshing', 'vegetarian',
]);

function getIngredients(item: MenuItem): string[] {
  return item.tags
    .filter(t => !metaTags.has(t))
    .map(t => t.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
}

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
  
  // Dynamic Option State
  const [addonChecked, setAddonChecked] = useState<Record<string, boolean>>({});
  
  // Fallback Checkbox State for items without DB modifiers
  const [fallbackMods, setFallbackMods] = useState({ cheese: false, meat: false, toppings: false });

  const sizeOptions = item.options?.filter(o => o.type === 'size') ?? [];
  const addonOptions = item.options?.filter(o => o.type !== 'size') ?? [];

  const basePrice = item.price + Object.entries(selectedOptions).reduce((sum, [optId, choiceId]) => {
    const opt = item.options?.find(o => o.id === optId);
    const choice = opt?.choices.find(c => c.id === choiceId);
    return sum + (choice?.priceDelta ?? 0);
  }, 0);

  // Calculate Addons from DB
  const addonsTotal = Object.entries(addonChecked).reduce((sum, [choiceId, checked]) => {
    if (!checked) return sum;
    for (const opt of addonOptions) {
      const ch = opt.choices.find(c => c.id === choiceId);
      if (ch) return sum + ch.priceDelta;
    }
    return sum;
  }, 0);

  // Calculate Fallback Addons (Rs. 100 each)
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
    
    // Pass fallback mods as notes if they exist
    let notes = [];
    if (fallbackMods.cheese) notes.push("Extra Cheese");
    if (fallbackMods.meat) notes.push("Extra Meat");
    if (fallbackMods.toppings) notes.push("Extra Toppings");

    addItem({ ...item, note: notes.join(", ") } as any, quantity, allOptions);
    
    // DO NOT REDIRECT - Provide elegant feedback
    success('Added! ✓', `${quantity}x ${item.name} added to your cart.`);
  };

  const ingredients = getIngredients(item);

  return (
    <div className="min-h-screen bg-background">
      {/* Clean Full Height Hero Image */}
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

      {/* Product Info & Options */}
      <section className="relative z-10 -mt-32 pb-24">
        <div className="container-padding">
          
          {/* Header Block */}
          <div className="mb-14 text-center max-w-3xl mx-auto">
             <h1 className="font-display text-h2 lg:text-h1 text-cream mb-6">{item.name}</h1>
             <p className="font-body text-body text-on-surface-variant leading-relaxed px-4">{item.description}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            
            {/* Conditional Magnitude (Size) Options */}
            {sizeOptions.length > 0 && (
              <div className="card-elevated p-8 lg:p-10">
                <h3 className="font-display text-h4 text-cream mb-8">Magnitude</h3>
                <div className="space-y-5">
                    {sizeOptions.map(opt => (
                      opt.choices.map(ch => {
                        const isSelected = selectedOptions[opt.id] === ch.id;
                        return (
                          <button
                            key={ch.id}
                            type="button"
                            onClick={() => handleSizeChange(opt.id, ch.id)}
                            className={`w-full flex items-center justify-between p-5 rounded-soft-sm border transition-all duration-300 ${
                              isSelected ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/30'
                            }`}
                          >
                            <span className="font-body text-body text-cream">{ch.name}</span>
                            <span className="text-body-large text-gold font-bold">
                              {formatPrice(item.price + ch.priceDelta)}
                            </span>
                          </button>
                        );
                      })
                    ))}
                </div>
              </div>
            )}

            {/* Personalize & Add To Cart */}
            <div className="card-elevated p-8 lg:p-10 flex flex-col lg:col-span-1">
              <h3 className="font-display text-h4 text-cream mb-8">Personalize</h3>
              <div className="flex-1 space-y-5">
                {addonOptions.length > 0 ? (
                  addonOptions.map(opt => (
                    opt.choices.map(ch => (
                      <label key={ch.id} className="flex items-center gap-4 p-5 rounded-soft-sm border border-border hover:border-gold/30 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!addonChecked[ch.id]}
                          onChange={() => handleAddonToggle(ch.id)}
                          className="w-5 h-5 accent-gold"
                        />
                        <span className="flex-1 font-body text-body text-cream">{ch.name}</span>
                        {ch.priceDelta > 0 && (
                          <span className="text-gold font-bold">+{formatPrice(ch.priceDelta)}</span>
                        )}
                      </label>
                    ))
                  ))
                ) : (
                  // Functional Fallback Checkboxes
                  <div className="space-y-5">
                      <label className="flex items-center gap-4 p-5 rounded-soft-sm border border-border hover:border-gold/30 cursor-pointer">
                        <input type="checkbox" checked={fallbackMods.cheese} onChange={() => setFallbackMods(p => ({...p, cheese: !p.cheese}))} className="w-5 h-5 accent-gold" />
                        <span className="flex-1 font-body text-body text-cream">Extra Cheese</span>
                        <span className="text-gold font-bold">+{formatPrice(100)}</span>
                      </label>
                      <label className="flex items-center gap-4 p-5 rounded-soft-sm border border-border hover:border-gold/30 cursor-pointer">
                        <input type="checkbox" checked={fallbackMods.meat} onChange={() => setFallbackMods(p => ({...p, meat: !p.meat}))} className="w-5 h-5 accent-gold" />
                        <span className="flex-1 font-body text-body text-cream">Extra Meat</span>
                        <span className="text-gold font-bold">+{formatPrice(100)}</span>
                      </label>
                      <label className="flex items-center gap-4 p-5 rounded-soft-sm border border-border hover:border-gold/30 cursor-pointer">
                        <input type="checkbox" checked={fallbackMods.toppings} onChange={() => setFallbackMods(p => ({...p, toppings: !p.toppings}))} className="w-5 h-5 accent-gold" />
                        <span className="flex-1 font-body text-body text-cream">Extra Toppings</span>
                        <span className="text-gold font-bold">+{formatPrice(100)}</span>
                      </label>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-8 mt-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-body text-body text-on-surface-variant">Quantity</span>
                  <QuantitySelector value={quantity} onChange={setQuantity} min={1} max={20} />
                </div>
                <Button variant="primary" size="lg" fullWidth onClick={handleAddToCart}>
                  Add to Cart &mdash; {formatPrice(totalPrice)}
                </Button>
              </div>
            </div>

            {/* Conditional Ingredients */}
            {ingredients.length > 0 && (
              <div className="card-elevated p-8 lg:p-10">
                <h3 className="font-display text-h4 text-cream mb-8">Ingredients</h3>
                <ul className="space-y-5">
                  {ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-gold flex-shrink-0" />
                      <span className="font-body text-body text-on-surface-variant">{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
          </div>
        </div>
      </section>
    </div>
  );
}