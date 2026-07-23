"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { MenuCard } from "@/components/ui/Card";
import { useCartStore } from "@/store/cart";
import {
  getFeaturedItems,
  getPopularItems,
  getActiveDeals,
  categories,
  menuItems,
} from "@/content/menu";
import { useToast } from "@/components/ui/Toaster";
import { formatPrice } from "@/lib/utils";
import { DealCard } from "@/components/deals/DealCard";

export default function HomePage() {
  const { addItem } = useCartStore();
  const { success } = useToast();

  const handleAddToCart = (item: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => {
    addItem(item as any);
    success("Added! ✓", `${item.name} added to cart.`);
  };

  const featuredItems = getFeaturedItems().slice(0, 4);
  const popularItems = getPopularItems().slice(0, 4);
  const displayCategories = categories.slice(0, 8);
  const deals = getActiveDeals().slice(0, 3);

  const categoryImages: Record<string, string> = {
    "special-pizzas": "/assets/Catergories/Special-Pizza.avif",
    "regular-pizzas": "/assets/Catergories/Regular_Pizza.webp",
    "stuffer-pizzas": "/assets/Catergories/Stuffer_Pizza.webp",
    "appetizers": "/assets/Catergories/Appetizers.webp",
    "burgers-sandwiches": "/assets/Catergories/Burgers_Sandwiches.webp",
    "pizza-burgers": "/assets/Catergories/Pizza_Burgers.webp",
    "rolls-wraps-shawarma": "/assets/Catergories/rolls_wraps_shawarma.webp",
    "pasta-fries": "/assets/Catergories/Pasta_Fries.webp",
    "rice-sajji": "/assets/Catergories/Rice_Sajji.webp",
    "platters": "/assets/Catergories/Platters.webp",
    "beverages-drinks": "/assets/Catergories/Beverages_Drinks.webp",
  };

  const stats = [
    { value: "900°", label: "oven temp" },
    { value: "100%", label: "hand-made" },
    { value: "28", label: "premium items" },
    { value: "4.9", label: "customer rating" },
  ];

  return (
    <>
      {/* ==============================
          HERO — 100vh on large screens
          ============================== */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/Hero/Home.webp"
            alt=""
            fill
            priority
            className="object-cover scale-105"
            sizes="100vw"
            quality={90}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-gradient)] via-[var(--color-gradient)] to-[var(--color-gradient)]"></div>
        </div>

        <div className="container-padding relative z-10 text-center lg:text-left w-full flex">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-6 block">
              100% natural ingredients
            </span>

            <h1 className="font-display text-start text-9xl md:text-hero-title text-primary-text leading-[0.88] -mt-2">
              BOLD.
              <br />
              REAL.
              <br />
              <span className="text-gold">FIRE.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ==============================
          CATEGORIES
          ============================== */}
      <section className="section-spacing bg-background">
        <div className="container-padding">
          <div className="text-center mb-64">
            <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-10 block">
              explore our menu
            </span>
            <h2 className="font-display text-h2 text-primary-text">
              choose your <span className="text-gold">category</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {displayCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/menu?category=${cat.slug}`}
                className="group relative aspect-[4/3] overflow-hidden bg-surface border border-border hover:border-gold transition-all duration-300"
              >
                <Image
                  src={categoryImages[cat.slug] || "/images/placeholder.png"}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />

                {/* Base black fade overlay to normalize image brightness and guarantee contrast */}
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50" />

                {/* Existing atmospheric gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                  <h3 className="font-display text-lg lg:text-xl text-primary-text uppercase tracking-[1px]">
                    {cat.name}
                  </h3>

                  {/* 4px accent line with subtle hover expansion for interactive feedback */}
                  <div className="h-[2px] w-12 bg-gold mt-1 transition-all duration-300 group-hover:w-16" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 lg:mt-64">
            <Link href="/menu">
              <Button variant="outline" size="lg">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==============================
          FEATURED ITEMS
          ============================== */}
      <section className="section-spacing bg-surface">
        <div className="container-padding">
          <div className="text-center mb-64">
            <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-10 block">
              chef&apos;s selection
            </span>
            <h2 className="font-display text-h2 text-primary-text">
              featured <span className="text-gold">specialties</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[8px]">
            {featuredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={{
                  ...item,
                  image: categoryImages[item.category] || "/images/Menu_Items.png",
                }}
                variant="menu"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          STATS BAR
          ============================== */}
      <section className="bg-gold text-background border-y border-[rgba(212,175,55,0.2)]">
        <div className="container-padding py-12 lg:py-64">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl lg:text-h1 leading-none mb-8">
                  {stat.value}
                </div>
                <div className="font-body text-xs tracking-[2px] uppercase text-primary-text/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          BEST SELLERS
          ============================== */}
      <section className="section-spacing bg-background">
        <div className="container-padding">
          <div className="text-start mb-64">
            <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-8 block">
              customer favorites
            </span>
            <h2 className="font-display text-h2 text-primary-text">
              best <span className="text-gold">sellers</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[8px]">
            {popularItems.map((item) => (
              <MenuCard
                key={item.id}
                item={{
                  ...item,
                  image: categoryImages[item.category] || "/images/Menu_Items.png",
                }}
                variant="menu"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          DEALS PREVIEW
          ============================== */}
      <section className="section-spacing bg-[var(--color-surface)]">
        <div className="container-padding">
          {/* Header aligned strictly to image_9884da.jpg */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="font-body text-[10px] tracking-[2px] font-bold uppercase text-[var(--color-gold)] mb-2 block">
                LIMITED TIME
              </span>
              <h2 className="font-display text-[40px] font-bold text-[var(--color-cream)] uppercase leading-none">
                HOT DEALS
              </h2>
            </div>

            <Link
              href="/deals"
              className="font-body text-[12px] font-bold uppercase tracking-[1px] text-[var(--color-gold)] hover:text-[var(--color-cream)] transition-colors flex items-center gap-1.5 mb-2"
            >
              ALL DEALS
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>

          {/* Switched to 2 columns to support horizontal cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {deals.slice(0, 2).map((deal) => {
              const dealItems = deal.items.map((di) => {
                const item = menuItems.find((mi) => mi.id === di.menuItemId);
                return { ...di, item: item || null };
              });

              return (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  dealItems={dealItems}
                  variant="horizontal" // Triggers the correct UI layout
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ==============================
          CTA
          ============================== */}
      <section className="relative py-24 lg:py-64 overflow-hidden bg-background border-t border-[rgba(212,175,55,0.15)]">
        <div className="container-padding text-center relative z-10">
          <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-6 block">
            ready to order?
          </span>
          <h2 className="font-display text-h1 text-primary-text max-w-3xl mx-auto leading-[0.9]">
            fresh, hot &amp; <span className="text-gold">delivered</span>
          </h2>
          <p className="font-body text-base lg:text-lg text-primary-text/60 max-w-xl mx-auto mt-6 mb-10">
            Browse the menu, build your order, and checkout via WhatsApp in
            under 2 minutes. Cash on delivery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link href="/menu">
              <Button variant="default" size="lg">
                Start Your Order
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
