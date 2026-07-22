import Link from 'next/link';
import { Button } from '@/components/ui/Button';
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
        <h1 className="font-display text-headline-lg text-cream mb-4">Page Not Found</h1>
        <p className="font-body body-lg text-on-surface-variant mb-10">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
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