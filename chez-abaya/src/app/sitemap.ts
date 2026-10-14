import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { SITE_URL } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/boutique`, priority: 0.9 },
    ...PRODUCTS.map((p) => ({ url: `${SITE_URL}/produit/${p.slug}`, priority: 0.7 })),
  ];
}
