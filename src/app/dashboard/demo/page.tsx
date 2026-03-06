import Link from 'next/link'

const FINDINGS = [
  {
    tracker: 'Meta Pixel (connect.facebook.net)',
    severity: 'CRITICAL',
    sevColor: 'bg-red-500',
    detail:
      'Meta Pixel continued firing with GPC=1. 14 requests observed post-signal, including PageView and ViewContent events. Facebook does not currently honor Sec-GPC.',
    regulation: 'CCPA §1798.135, CPRA §1798.185',
  },
  {
    tracker: 'GA4 (google-analytics.com)',
    severity: 'CRITICAL',
    sevColor: 'bg-red-500',
    detail:
      'Google Analytics 4 measurement protocol requests persisted with GPC=1 header. 9 collect requests sent including page_view, scroll, and user_engagement events.',
    regulation: 'CCPA §1798.135',
  },
  {
    tracker: 'Hotjar (script.hotjar.com)',
    severity: 'HIGH',
    sevColor: 'bg-orange-500',
    detail:
      'Hotjar session recording script loaded and initialized despite GPC signal. Heatmap and recording data transmitted to Hotjar servers.',
    regulation: 'GDPR Art. 6, ePrivacy Directive',
  },
  {
    tracker: 'TikTok Pixel (analytics.tiktok.com)',
    severity: 'HIGH',
    sevColor: 'bg-orange-500',
    detail:
      'TikTok analytics pixel fired PageView event with GPC=1 present. Conversion tracking remained active.',
    regulation: 'CCPA §1798.135',
  },
  {
    tracker: 'Segment (cdn.segment.com)',
    severity: 'MEDIUM',
    sevColor: 'bg-yellow-500',
    detail:
      'Segment analytics.js loaded but partially reduced event volume. Some identify and track calls still observed with GPC active.',
    regulation: 'CCPA §1798.135',
  },
  {
    tracker: 'Google Fonts (fonts.googleapis.com)',
    severity: 'LOW',
    sevColor: 'bg-blue-500',
    detail:
      'Google Fonts requests observed in both passes. While not a tracker per se, the request leaks visitor IP to Google. Consider self-hosting fonts.',
    regulation: 'GDPR Art. 6 (Telekom v. Google, LG München)',
  },
]

export default function DemoReport() {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-12 text-zinc-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="text-sm text-brand-500 hover:text-brand-600"
          >
            ← Back
          </Link>
          <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-semibold text-amber-700">
            Demo Report
          </span>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">
                GPC Compliance Audit
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                Site:{' '}
                <span className="font-medium text-zinc-700">
                  demo-shop.example.com
                </span>
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              NON-COMPLIANT
            </span>
          </div>

          <p className="mb-6 text-sm text-zinc-500">
            6 trackers remained active with{' '}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-700">
              Sec-GPC: 1
            </code>{' '}
            header present.
          </p>

          {/* Stats grid */}
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Baseline requests', value: '187', color: 'text-zinc-900' },
              { label: 'With GPC', value: '38', color: 'text-emerald-600' },
              { label: 'Critical / High', value: '4', color: 'text-red-600' },
              { label: 'Tracker requests', value: '38', color: 'text-amber-600' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 text-center"
              >
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Regulatory warning */}
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4">
            <h3 className="text-sm font-semibold text-red-800">
              Regulatory Exposure
            </h3>
            <p className="mt-1 text-sm text-red-700">
              This site does not honor the Global Privacy Control signal as
              required by CCPA/CPRA. Under California law, failure to treat GPC
              as a valid opt-out of sale/sharing may result in enforcement
              action by the California Attorney General or the CPPA.
            </p>
          </div>

          {/* Findings */}
          <h2 className="mb-4 text-lg font-bold text-zinc-900">
            Detailed Findings
          </h2>
          <div className="space-y-4">
            {FINDINGS.map((f) => (
              <div
                key={f.tracker}
                className="rounded-xl border border-zinc-200 p-4"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-bold text-white ${f.sevColor}`}
                  >
                    {f.severity}
                  </span>
                  <span className="text-sm font-semibold text-zinc-900">
                    {f.tracker}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-600">
                  {f.detail}
                </p>
                <p className="mt-2 text-xs text-zinc-400">
                  Relevant: {f.regulation}
                </p>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            <h2 className="mb-3 text-lg font-bold text-zinc-900">
              Recommendations
            </h2>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-brand-500">→</span>
                Implement server-side GPC detection and conditionally suppress
                tracker scripts when Sec-GPC: 1 is present.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-brand-500">→</span>
                Configure Google Tag Manager to respect the GPC signal via a
                custom variable or Consent Mode v2 integration.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-brand-500">→</span>
                Self-host Google Fonts to eliminate external requests and comply
                with EU court rulings.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-brand-500">→</span>
                Re-run this audit after implementing changes to verify
                compliance. Schedule recurring audits on the Professional plan.
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link
              href="/#pricing"
              className="inline-block rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Run your own audit →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
