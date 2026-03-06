'use client'

import Link from 'next/link'
import { CheckoutForm } from './CheckoutForm'

export function ClientLanding() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-12">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-8 text-white shadow-2xl lg:p-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/70">
              GPC Auditor v1.3
            </span>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Ship privacy proof before regulators or partners ask for it.
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-zinc-400">
              Paste a URL, pay via Stripe, and receive dual-run evidence showing
              how your site behaves when a browser sends{' '}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-zinc-200">
                Sec-GPC: 1
              </code>.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: 'Dual-run evidence', desc: 'Baseline vs GPC header comparison' },
                { title: 'Tracker intelligence', desc: 'Domain-level tracker classification' },
                { title: 'Regulator-ready pack', desc: 'PDF certificate and diff export' },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-medium text-white">{f.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <CheckoutForm variant="light" />
            <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">Demo snapshot</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-zinc-950/60 p-4 text-center">
                  <p className="text-3xl font-bold text-red-400">142</p>
                  <p className="mt-1 text-xs text-zinc-500">Baseline trackers</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-zinc-950/60 p-4 text-center">
                  <p className="text-3xl font-bold text-emerald-400">38</p>
                  <p className="mt-1 text-xs text-zinc-500">With GPC header</p>
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-zinc-600">73% tracker reduction detected</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-center text-2xl font-bold text-zinc-900 sm:text-3xl">Why teams upgrade</h2>
        <p className="mb-12 text-center text-zinc-500">Three pillars that turn a compliance question into a compliance answer.</p>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Network request diff', desc: 'Side-by-side comparison of every outbound request with and without the GPC signal.' },
            { title: 'Screenshots that matter', desc: 'Full-page captures of both browser passes so you can visually confirm consent banners react to Sec-GPC.' },
            { title: 'Automation-friendly API', desc: 'POST a URL, receive a structured JSON report. Plug into CI/CD or your compliance dashboard.' },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-zinc-900">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing">
        <h2 className="mb-2 text-center text-2xl font-bold text-zinc-900 sm:text-3xl">Simple, transparent pricing</h2>
        <p className="mb-12 text-center text-zinc-500">Pick a plan. Audit today. Cancel anytime.</p>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-zinc-900">Starter</h3>
            <p className="mt-1 text-sm text-zinc-500">For individual developers</p>
            <p className="mt-4 text-4xl font-bold text-zinc-900">{'$'}49<span className="text-base font-normal text-zinc-400">/mo</span></p>
            <ul className="mt-6 flex-1 space-y-3 text-sm text-zinc-600">
              {['1 site', 'Email support', 'PDF certificate', 'Tracker diff', 'Dual-run evidence'].map((f) => (
                <li key={f} className="flex items-start gap-2"><span className="mt-0.5 text-emerald-500">&#10003;</span>{f}</li>
              ))}
            </ul>
            <a href="#pricing" className="mt-6 block rounded-lg border border-zinc-200 py-2.5 text-center text-sm font-medium text-zinc-700 transition hover:bg-zinc-50">Get started</a>
          </div>
          <div className="relative flex flex-col rounded-2xl border-2 border-blue-500 bg-white p-6 shadow-lg">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-0.5 text-xs font-semibold text-white">Most Popular</span>
            <h3 className="text-lg font-semibold text-zinc-900">Professional</h3>
            <p className="mt-1 text-sm text-zinc-500">For growing teams</p>
            <p className="mt-4 text-4xl font-bold text-zinc-900">{'$'}99<span className="text-base font-normal text-zinc-400">/mo</span></p>
            <ul className="mt-6 flex-1 space-y-3 text-sm text-zinc-600">
              {['5 sites', 'Team invites', 'Priority support', 'Scheduled re-scans', 'CI/CD API access'].map((f) => (
                <li key={f} className="flex items-start gap-2"><span className="mt-0.5 text-emerald-500">&#10003;</span>{f}</li>
              ))}
            </ul>
            <a href="#pricing" className="mt-6 block rounded-lg bg-blue-500 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-600">Get started</a>
          </div>
          <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-zinc-900">Agency</h3>
            <p className="mt-1 text-sm text-zinc-500">For consultancies and agencies</p>
            <p className="mt-4 text-4xl font-bold text-zinc-900">{'$'}199<span className="text-base font-normal text-zinc-400">/mo</span></p>
            <ul className="mt-6 flex-1 space-y-3 text-sm text-zinc-600">
              {['Unlimited sites', 'Dedicated account manager', 'Bulk CSV export', 'Custom branding', 'White-label PDFs'].map((f) => (
                <li key={f} className="flex items-start gap-2"><span className="mt-0.5 text-emerald-500">&#10003;</span>{f}</li>
              ))}
            </ul>
            <a href="#pricing" className="mt-6 block rounded-lg border border-zinc-200 py-2.5 text-center text-sm font-medium text-zinc-700 transition hover:bg-zinc-50">Get started</a>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-zinc-500">
          <Link href="/dashboard/demo" className="text-blue-500 underline underline-offset-2 hover:text-blue-600">View sample audit report</Link>
        </p>
      </section>

      <section>
        <h2 className="mb-12 text-center text-2xl font-bold text-zinc-900 sm:text-3xl">How it works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { step: '1', title: 'Submit a production URL', desc: 'Paste any publicly-accessible URL. We validate and normalize it automatically.' },
            { step: '2', title: 'We run two isolated browsers', desc: 'A baseline pass without GPC, then a second pass with Sec-GPC: 1. Both capture every network request and a full-page screenshot.' },
            { step: '3', title: 'Share the compliance proof', desc: 'Download the diff report, PDF certificate, and screenshots. Forward directly to your legal or compliance team.' },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white">{s.step}</span>
              <h3 className="text-lg font-semibold text-zinc-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-10 text-white lg:p-14">
        <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">Privacy-first build</h2>
        <p className="mb-10 text-center text-zinc-400">We audit privacy, so we take ours seriously too.</p>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Strict URL allowlist', desc: 'SSRF protection blocks private IPs, internal hostnames, and credentialed URLs before any browser launches.' },
            { title: 'Short-lived access', desc: 'Session cookies expire after 2 hours. Audit data is purged after 30 days unless you extend retention.' },
            { title: 'Data minimization', desc: 'We capture request URLs and screenshots only. No DOM scraping, no form data, no PII extraction.' },
          ].map((p) => (
            <div key={p.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-base font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-10 text-center text-2xl font-bold text-zinc-900 sm:text-3xl">Frequently asked questions</h2>
        <div className="mx-auto max-w-2xl space-y-4">
          {[
            { q: 'What if a site blocks headless browsers?', a: 'We use stealth techniques and real Chromium builds. If a site still blocks the audit, we flag the issue with guidance on allowlisting.' },
            { q: 'Do we need to deploy a snippet?', a: 'No. GPC Auditor runs entirely externally. No tags, SDKs, or code changes required on your site.' },
            { q: 'Can I invite teammates?', a: 'Yes. Professional and Agency plans include team invites. Each member gets their own login and can view all audit reports.' },
          ].map((faq) => (
            <details key={faq.q} className="group rounded-2xl border border-zinc-200 bg-white">
              <summary className="cursor-pointer select-none px-6 py-4 text-sm font-medium text-zinc-900">
                <span className="flex items-center justify-between">
                  {faq.q}
                  <span className="ml-2 text-zinc-400 transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="px-6 pb-4 text-sm leading-relaxed text-zinc-500">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-10 text-center text-white lg:p-14">
        <h2 className="mb-2 text-2xl font-bold sm:text-3xl">Ready to prove GPC compliance?</h2>
        <p className="mx-auto mb-8 max-w-md text-zinc-400">Start your first audit in under two minutes. No code changes, no integration required.</p>
        <div className="mx-auto max-w-sm">
          <CheckoutForm variant="dark" />
        </div>
      </section>

      <footer className="border-t border-zinc-200 pt-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="/about" className="hover:text-zinc-700">About</Link>
            <Link href="/terms" className="hover:text-zinc-700">Terms</Link>
            <Link href="/privacy" className="hover:text-zinc-700">Privacy</Link>
          </div>
          <p className="text-sm text-zinc-400">&#169; 2026 Delicious Productions Limited</p>
        </div>
      </footer>
    </div>
  )
}
