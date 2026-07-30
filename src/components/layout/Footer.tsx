import Link from "next/link";

const navigateLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/deals", label: "Deals" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://instagram.com", label: "IG" },
  { href: "https://web.facebook.com/p/Mrpizza-Main-Branch-Narowal-61575815100198/?_rdc=1&_rdr#", label: "FB" },
  { href: "https://twitter.com", label: "TW" },
  { href: "https://youtube.com", label: "YT" },
  // Admin link
  { href: "staff/orders", label: "AD" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-64 pb-32">
      <div className="container-padding">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 lg:gap-8 mb-16">
          {/* Brand & Socials (Left Column - Spans 5) */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-4">
              <h2 className="font-display text-[32px] font-bold uppercase tracking-wide">
                <span className="text-[var(--color-gold)]">MR.</span>
                <span className="text-[var(--color-cream)]">PIZZA</span>
              </h2>
            </Link>

            <p className="text-body-regular text-[13px] max-w-sm mb-16 leading-relaxed">
              Premium hand-crafted pizzas, burgers, and fast food. Made with the
              finest ingredients, delivered to your door.
            </p>

            {/* Box-Style Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center border border-[var(--color-gold)]/30 text-[var(--color-gold)] font-body text-[12px] font-bold hover:bg-[var(--color-gold)] hover:text-[var(--color-on-gold)] transition-colors rounded-[2px]"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate Links (Middle Column - Spans 3) */}
          <div className="md:col-span-3 lg:ml-8">
            <h4 className="font-body text-[13px] tracking-[0.2em] font-bold uppercase text-[var(--color-cream)] mb-8">
              NAVIGATE
            </h4>
            <ul className="space-y-4">
              {navigateLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-regular text-[13px] hover:text-[var(--color-gold)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (Right Column - Spans 4) */}
          <div className="md:col-span-4">
            <h4 className="font-body text-[13px] tracking-[0.2em] font-bold uppercase text-[var(--color-cream)] mb-8">
              CONTACT
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-body-regular text-[13px]">
                <svg
                  className="w-3 h-3 text-[var(--color-gold)] shrink-0 mt-1 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <a href="https://www.google.com/maps/place/Mr+pizza/@32.095561,74.8845849,17z/data=!4m14!1m7!3m6!1s0x39195300228c4df5:0x2616453b6942a471!2sMr+pizza!8m2!3d32.095561!4d74.8845849!16s%2Fg%2F11xn4gnzwh!3m5!1s0x39195300228c4df5:0x2616453b6942a471!8m2!3d32.095561!4d74.8845849!16s%2Fg%2F11xn4gnzwh?entry=ttu&g_ep=EgoyMDI2MDcyNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors">
                  <span>Narowal, Pakistan</span>
                </a>
              </li>
              <li className="flex items-start gap-4 text-body-regular text-[13px]">
                <svg
                  className="w-3 h-3 text-[var(--color-gold)] shrink-0 mt-1 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a
                  href="tel:+923001234567"
                  className="hover:text-[var(--color-gold)] transition-colors"
                >
                  +92 300 1234567
                </a>
              </li>
              <li className="flex items-start gap-4 text-body-regular text-[13px]">
                <svg
                  className="w-3 h-3 text-[var(--color-gold)] shrink-0 mt-1 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <a
                  href="mailto:info.mrpizza@gmail.com"
                  className="hover:text-[var(--color-gold)] transition-colors"
                >
                  info.mrpizza@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-4 text-body-regular text-[13px]">
                <svg
                  className="w-3 h-3 text-[var(--color-gold)] shrink-0 mt-1 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>4:00 PM – 12:00 AM Daily</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-20 mt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[13px] text-[var(--color-on-surface-variant)]">
            &copy; {new Date().getFullYear()} Mr Pizza. All rights reserved.
          </p>
          <div className="flex items-center gap-1 font-body text-[13px] text-[var(--color-on-surface-variant)]">
            <Link
              href="/privacy"
              className="hover:text-[var(--color-gold)] transition-colors"
            >
              Privacy Policy
            </Link>
            <span>&middot;</span>
            <Link
              href="/terms"
              className="hover:text-[var(--color-gold)] transition-colors"
            >
              Terms of Service
            </Link>
            <span>&middot;</span>
            <Link
              href="/refund"
              className="hover:text-[var(--color-gold)] transition-colors"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
