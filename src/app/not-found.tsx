import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60svh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pumpkin">Erreur 404</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-ink sm:text-5xl">
        Cette page s&apos;est volatilisée
      </h1>
      <p className="mt-4 text-ink-muted">
        Le lien que vous suivez mène à une pièce vide. Revenez vers la lumière.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-pumpkin px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.02]"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
