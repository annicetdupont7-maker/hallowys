import Link from 'next/link';

type Crumb = { label: string; href?: string };

/** Fil d'Ariane : le dernier élément est la page courante. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: 'Accueil', href: '/' }, ...items];
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-ink-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden>/</span> : null}
              {last || !crumb.href ? (
                <span aria-current={last ? 'page' : undefined} className="text-ink">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="transition-colors hover:text-pumpkin">
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** En-tête des pages sans visuel (boutique, panier, FAQ, contact...). */
export function PageHeader({
  title,
  eyebrow,
  intro,
  crumbs,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  crumbs: Crumb[];
}) {
  return (
    <header>
      <Breadcrumb items={crumbs} />
      {eyebrow ? (
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-pumpkin">{eyebrow}</p>
      ) : null}
      <h1 className={`${eyebrow ? 'mt-2' : 'mt-6'} font-display text-4xl text-ink sm:text-5xl`}>{title}</h1>
      {intro ? <p className="mt-3 max-w-2xl text-sm text-ink-muted sm:text-base">{intro}</p> : null}
    </header>
  );
}
