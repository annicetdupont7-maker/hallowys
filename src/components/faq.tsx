'use client';

import { useEffect, useId, useState } from 'react';
import { ChevronIcon } from '@/components/icons';
import type { FaqItem } from '@/lib/faq';

/** Accordéon : plusieurs réponses peuvent rester ouvertes en même temps. */
export function Faq({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<string>>(new Set());

  /* Un lien vers /faq#retours ouvre directement la réponse visée. */
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (items.some((item) => item.id === id)) setOpen((current) => new Set(current).add(id));
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [items]);

  function toggle(id: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <ul className="divide-y divide-line/70 rounded-card border border-line/70 bg-surface/60">
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const buttonId = `${baseId}-${item.id}-q`;
        const panelId = `${baseId}-${item.id}-a`;
        return (
          <li key={item.id} id={item.id} className="scroll-mt-24">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-ink transition-colors hover:text-pumpkin sm:px-6"
              >
                {item.question}
                <ChevronIcon
                  className={`size-5 shrink-0 text-pumpkin transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 text-sm leading-relaxed text-ink-muted sm:px-6"
            >
              {item.answer}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
