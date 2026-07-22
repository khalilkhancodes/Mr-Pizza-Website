import { Metadata } from 'next';
import Link from 'next/link';
import { HomeIcon, SearchIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you\'re looking for doesn\'t exist or has been moved.',
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-16 lg:py-32">
      <div className="container-padding text-center animate-fade-in">
        <div className="mb-8">
          <span className="font-display text-[120px] lg:text-[200px] text-border/50">404</span>
        </div>
        <h1 className="font-display text-4xl lg:text-5xl text-primary-text mb-4 uppercase">
          page not found
        </h1>
        <p className="font-body text-base lg:text-lg text-primary-text/60 max-w-md mx-auto mb-10">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-base btn-primary btn-lg">
            <HomeIcon className="w-4 h-4" />
            Back to Home
          </Link>
          <Link href="/menu" className="btn-base btn-secondary btn-lg">
            <SearchIcon className="w-4 h-4" />
            Browse Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
