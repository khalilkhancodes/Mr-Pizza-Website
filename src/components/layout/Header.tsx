'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMobileMenuStore } from '@/store/mobileMenu';
import { cn } from '@/lib/utils';
import { CartBadge } from './CartBadge';

const navItems = [
  { href: '/', label: 'home' },
  { href: '/menu', label: 'menu' },
  { href: '/deals', label: 'deals' },
  { href: '/about', label: 'about' },
  { href: '/contact', label: 'contact' },
];

export function Header() {
  const pathname = usePathname();
  const { isOpen: isMobileMenuOpen, close } = useMobileMenuStore();

  return (
    <header className="fixed top-0 left-0 py-20 right-0 z-nav bg-background border-b border-[rgba(212,175,55,0.15)]">
      <nav className="container-padding" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3" aria-label="Mr. Pizza Home">
            <span className="font-display text-2xl tracking-[2px] text-primary-text">MR. <span className="text-gold">PIZZA</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'font-body text-xs tracking-[1.5px] font-semibold uppercase transition-colors duration-fast',
                  pathname === item.href ? 'text-gold' : 'text-primary-text/80 hover:text-gold'
                )}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative p-2 text-primary-text/80 hover:text-gold transition-colors duration-fast"
              aria-label="Shopping cart"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <CartBadge />
            </Link>

            <button
              type="button"
              className="lg:hidden p-2 text-primary-text/80 hover:text-gold transition-colors duration-fast"
              onClick={() => useMobileMenuStore.getState().toggle()}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu pathname={pathname} onClose={close} />
    </header>
  );
}

function MobileMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const isOpen = useMobileMenuStore((state) => state.isOpen);

  return (
    <div
      id="mobile-menu"
      className={cn(
        'lg:hidden fixed inset-0 z-40 bg-background/98 backdrop-blur transition-transform duration-normal',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
      aria-hidden={!isOpen}
    >
      <div className="flex flex-col h-full px-8 py-10">
        <button
          type="button"
          onClick={onClose}
          className="self-end mb-12 p-2 text-primary-text/80 hover:text-gold transition-colors"
          aria-label="Close menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <nav className="flex-1" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'block py-6 px-4 font-display text-3xl tracking-wide uppercase transition-colors duration-fast',
                    pathname === item.href ? 'text-gold' : 'text-primary-text/80 hover:text-gold'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pt-10 border-t border-[rgba(212,175,55,0.15)]">
          <p className="font-body text-xs tracking-[2px] uppercase text-primary-text/60 mb-6">Follow Us</p>
          <div className="flex gap-6">
            <a href="https://instagram.com" className="text-primary-text/80 hover:text-gold transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.51" />
              </svg>
            </a>
            <a href="https://twitter.com" className="text-primary-text/80 hover:text-gold transition-colors" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
            <a href="https://facebook.com" className="text-primary-text/80 hover:text-gold transition-colors" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
