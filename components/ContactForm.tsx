'use client';

import { useMemo, useState } from 'react';
import { AlertCircle, Send } from 'lucide-react';

export const CONTACT_CATEGORIES = [
  {
    id: 'editorial',
    label: 'Editorial',
    hint: 'Story ideas, questions about coverage, or feedback on an article.',
    subjectPrefix: 'Editorial',
  },
  {
    id: 'corrections',
    label: 'Corrections',
    hint: 'A factual error. Please include the article link and the source that contradicts it.',
    subjectPrefix: 'Correction request',
  },
  {
    id: 'business',
    label: 'Business',
    hint: 'Advertising, licensing, or working with GamersPulse.',
    subjectPrefix: 'Business enquiry',
  },
  {
    id: 'general',
    label: 'General',
    hint: 'Anything else.',
    subjectPrefix: 'General enquiry',
  },
] as const;

export type ContactCategoryId = (typeof CONTACT_CATEGORIES)[number]['id'];

const MAX_MESSAGE = 3000;

/**
 * Contact form.
 *
 * There is no mail server behind this site, so the form does not pretend to
 * deliver anything. Instead it composes a message and hands it to the reader's
 * own email client through a `mailto:` link. The reader sees exactly what is
 * being sent, in their own mail app, before anything leaves the device — which
 * is honest in a way that a simulated success message is not.
 */
export function ContactForm({ email }: { email: string }) {
  const [category, setCategory] = useState<ContactCategoryId>('editorial');
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState(false);

  const activeCategory = useMemo(
    () => CONTACT_CATEGORIES.find((entry) => entry.id === category) ?? CONTACT_CATEGORIES[0],
    [category],
  );

  const errors = {
    name: name.trim().length >= 2 ? undefined : 'Please enter your name.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail.trim())
      ? undefined
      : 'Please enter a valid email address so we can reply.',
    message:
      message.trim().length >= 20
        ? undefined
        : `Please include at least 20 characters so there is enough context to act on.`,
  };

  const isValid = !errors.name && !errors.email && !errors.message;
  const remaining = MAX_MESSAGE - message.length;

  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    `[GamersPulse ${activeCategory.subjectPrefix}] ${name.trim() || 'Enquiry'}`,
  )}&body=${encodeURIComponent(
    `Category: ${activeCategory.label}\n\n${message.trim()}\n\n---\nFrom: ${name.trim()}\nReply to: ${senderEmail.trim()}`,
  )}`;

  return (
    <form
      className="border border-surface-border bg-white p-6 md:p-8"
      onSubmit={(event) => {
        // Nothing is posted anywhere; the submit is a link to the mail client.
        event.preventDefault();
        setTouched(true);
        if (isValid) window.location.href = mailto;
      }}
      noValidate
    >
      <fieldset className="mb-6">
        <legend className="mb-2 text-[12px] font-semibold uppercase tracking-label text-ink-muted">
          What is this about?
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CONTACT_CATEGORIES.map((entry) => {
            const active = entry.id === category;
            return (
              <button
                key={entry.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(entry.id)}
                className={`border px-3 py-2 text-[13px] font-medium transition-colors ${
                  active
                    ? 'border-accent bg-accent-tint text-accent-hover'
                    : 'border-surface-border bg-canvas text-ink-muted hover:border-ink-faint hover:text-ink'
                }`}
              >
                {entry.label}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[13px] text-ink-muted">{activeCategory.hint}</p>
      </fieldset>

      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-label text-ink-muted">
            Your name
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={70}
            autoComplete="name"
            aria-invalid={touched && Boolean(errors.name)}
            aria-describedby={touched && errors.name ? 'contact-name-error' : undefined}
            className="h-11 w-full rounded border border-surface-border bg-white px-3 text-body-compact text-ink placeholder:text-ink-faint focus:border-accent"
          />
          {touched && errors.name ? (
            <p id="contact-name-error" className="mt-1 flex items-center gap-1 text-[13px] text-error">
              <AlertCircle aria-hidden="true" className="h-3.5 w-3.5" />
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-[12px] font-semibold uppercase tracking-label text-ink-muted">
            Your email
          </label>
          <input
            id="contact-email"
            type="email"
            value={senderEmail}
            onChange={(event) => setSenderEmail(event.target.value)}
            autoComplete="email"
            aria-invalid={touched && Boolean(errors.email)}
            aria-describedby={touched && errors.email ? 'contact-email-error' : undefined}
            className="h-11 w-full rounded border border-surface-border bg-white px-3 text-body-compact text-ink placeholder:text-ink-faint focus:border-accent"
          />
          {touched && errors.email ? (
            <p id="contact-email-error" className="mt-1 flex items-center gap-1 text-[13px] text-error">
              <AlertCircle aria-hidden="true" className="h-3.5 w-3.5" />
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <div className="mb-1.5 flex items-baseline justify-between gap-2">
            <label htmlFor="contact-message" className="block text-[12px] font-semibold uppercase tracking-label text-ink-muted">
              Message
            </label>
            <span
              aria-live="polite"
              className={`text-[11px] ${remaining < 0 ? 'text-error' : 'text-ink-faint'}`}
            >
              {message.length} / {MAX_MESSAGE}
            </span>
          </div>
          <textarea
            id="contact-message"
            rows={7}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={MAX_MESSAGE}
            aria-invalid={touched && Boolean(errors.message)}
            aria-describedby={touched && errors.message ? 'contact-message-error' : undefined}
            className="w-full rounded border border-surface-border bg-white px-3 py-2 text-body-compact text-ink placeholder:text-ink-faint focus:border-accent"
          />
          {touched && errors.message ? (
            <p id="contact-message-error" className="mt-1 flex items-center gap-1 text-[13px] text-error">
              <AlertCircle aria-hidden="true" className="h-3.5 w-3.5" />
              {errors.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 bg-ink px-6 text-body-compact font-semibold text-white transition-colors hover:bg-accent"
        >
          <Send aria-hidden="true" className="h-4 w-4" />
          Open this in your email app
        </button>

        {/*
          Explains the mechanism up front, so nobody expects a confirmation
          the site has no way to send.
        */}
        <p className="text-[13px] leading-relaxed text-ink-muted">
          This site has no mail server, so the form does not transmit anything on its own. Pressing
          the button composes the message above in your own email app, addressed to{' '}
          <strong className="text-ink">{email}</strong>, and you send it from there. Nothing is
          stored by GamersPulse.
        </p>
      </div>
    </form>
  );
}