'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'

const PLANS = [
  { label: 'Starter', price: '49', priceId: '49' },
  { label: 'Pro', price: '99', priceId: '99' },
  { label: 'Agency', price: '199', priceId: '199' },
] as const

function normalizeUrl(raw: string): string {
  if (!raw) return ''
  let u = raw.trim()
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u
  try {
    return new URL(u).toString()
  } catch {
    return u
  }
}

function CheckoutForm({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [url, setUrl] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('49')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const normalized = useMemo(() => normalizeUrl(url), [url])

  const handleSubmit = async (e: React.FormEvent, confirmLive = false) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalized, priceId: selectedPlan, confirmLive }),
      })
      const data = await res.json()

      if (data.needsLiveConfirm) {
        if (confirm('Test Stripe keys missing — this will use LIVE keys. Continue?')) {
          return handleSubmit(e, true)
        }
        setLoading(false)
        return
      }

      if (!res.ok) throw new Error(data.error || 'Checkout failed')
      if (data.url) window.location.href = data.url
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const isDark = variant === 'dark'
  const cardBg = isDark
    ? 'bg-zinc-800/60 border-white/10'
    : 'bg-white border-zinc-200'
  const inputBg = isDark
    ? 'bg-zinc-900/60 border-white/10 text-white placeholder:text-zinc-500'
    : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400'
  const labelColor = isDark ? 'text-zinc-300' : 'text-zinc-600'
  const normalizedColor = isDark ? 'text-zinc-400' : 'text-zinc-500'

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl border p-6 ${cardBg}`}
    >
      <div className="mb-4">
        <label className={`mb-1.5 block text-sm font-medium ${labelColor}`}>
          Site URL
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="example.com"
          className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 ${inputBg}`}
          required
        />
        {url && (
          <p className={`mt-1.5 truncate text-xs ${normalizedColor}`}>
            → {normalized}
          </p>
        )}
      </div>

      <div className="mb-5">
        <label className={`mb-1.5 block text-sm font-medium ${labelColor}`}>
          Plan
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PLANS.map((plan) => (
            <button
              key={plan.priceId}
              type="button"
              onClick={() => setSelectedPlan(plan.priceId)}
              className={`rounded-lg border px-3 py-2 text-center text-sm font-medium transition ${
                selectedPlan === plan.priceId
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : isDark
                    ? 'border-white/10 bg-zinc-900/40 text-zinc-300 hover:border-white/20'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
              }`}
            >
              ${plan.price}
              <span className="block text-xs font-normal opacity-70">
                /mo
              </span>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="mb-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !url}
        className="w-full rounded-lg bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-50"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Redirecting to Stripe…
          </span>
        ) : (
          'Unlock audit →'
        )}
      </button>
    </form>
  )
}

