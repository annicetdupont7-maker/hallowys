import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    /**
     * Aucun domaine distant n'est autorisé : toutes les images du site sont des
     * assets locaux servis depuis /public. Une URL externe échouera donc au
     * build plutôt que de passer inaperçue en production.
     */
    remotePatterns: [],
    /** WebP en sortie, AVIF en premier choix quand le navigateur le supporte. */
    formats: ['image/avif', 'image/webp'],
    /** Points de rupture alignés sur les valeurs `sizes` du registre d'assets. */
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1440, 1920, 2400],
    imageSizes: [96, 128, 200, 256, 320, 384],
    /** Cache long : les fichiers sont versionnés par leur contenu. */
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
