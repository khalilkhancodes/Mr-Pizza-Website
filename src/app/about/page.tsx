import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ClockIcon,
  MapPinIcon,
  ShieldIcon,
  TruckIcon,
  StarIcon,
  PizzaIcon,
  BurgerIcon,
  HeartIcon,
  LeafIcon,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Mr. Pizza - Premium pizza and fast food without compromise. Hand-crafted pizzas, burgers, and more made with the finest ingredients.",
  openGraph: {
    title: "Our Story | Mr. Pizza",
    description:
      "Premium pizza and fast food without compromise. Hand-crafted with the finest ingredients.",
    type: "website",
  },
};

const values = [
  {
    icon: PizzaIcon,
    title: "Wood-Fired Perfection",
    description:
      "Every pizza is hand-stretched and fired at 900°F in our custom wood oven, creating the perfect char and texture.",
  },
  {
    icon: BurgerIcon,
    title: "Dry-Aged Beef",
    description:
      "Our burgers use 28-day dry-aged wagyu blend, ground fresh daily. No frozen patties, ever.",
  },
  {
    icon: ShieldIcon,
    title: "Zero Shortcuts",
    description:
      "No freezers, no microwaves, no pre-made sauces. Everything is made in-house, from scratch, every morning.",
  },
  {
    icon: StarIcon,
    title: "Premium Ingredients",
    description:
      "San Marzano DOP tomatoes, 24-month Prosciutto di Parma, fresh burrata flown in weekly. Quality you can taste.",
  },
];

const timeline = [
  {
    year: "2022",
    title: "The Beginning",
    description:
      "Started as a food truck with a single wood-fired oven and a mission: prove fast food can be real food.",
  },
  {
    year: "2023",
    title: "First Location",
    description:
      "Opened our flagship kitchen in the arts district. Added dry-aging program and in-house bakery.",
  },
  {
    year: "2024",
    title: "Digital Launch",
    description:
      "Built this platform to bring our food to more homes. WhatsApp ordering, cash on delivery, zero compromise.",
  },
  {
    year: "Today",
    title: "Still Growing",
    description:
      "Same ovens. Same beef. Same standards. Just more tables, more ovens, more happy customers.",
  },
];

const stats = [
  { value: "900°F", label: "Oven Temperature" },
  { value: "28 Days", label: "Beef Dry-Aged" },
  { value: "0", label: "Freezers" },
  { value: "100%", label: "Made In-House" },
];

