'use client';

import { useState } from 'react';
import { CONTACT } from '@/lib/site';

const SUBJECTS = ['Question sur un produit', 'Suivi de commande', 'Retour ou échange', 'Autre demande'];

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

/**
 * Formulaire de contact : sans serveur, il prépare le message dans la
 * messagerie de l'utilisateur (lien mailto pré-rempli) au lieu de feindre
 * un envoi.
 */
export function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);

  function field<K extends keyof typeof values>(key: K) {
    return {
      value: values[key],
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValues((current) => ({ ...current, [key]: event.target.value }));
        setErrors((current) => ({ ...current, [key]: undefined }));
      },
    };
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (!values.name.trim()) next.name = 'Indiquez votre nom.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = 'Saisissez une adresse e-mail valide.';
    if (values.message.trim().length < 10) next.message = 'Votre message doit contenir au moins 10 caractères.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `[HALLOWYS] ${values.subject}`,
    )}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  const inputClass =
    'mt-1.5 w-full rounded-xl border border-line bg-void px-4 py-3 text-base text-ink placeholder:text-ink-faint aria-[invalid=true]:border-blood sm:text-sm';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-ink">
            Nom
          </label>
          <input
            id="contact-name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={inputClass}
            {...field('name')}
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-1.5 text-sm text-pumpkin-soft">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-ink">
            E-mail
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={inputClass}
            {...field('email')}
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-1.5 text-sm text-pumpkin-soft">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="text-sm font-medium text-ink">
          Sujet
        </label>
        <select id="contact-subject" className={inputClass} {...field('subject')}>
          {SUBJECTS.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={inputClass}
          {...field('message')}
        />
        {errors.message ? (
          <p id="contact-message-error" className="mt-1.5 text-sm text-pumpkin-soft">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="rounded-full bg-pumpkin px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.02]"
      >
        Préparer mon message
      </button>

      <p role="status" className="text-sm text-ink-muted">
        {opened
          ? `Votre messagerie s'ouvre avec le message pré-rempli. Si rien ne se passe, écrivez-nous directement à ${CONTACT.email}.`
          : 'Le message s’ouvrira dans votre messagerie habituelle, prêt à être envoyé.'}
      </p>
    </form>
  );
}
