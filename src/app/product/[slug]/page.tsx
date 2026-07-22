import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMenuItemById } from '@/content/menu';
import { ProductDetail } from '@/components/menu/ProductDetail';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getMenuItemById(slug);
  if (!item) return { title: 'Not Found' };

  return {
    title: item.name,
    description: item.description,
    openGraph: {
      title: `${item.name} | Mr. Pizza`,
      description: item.description,
      images: [item.image],
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const { menuItems } = await import('@/content/menu');
  return menuItems.map(item => ({ slug: item.id }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const item = getMenuItemById(slug);

  if (!item) notFound();

  return <ProductDetail item={item} />;
}