const team = [
  {
    name: "Marcus Chen",
    role: "Executive Chef",
    bio: "Former Michelin-star chef who believed fast food deserved better. Trained in Naples and Tokyo.",
    image: "/images/bradpit.png",
  },
  {
    name: "Sofia Rodriguez",
    role: "Head Pizzaiolo",
    bio: "James Beard nominee. Oversees our dry-aging program and develops seasonal specials.",
    image: "/images/bradpit.png",
  },
  {
    name: "James Okonkwo",
    role: "Pitmaster",
    bio: "Master of the wood oven. 15 years perfecting the char. Knows every hot spot by heart.",
    image: "/images/bradpit.png",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] lg:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Kitchen_Interior.png"
            alt="Mr. Pizza kitchen - wood fired oven"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          <div className="image-scrim-overlay" />
        </div>

        <div className="container-padding relative z-10 py-16 lg:py-32">
          <div className="max-w-3xl animate-fade-in">
            <span className="font-body label-lg text-gold tracking-widest mb-6 block">
              OUR PHILOSOPHY
            </span>
            <h1 className="font-display text-headline-lg-mobile lg:text-headline-lg text-cream mb-6">
              Fast Food, <span className="text-gold">Without Compromise</span>
            </h1>
            <p className="font-body body-lg text-on-surface-variant max-w-2xl">
              We believe fast food should be real food. Hand-crafted with
              premium ingredients, cooked with care, and delivered hot to your
              door. No shortcuts. No frozen patties. No compromises.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing bg-charcoal">
        <div className="container-padding">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="font-body label-lg text-gold tracking-widest mb-4 block">
                WHAT MAKES US DIFFERENT
              </span>
              <h2 className="font-display text-headline-lg-mobile lg:text-headline-lg text-cream mb-6">
                Four Pillars of <span className="text-gold">Quality</span>
              </h2>
              <p className="font-body body-lg text-on-surface-variant mb-8">
                Every decision we make comes back to these four principles.
                They&apos;re not marketing&mdash;they&apos;re how we operate
                every single day.
              </p>
              <div className="space-y-6">
                {values.map((value, index) => (
                  <div
                    key={value.title}
                    className="flex gap-4 animate-slide-up text-on-surface "
                    style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                  >
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-charcoal-50 border border-border rounded-soft-sm">
                      <value.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-h4 text-cream mb-1">
                        {value.title}
                      </h3>
                      <p className="font-body text-small text-on-surface-variant">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-soft-sm overflow-hidden mt-64">
              <Image
                src="/images/Kitchen_Interior.png"
                alt="Mr. Pizza kitchen interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-spacing bg-background">
        <div className="container-padding">
          <div className="text-center mb-12 lg:mb-24">
            <span className="font-body label-lg text-gold tracking-widest mb-4 block">
              BY THE NUMBERS
            </span>
            <h2 className="font-display text-headline-lg-mobile lg:text-headline-lg text-cream mb-4">
              Our Standards
            </h2>
            <p className="font-body body-lg text-on-surface-variant max-w-2xl mx-auto">
              Numbers that matter. No marketing fluff&mdash;just the standards
              we hold ourselves to every day.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="card-elevated p-6 lg:p-8 text-center animate-scale-in"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <div className="font-display text-headline-lg-mobile lg:text-headline-lg text-gold mb-2">
                  {stat.value}
                </div>
                <div className="font-body label-lg text-on-surface-variant">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-spacing bg-charcoal">
        <div className="container-padding">
          <div className="text-center mb-12 lg:mb-24">
            <span className="font-body label-lg text-gold tracking-widest mb-4 block">
              OUR JOURNEY
            </span>
            <h2 className="font-display text-headline-lg-mobile lg:text-headline-lg text-cream mb-4">
              From Food Truck to Your Table
            </h2>
            <p className="font-body body-lg text-on-surface-variant max-w-2xl mx-auto">
              Every great restaurant starts somewhere. Ours started with a
              single oven and a stubborn belief that fast food could be better.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-border" />
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={item.year}
                    className="relative lg:grid lg:grid-cols-2 gap-8 items-start mb-16 animate-slide-up"
                    style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                  >
                    <div
                      className={`relative z-10 pl-16 lg:pl-0 ${isLeft ? "lg:text-right lg:pr-12" : "lg:col-start-2 lg:pl-12"}`}
                    >
                      <div
                        className={`flex items-center gap-4 ${isLeft ? "" : "lg:flex-row-reverse"}`}
                      >
                        <div className="w-4 h-4 bg-gold rounded-full border-4 border-charcoal flex-shrink-0 z-10" />
                        <div>
                          <div className="font-display text-headline-sm text-gold">
                            {item.year}
                          </div>
                          <div className="font-body label-lg text-cream">
                            {item.title}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`relative z-10 pl-16 lg:pl-0 mt-4 lg:mt-0 ${isLeft ? "lg:col-start-2 lg:pl-12" : "lg:text-right lg:pr-12"}`}
                    >
                      <p className="font-body body-md text-on-surface-variant">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-spacing bg-[var(--color-background)]">
        <div className="container-padding">
          <div className="text-center mb-12 lg:mb-24">
            <span className="font-body label-lg text-gold tracking-widest mb-4 block">
              MEET THE TEAM
            </span>
            <h2 className="font-display text-headline-lg-mobile lg:text-headline-lg text-cream mb-4">
              The People Behind the Food
            </h2>
            <p className="font-body body-lg text-on-surface-variant max-w-2xl mx-auto">
              Real chefs. Real passion. No corporate kitchen&mdash;just people
              who love what they do.
            </p>
          </div>

          {/* Team Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="bg-surface p-8 flex flex-col justify-between animate-slide-up text-left"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                {/* Top: Bio / Quote */}
                <p className="text-body-regular mb-10">"{member.bio}"</p>

                {/* Bottom: Avatar & Info */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative w-14 h-14 flex-shrink-0 rounded-full overflow-hidden border border-[var(--color-border)]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                      quality={85}
                    />
                  </div>
                  <div>
                    <h3 className="font-body font-bold text-[16px] text-[var(--color-cream)] leading-tight">
                      {member.name}
                    </h3>
                    <p className="font-body text-[14px] text-[var(--color-gold)] mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-charcoal">
        <div className="container-padding text-center">
          <span className="font-body label-lg text-gold tracking-widest mb-4 block">
            READY TO EXPERIENCE IT?
          </span>
          <h2 className="font-display text-headline-lg-mobile lg:text-headline-lg text-cream mb-6">
            Your Table Is Ready
          </h2>
          <p className="font-body body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
            Browse the menu, build your order, and checkout via WhatsApp in
            under 2 minutes. Cash on delivery. No cards. No apps. Just great
            food.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" asChild>
              <Link href="/menu">Start Your Order</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">Find Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
