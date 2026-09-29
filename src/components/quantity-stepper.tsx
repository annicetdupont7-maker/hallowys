'use client';

import { MinusIcon, PlusIcon } from '@/components/icons';

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  /** Valeur maximale (stock disponible). */
  max: number;
  /** Autorise la descente à 0 (suppression dans le panier). */
  min?: number;
  label: string;
  size?: 'md' | 'sm';
};

export function QuantityStepper({ value, onChange, max, min = 1, label, size = 'md' }: QuantityStepperProps) {
  const button =
    size === 'md'
      ? 'grid size-11 place-items-center'
      : 'grid size-10 place-items-center';

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-full border border-line bg-void/60"
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Diminuer la quantité"
        className={`${button} rounded-full text-ink transition-colors hover:text-pumpkin disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:text-ink`}
      >
        <MinusIcon />
      </button>
      <output aria-live="polite" className="min-w-8 text-center text-sm font-semibold tabular-nums text-ink">
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Augmenter la quantité"
        className={`${button} rounded-full text-ink transition-colors hover:text-pumpkin disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:text-ink`}
      >
        <PlusIcon />
      </button>
    </div>
  );
}
