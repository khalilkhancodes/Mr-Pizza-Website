import Link from 'next/link';
import { HomeIcon, SearchIcon } from '@/components/ui/Icons';

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-xl px-gutter">
      <div className="text-center max-w-md animate-fade-in">
        <div className="font-display text-[120px] lg:text-[180px] text-gold/20 mb-4">404</div>
        <h1 className="font-display text-4xl text-primary-text mb-4 uppercase">page not found</h1>
        <p className="font-body text-base text-primary-text/60 mb-10">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-base btn-primary">
            <HomeIcon className="w-4 h-4" />
            Back to Home
          </Link>
          <Link href="/menu" className="btn-base btn-secondary">
            <SearchIcon className="w-4 h-4" />
            Browse Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
