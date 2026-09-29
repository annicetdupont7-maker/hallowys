import Link from 'next/link';

export default function ProductsNotFound() {
  return (
    <div className="mx-auto flex min-h-[60svh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pumpkin">Erreur 404</p>
      <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
        Ce produit est introuvable
      </h1>
      <p className="mt-4 text-ink-muted">
        Il a peut-être quitté le catalogue ou son adresse a changé. Toute la collection vous attend dans la boutique.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/boutique"
          className="rounded-full bg-pumpkin px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.02]"
        >
          Voir la boutique
        </Link>
        <Link
          href="/"
          className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-pumpkin/50 hover:text-pumpkin"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
