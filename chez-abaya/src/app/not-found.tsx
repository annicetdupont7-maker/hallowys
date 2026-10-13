import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="eyebrow">Page introuvable</p>
      <h1 className="mt-3 font-display text-4xl font-medium">Cet article n’existe pas ou plus.</h1>
      <p className="mt-4 text-brown-soft">Il a peut-être été retiré de la collection.</p>
      <Link href="/boutique" className="btn btn-primary mt-8">
        Voir la boutique
      </Link>
    </div>
  );
}
