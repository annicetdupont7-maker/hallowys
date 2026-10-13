import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // L'application vit dans un sous-dossier du dépôt (à côté d'une autre app) :
  // on fixe sa racine pour que Next.js ne remonte pas au lockfile parent.
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ['image/avif', 'image/webp'],
    // Les photos de démonstration viennent du CDN Unsplash et passent par un
    // loader dédié (src/components/product-image.tsx) : aucun domaine distant
    // n'a besoin d'être autorisé ici. Les vraies photos de la boutique, posées
    // dans /public/images, sont optimisées par Next.js.
    remotePatterns: [],
  },
};

export default nextConfig;
