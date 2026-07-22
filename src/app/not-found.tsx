import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { HomeIcon, SearchIcon, ArrowLeftIcon } from '@/components/ui/Icons';

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
          <span className="font-display text-[120px] lg:text-[200px] font-bold text-border/50">404</span>
        </div>
        <h1 className="font-display text-headline-lg-mobile lg:text-headline-lg text-cream mb-4">
          Page Not Found
        </h1>
        <p className="font-body body-lg text-on-surface-variant max-w-md mx-auto mb-10">
          Sorry, we couldn\'t find the page you\'re looking for. It might have been moved or doesn\'t exist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" asChild>
            <Link href="/">
              <HomeIcon className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/menu">
              <SearchIcon className="w-5 h-5 mr-2" />
              Browse Menu
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}