export function ClientLanding() {
  const SectionBadge = ({ children }: { children: React.ReactNode }) => (
    <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
      {children}
    </span>
  )
  return (
    <>
      {/* Hero */}
      <section className="px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-white/[0.06]">
          <div className="grid gap-8 p-8 lg:grid-cols-2 lg:gap-12 lg:p-14">
            {/* Left */}
            <div className="flex flex-col justify-center">
              <SectionBadge>GPC Auditor · v1.3</SectionBadge>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ship privacy proof before regulators or partners ask for it.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400">
                Paste a URL, swipe a Stripe card, and receive dual-run
                evidence — baseline vs.{' '}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-zinc-200">
                  Sec-GPC:&nbsp;1
                </code>{' '}
                — in under two minutes.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: '⇄',
                    title: 'Dual-run evidence',
                    desc: 'Baseline vs GPC header comparison',
                  },
                  {
                    icon: '◉',
                    title: 'Tracker intelligence',
                    desc: 'Domain-level tracker classification',
                  },
                  {
                    icon: '✓',
                    title: 'Regulator-ready pack',
                    desc: 'PDF certificate & diff export',
                  },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4"
                  >
                    <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-300">
                      {f.icon}
                    </span>
                    <p className="text-sm font-medium text-white">{f.title}</p>
                    <p className="mt-1 text-xs text-zinc-500">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — checkout + demo snapshot */}
            <div className="flex flex-col gap-6">
              <CheckoutForm variant="light" />

              {/* Demo snapshot panel */}
              <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Demo snapshot
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/[0.06] bg-zinc-950/60 p-4 text-center">
                    <p className="text-3xl font-bold text-red-400">142</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Baseline trackers
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-zinc-950/60 p-4 text-center">
                    <p className="text-3xl font-bold text-emerald-400">38</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      With GPC header
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-center text-xs text-zinc-600">
                  73% tracker reduction detected
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why teams upgrade */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-zinc-900 sm:text-3xl">
            Why teams upgrade
          </h2>
          <p className="mb-12 text-center text-zinc-500">
            Three pillars that turn a compliance question into a compliance
            answer.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: '⟷',
                title: 'Network request diff',
                desc: 'Side-by-side comparison of every outbound request with and without the GPC signal — exportable as JSON or CSV.',
              },
              {
                icon: '📷',
                title: 'Screenshots that matter',
                desc: 'Full-page captures of both browser passes so you can visually confirm consent banners react to Sec-GPC.',
              },
              {
                icon: '⚡',
                title: 'Automation-friendly API',
                desc: 'POST a URL, receive a structured JSON report. Plug into CI/CD, scheduled cron audits, or your compliance dashboard.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-lg text-brand-500">
                  {card.icon}
                </span>
                <h3 className="text-lg font-semibold text-zinc-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-zinc-900 sm:text-3xl">
            Simple, transparent pricing
          </h2>
          <p className="mb-12 text-center text-zinc-500">
            Pick a plan. Audit today. Cancel anytime.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Starter */}
            <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-zinc-900">Starter</h3>
              <p className="mt-1 text-sm text-zinc-500">
                For individual developers
              </p>
              <p className="mt-4 text-4xl font-bold text-zinc-900">
                $49<span className="text-base font-normal text-zinc-400">/mo</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-zinc-600">
                {[
                  '1 site',
                  'Email support',
                  'PDF certificate',
                  'Tracker diff',
                  'Dual-run evidence',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#pricing"
                className="mt-6 block rounded-lg border border-zinc-200 py-2.5 text-center text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                Get started
              </a>
            </div>

            {/* Professional */}
            <div className="relative flex flex-col rounded-2xl border-2 border-brand-500 bg-white p-6 shadow-lg">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-0.5 text-xs font-semibold text-white">
                Most Popular
              </span>
              <h3 className="text-lg font-semibold text-zinc-900">
                Professional
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                For growing teams
              </p>
              <p className="mt-4 text-4xl font-bold text-zinc-900">
                $99<span className="text-base font-normal text-zinc-400">/mo</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-zinc-600">
                {[
                  '5 sites',
                  'Team invites',
                  'Priority support',
                  'Scheduled re-scans',
                  'CI/CD API access',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#pricing"
                className="mt-6 block rounded-lg bg-brand-500 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Get started
              </a>
            </div>

            {/* Agency */}
            <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-zinc-900">Agency</h3>
              <p className="mt-1 text-sm text-zinc-500">
                For consultancies & agencies
              </p>
              <p className="mt-4 text-4xl font-bold text-zinc-900">
                $199<span className="text-base font-normal text-zinc-400">/mo</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-zinc-600">
                {[
                  'Unlimited sites',
                  'Dedicated account manager',
                  'Bulk CSV export',
                  'Custom branding',
                  'White-label PDFs',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#pricing"
                className="mt-6 block rounded-lg border border-zinc-200 py-2.5 text-center text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
              >
                Get started
              </a>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-500">
            <Link
              href="/dashboard/demo"
              className="text-brand-500 underline underline-offset-2 hover:text-brand-600"
            >
              View sample audit report →
            </Link>
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-2xl font-bold text-zinc-900 sm:text-3xl">
            How it works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Submit a production URL',
                desc: 'Paste any publicly-accessible URL into the form. We validate and normalize it automatically.',
              },
              {
                step: '2',
                title: 'We run two isolated browsers',
                desc: 'A baseline pass without GPC, then a second pass with Sec-GPC: 1. Both capture every network request and a full-page screenshot.',
              },
              {
                step: '3',
                title: 'Share the compliance proof',
                desc: 'Download the diff report, PDF certificate, and screenshots. Forward directly to your legal or compliance team.',
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-lg font-bold text-white">
                  {s.step}
                </span>
                <h3 className="text-lg font-semibold text-zinc-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy-first build */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-white/[0.06] p-10 lg:p-14">
          <h2 className="mb-2 text-center text-2xl font-bold text-white sm:text-3xl">
            Privacy-first build
          </h2>
          <p className="mb-10 text-center text-zinc-400">
            We audit privacy — so we take ours seriously too.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: '🛡',
                title: 'Strict URL allowlist',
                desc: 'SSRF protection blocks private IPs, internal hostnames, and credentialed URLs before any browser launches.',
              },
              {
                icon: '⏱',
                title: 'Short-lived access',
                desc: 'Session cookies expire after 2 hours. Audit data is purged after 30 days unless you extend retention.',
              },
              {
                icon: '📉',
                title: 'Data minimization',
                desc: 'We capture request URLs and screenshots — nothing more. No DOM scraping, no form data, no PII extraction.',
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6"
              >
                <span className="mb-3 block text-2xl">{p.icon}</span>
                <h3 className="text-base font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-zinc-900 sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'What if a site blocks headless browsers?',
                a: 'We use stealth techniques and real Chromium builds to minimize detection. If a site still blocks the audit, we'll flag the issue in the report with guidance on how to allowlist our IP range for scheduled audits.',
              },
              {
                q: 'Do we need to deploy a snippet?',
                a: 'No. GPC Auditor runs entirely externally — no tags, SDKs, or code changes required on your site. Just provide the URL and we handle the rest.',
              },
              {
                q: 'Can I invite teammates?',
                a: 'Yes. Professional and Agency plans include team invites. Each member gets their own login and can view all audit reports for the organization.',
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-zinc-200 bg-white"
              >
                <summary className="cursor-pointer select-none px-6 py-4 text-sm font-medium text-zinc-900 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between">
                    {faq.q}
                    <span className="ml-2 text-zinc-400 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="px-6 pb-4 text-sm leading-relaxed text-zinc-500">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[32px] bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-white/[0.06] p-10 lg:p-14">
          <h2 className="mb-2 text-center text-2xl font-bold text-white sm:text-3xl">
            Ready to prove GPC compliance?
          </h2>
          <p className="mx-auto mb-8 max-w-md text-center text-zinc-400">
            Start your first audit in under two minutes. No code changes, no
            integration required.
          </p>
          <div className="mx-auto max-w-sm">
            <CheckoutForm variant="dark" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="/about" className="hover:text-zinc-700">
              About
            </Link>
            <Link href="/terms" className="hover:text-zinc-700">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-zinc-700">
              Privacy
            </Link>
          </div>
          <p className="text-sm text-zinc-400">
            © 2026 Delicious Productions Limited
          </p>
        </div>
      </footer>
    </>
  )
}
