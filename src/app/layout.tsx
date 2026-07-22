import { Suspense } from 'react';
import { Inter, Sora, Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/Toaster';
import { GlobalLoader } from '@/components/layout/GlobalLoader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  weight: ['700', '800'],
});

export const metadata = {
  title: {
    default: 'Mr. Pizza | Premium Pizza Delivery',
    template: '%s | Mr. Pizza',
  },
  description: 'Hand-crafted pizzas, burgers, and more delivered to your door. Premium ingredients, zero compromise.',
  keywords: ['pizza delivery', 'burgers', 'fast food', 'Pakistani cuisine', 'food delivery'],
  authors: [{ name: 'Mr. Pizza' }],
  creator: 'Mr. Pizza',
  publisher: 'Mr. Pizza',
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Mr. Pizza',
    title: 'Mr. Pizza | Premium Pizza Delivery',
    description: 'Hand-crafted pizzas, burgers, and more delivered to your door.',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Mr. Pizza - Premium Pizza Delivery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mr. Pizza | Premium Pizza Delivery',
    description: 'Hand-crafted pizzas, burgers, and more delivered to your door.',
    images: ['/images/og-home.jpg'],
    creator: '@mrpizza_pk',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${bricolage.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased bg-background text-on-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <Toaster />
        <Suspense fallback={null}>
          <GlobalLoader />
        </Suspense>
      </body>
    </html>
  );
}