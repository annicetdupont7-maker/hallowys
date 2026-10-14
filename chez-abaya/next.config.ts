import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Site 100 % statique (dossier out/) : hébergeable partout, sans serveur.
  output: 'export',
  // L'application vit dans un sous-dossier du dépôt (à côté d'une autre app) :
  // on fixe sa racine pour que Next.js ne remonte pas au lockfile parent.
  outputFileTracingRoot: process.cwd(),
  images: {
    // Pas d'optimiseur d'images en export statique. Les photos de démo sont
    // redimensionnées par le CDN Unsplash (loader dans product-image.tsx) ;
    // les vraies photos posées dans /public/images sont servies telles quelles :
    // les exporter en JPEG/WebP d'environ 1200 px de large.
    unoptimized: true,
  },
};

export default nextConfig;
