import Link from 'next/link';
import { BOUTIQUE } from '@/config/boutique';
import { CATEGORIES } from '@/data/products';
import { GENERAL_MESSAGE, whatsappUrl } from '@/lib/whatsapp';
import { ClockIcon, InstagramIcon, PinIcon, WhatsAppIcon } from './icons';

export function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-16 bg-brown text-ivory/85">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl font-semibold text-ivory">{BOUTIQUE.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            {BOUTIQUE.tagline}. Commandez en quelques messages, nous livrons chez vous.
          </p>
          <a
            href={whatsappUrl(GENERAL_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-6 bg-ivory text-brown hover:bg-sand"
          >
            <WhatsAppIcon />
            {BOUTIQUE.phoneDisplay}
          </a>
        </div>

        <div>
          <h2 className="eyebrow mb-4">Boutique</h2>
          <ul className="space-y-1 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link href={`/boutique?categorie=${c.id}`} className="inline-block py-1.5 hover:text-ivory">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-4">Nous trouver</h2>
          <address className="flex gap-3 text-sm not-italic leading-relaxed">
            <PinIcon className="mt-0.5 size-5 shrink-0 text-gold" />
            <span>
              {BOUTIQUE.address.street}
              <br />
              {BOUTIQUE.address.district}, {BOUTIQUE.address.city}
              <br />
              <a
                href={BOUTIQUE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block py-1 underline decoration-gold underline-offset-4 hover:text-ivory"
              >
                Voir sur la carte
              </a>
            </span>
          </address>
        </div>

        <div>
          <h2 className="eyebrow mb-4">Horaires</h2>
          <ul className="space-y-2 text-sm">
            {BOUTIQUE.hours.map((h) => (
              <li key={h.days} className="flex gap-3">
                <ClockIcon className="mt-0.5 size-5 shrink-0 text-gold" />
                <span>
                  {h.days}
                  <br />
                  <span className="text-ivory">{h.time}</span>
                </span>
              </li>
            ))}
          </ul>
          {BOUTIQUE.instagram && (
            <a
              href={`https://www.instagram.com/${BOUTIQUE.instagram}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 py-1 text-sm hover:text-ivory"
            >
              <InstagramIcon className="size-5 text-gold" />@{BOUTIQUE.instagram}
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="container-page flex flex-col gap-2 py-6 pb-24 text-xs text-ivory/60 md:flex-row md:justify-between md:pb-6">
          <p>© {new Date().getFullYear()} {BOUTIQUE.name}. {BOUTIQUE.delivery}.</p>
          <p>Site de démonstration : produits, prix et coordonnées fictifs. Photos : Unsplash.</p>
        </div>
      </div>
    </footer>
  );
}
