/**
 * ASSET IMAGE — point de passage unique pour afficher une image du site.
 * ----------------------------------------------------------------------------
 * Aucun composant ne doit appeler `next/image` directement : tout passe par ici.
 * Bénéfices garantis pour chaque visuel, sans effort côté appelant :
 *
 *  1. Chemin, dimensions et alt proviennent du registre (`src/lib/images.ts`).
 *  2. Le conteneur porte l'`aspect-ratio` intrinsèque de l'asset → la place est
 *     réservée avant même le chargement : aucun Cumulative Layout Shift.
 *  3. `sizes` est déjà calibré pour l'emplacement réel du visuel.
 *  4. `loading="lazy"` par défaut ; seul un asset marqué `priority` est préchargé.
 *  5. `placeholder="blur"` sur un blur sombre inline, cohérent avec le thème.
 *
 * Remplacer un placeholder par le fichier final ne demande AUCUNE modification :
 * même chemin, mêmes dimensions, même clé de registre.
 */

import Image from 'next/image';
import { DARK_BLUR, getAsset, type AssetKey } from '@/lib/images';

type AssetImageProps = {
  /** Clé du registre d'images. */
  asset: AssetKey;
  /** Classes appliquées au conteneur (qui porte l'aspect-ratio). */
  className?: string;
  /** Classes appliquées à l'image elle-même (object-fit, transitions...). */
  imageClassName?: string;
  /**
   * Force le ratio d'affichage (`'16 / 9'`, `'4 / 5'`...). Par défaut, le ratio
   * intrinsèque de l'asset. L'image est recadrée via `object-cover`.
   *
   * `null` désactive le ratio inline : le conteneur doit alors imposer sa
   * hauteur par des classes (ex. `aspect-[4/5] md:aspect-[16/9]`, `h-[70svh]`)
   * — la place reste réservée, donc toujours aucun layout shift.
   */
  ratio?: string | null;
  /** Surcharge le préchargement défini dans le registre (rare). */
  priority?: boolean;
  /** Surcharge `sizes` si le visuel est réutilisé dans un autre gabarit. */
  sizes?: string;
  /**
   * Image purement décorative : alt vide + `aria-hidden`. À n'utiliser que si le
   * texte voisin porte déjà toute l'information.
   */
  decorative?: boolean;
};

export function AssetImage({
  asset,
  className = '',
  imageClassName = '',
  ratio,
  priority,
  sizes,
  decorative = false,
}: AssetImageProps) {
  const a = getAsset(asset);
  const isPriority = priority ?? a.priority;

  return (
    <div
      className={`relative overflow-hidden bg-surface-2 ${className}`}
      style={ratio === null ? undefined : { aspectRatio: ratio ?? `${a.width} / ${a.height}` }}
    >
      <Image
        src={a.src}
        alt={decorative ? '' : a.alt}
        aria-hidden={decorative || undefined}
        fill
        sizes={sizes ?? a.sizes}
        priority={isPriority}
        loading={isPriority ? undefined : 'lazy'}
        placeholder="blur"
        blurDataURL={DARK_BLUR}
        className={`object-cover ${imageClassName}`}
      />
    </div>
  );
}
