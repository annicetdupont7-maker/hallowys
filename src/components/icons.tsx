/** Icônes SVG inline : aucune dépendance, héritent de la couleur du texte. */

type IconProps = { className?: string };

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export function CartIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 5h2l2.2 10.2a2 2 0 0 0 2 1.6h7.5a2 2 0 0 0 2-1.5L20 8H6.2" />
      <circle cx="10" cy="20" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SearchIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  );
}

export function MenuIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MinusIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function PlusIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function TrashIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
    </svg>
  );
}

export function CheckIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg {...base} className={className} strokeWidth={2}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function ChevronIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
