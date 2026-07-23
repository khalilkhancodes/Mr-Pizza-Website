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
    title: "wood-fired perfection",
    description:
      "Every pizza is hand-stretched and fired at 900°F in our custom wood oven, creating the perfect char and texture.",
  },
  {
    icon: BurgerIcon,
    title: "dry-aged beef",
    description:
      "Our burgers use 28-day dry-aged wagyu blend, ground fresh daily. No frozen patties, ever.",
  },
  {
    icon: ShieldIcon,
    title: "zero shortcuts",
    description:
      "No freezers, no microwaves, no pre-made sauces. Everything is made in-house, from scratch, every morning.",
  },
  {
    icon: StarIcon,
    title: "premium ingredients",
    description:
      "San Marzano DOP tomatoes, 24-month Prosciutto di Parma, fresh burrata flown in weekly. Quality you can taste.",
  },
];

const timeline = [
  {
    year: "2022",
    title: "the beginning",
    description:
      "Started as a food truck with a single wood-fired oven and a mission: prove fast food can be real food.",
  },
  {
    year: "2023",
    title: "first location",
    description:
      "Opened our flagship kitchen in the arts district. Added dry-aging program and in-house bakery.",
  },
  {
    year: "2024",
    title: "digital launch",
    description:
      "Built this platform to bring our food to more homes. WhatsApp ordering, cash on delivery, zero compromise.",
  },
  {
    year: "today",
    title: "still growing",
    description:
      "Same ovens. Same beef. Same standards. Just more tables, more ovens, more happy customers.",
  },
];

const stats = [
  { value: "900°F", label: "oven temperature" },
  { value: "28 days", label: "beef dry-aged" },
  { value: "0", label: "freezers" },
  { value: "100%", label: "made in-house" },
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
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>

        <div className="container-padding relative z-10 py-20 lg:py-32 w-full">
          <div className="max-w-2xl animate-fade-in">
            <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-4 block">
              our philosophy
            </span>
            <h1 className="font-display text-h1 text-primary-text mb-6">
              fast food, <span className="text-gold">without compromise</span>
            </h1>
            <p className="font-body text-base lg:text-lg text-primary-text/70 max-w-xl">
              We believe fast food should be real food. Hand-crafted with premium ingredients, cooked with care, and delivered hot to your door. No shortcuts. No frozen patties. No compromises.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing bg-surface">
        <div className="container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-4 block">
                what makes us different
              </span>
              <h2 className="font-display text-h2 text-primary-text mb-6">
                four pillars of <span className="text-gold">quality</span>
              </h2>
              <p className="font-body text-base text-primary-text/60 mb-10">
                Every decision we make comes back to these four principles. They&apos;re not marketing&mdash;they&apos;re how we operate every single day.
              </p>
              <div className="space-y-8">
                {values.map((value, index) => (
                  <div
                    key={value.title}
                    className="flex gap-4 animate-slide-up"
                    style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                  >
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-surface-elevated border border-border">
                      <value.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-primary-text mb-1 uppercase tracking-[1px]">
                        {value.title}
                      </h3>
                      <p className="font-body text-sm text-primary-text/60">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden mt-12 lg:mt-0">
              <Image
            src="/assets/Hero/About.jpg"
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
          <div className="text-center mb-16">
            <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-4 block">
              by the numbers
            </span>
            <h2 className="font-display text-h2 text-primary-text mb-4">
              our standards
            </h2>
            <p className="font-body text-base text-primary-text/60 max-w-xl mx-auto">
              Numbers that matter. No marketing fluff&mdash;just the standards we hold ourselves to every day.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-surface border border-border p-8 text-center animate-scale-in"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <div className="font-display text-3xl lg:text-4xl text-gold mb-2 leading-none">
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

      {/* Timeline */}
      <section className="section-spacing bg-surface">
        <div className="container-padding">
          <div className="text-center mb-16">
            <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-4 block">
              our journey
            </span>
            <h2 className="font-display text-h2 text-primary-text mb-4">
              from food truck to your table
            </h2>
            <p className="font-body text-base text-primary-text/60 max-w-xl mx-auto">
              Every great restaurant starts somewhere. Ours started with a single oven and a stubborn belief that fast food could be better.
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
                        <div className="w-4 h-4 bg-gold flex-shrink-0 z-10" />
                        <div>
                          <div className="font-display text-xl text-gold uppercase tracking-[1px]">
                            {item.year}
                          </div>
                          <div className="font-body text-xs tracking-[2px] uppercase text-primary-text">
                            {item.title}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`relative z-10 pl-16 lg:pl-0 mt-4 lg:mt-0 ${isLeft ? "lg:col-start-2 lg:pl-12" : "lg:text-right lg:pr-12"}`}
                    >
                      <p className="font-body text-sm text-primary-text/60">
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
      <section className="section-spacing bg-background">
        <div className="container-padding">
          <div className="text-center mb-16">
            <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-4 block">
              meet the team
            </span>
            <h2 className="font-display text-h2 text-primary-text mb-4">
              the people behind the food
            </h2>
            <p className="font-body text-base text-primary-text/60 max-w-xl mx-auto">
              Real chefs. Real passion. No corporate kitchen&mdash;just people who love what they do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="bg-surface border border-border p-8 flex flex-col justify-between animate-slide-up"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <p className="font-body text-sm text-primary-text/70 mb-10 leading-relaxed">&ldquo;{member.bio}&rdquo;</p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden border border-border">
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
                    <h3 className="font-body text-sm font-bold text-primary-text leading-tight uppercase tracking-[1px]">
                      {member.name}
                    </h3>
                    <p className="font-body text-xs text-gold mt-1">
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
      <section className="section-spacing bg-surface border-t border-border">
        <div className="container-padding text-center">
          <span className="font-body text-xs tracking-[4px] uppercase text-gold mb-4 block">
            ready to experience it?
          </span>
          <h2 className="font-display text-h2 text-primary-text mb-6">
            your table is ready
          </h2>
          <p className="font-body text-base text-primary-text/60 mb-10 max-w-xl mx-auto">
            Browse the menu, build your order, and checkout via WhatsApp in under 2 minutes. Cash on delivery. No cards. No apps. Just great food.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/menu" className="btn-base btn-primary btn-lg">Start Your Order</Link>
            <Link href="/contact" className="btn-base btn-secondary btn-lg">Find Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
