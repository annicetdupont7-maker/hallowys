import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60svh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pumpkin">Erreur 404</p>
      <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
        Cette page s&apos;est volatilisée
      </h1>
      <p className="mt-4 text-ink-muted">
        Le lien que vous suivez mène à une pièce vide. Revenez vers la lumière.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-pumpkin px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.02]"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/boutique"
          className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-pumpkin/50 hover:text-pumpkin"
        >
          Voir la boutique
        </Link>
      </div>
    </div>
  );
}
