'use client';

import Image, { type ImageLoaderProps, type ImageProps } from 'next/image';

const UNSPLASH = 'https://images.unsplash.com/';

/** Le CDN d'Unsplash redimensionne et compresse lui-même (AVIF/WebP via auto=format). */
function unsplashLoader({ src, width, quality }: ImageLoaderProps): string {
  return `${src}?auto=format&fit=max&w=${width}&q=${quality ?? 72}`;
}

/**
 * next/image pour toutes les photos du site.
 * - Photos Unsplash (démo) : servies par le CDN Unsplash.
 * - Photos locales (/images/...) : optimisées par Next.js.
 * Le parent doit être `relative` avec une hauteur ou un aspect-ratio : l'image
 * le remplit (`fill`), ce qui évite tout décalage de mise en page.
 */
export function ProductImage({ src, alt, className, ...rest }: Omit<ImageProps, 'src' | 'fill'> & { src: string }) {
  const remote = src.startsWith(UNSPLASH);
  return (
    <Image
      src={src}
      alt={alt}
      fill
      loader={remote ? unsplashLoader : undefined}
      className={`object-cover ${className ?? ''}`}
      {...rest}
    />
  );
}
