'use client';

import { useState } from 'react';

const STORAGE_KEY = 'hallowys.newsletter';

/**
 * Inscription à la lettre d'information. Sans serveur d'envoi, l'adresse est
 * validée puis mémorisée sur l'appareil ; le message ne promet rien de plus.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'done'>('idle');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setStatus('error');
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* Stockage indisponible : l'inscription reste confirmée pour la session. */
    }
    setStatus('done');
  }

  if (status === 'done') {
    return (
      <p role="status" className="mx-auto mt-6 max-w-md rounded-full border border-pumpkin/40 bg-pumpkin/10 px-5 py-3 text-sm text-ink">
        Merci ! L&apos;adresse {email.trim()} est bien enregistrée.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto mt-6 max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Adresse e-mail
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === 'error') setStatus('idle');
          }}
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
          placeholder="Votre adresse e-mail"
          className="flex-1 rounded-full border border-line bg-void px-5 py-3 text-base text-ink placeholder:text-ink-faint sm:text-sm"
        />
        <button
          type="submit"
          className="rounded-full bg-pumpkin px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.02]"
        >
          S&apos;inscrire
        </button>
      </div>
      {status === 'error' ? (
        <p id="newsletter-error" role="alert" className="mt-3 text-sm text-pumpkin-soft">
          Saisissez une adresse e-mail valide, par exemple prenom@domaine.fr.
        </p>
      ) : null}
    </form>
  );
}
