import Link from "next/link";

type AuditReportPageProps = {
  params: Promise<{
    date: string;
    slug: string;
  }>;
};

const FALLBACK_REPORT = {
  auditedUrl: "https://example.com",
  baselineRequests: 142,
  gpcRequests: 38,
  trackersBlocked: 104,
  generatedAtUtc: "2026-03-07T22:45:00Z",
  summary:
    "GPC signal materially reduced third-party tracking traffic. Privacy controls responded to Sec-GPC: 1 and lowered outbound tracker requests by 73%.",
};

export default async function AuditReportPage({ params }: AuditReportPageProps) {
  const { date, slug } = await params;

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">GPC Auditor Report</p>
        <h1 className="mt-2 text-2xl font-bold">Audit report: {slug}</h1>
        <p className="mt-1 text-sm text-zinc-600">Report date: {date}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Metric label="Baseline requests" value={FALLBACK_REPORT.baselineRequests} />
          <Metric label="With GPC" value={FALLBACK_REPORT.gpcRequests} />
          <Metric label="Trackers blocked" value={FALLBACK_REPORT.trackersBlocked} />
        </div>

        <section className="mt-6 rounded-xl bg-zinc-100 p-4">
          <h2 className="text-sm font-semibold">Summary</h2>
          <p className="mt-2 text-sm text-zinc-700">{FALLBACK_REPORT.summary}</p>
        </section>

        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between gap-4 border-b border-zinc-200 pb-2">
            <dt className="text-zinc-600">Audited URL</dt>
            <dd className="font-medium">{FALLBACK_REPORT.auditedUrl}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-zinc-200 pb-2">
            <dt className="text-zinc-600">Generated (UTC)</dt>
            <dd className="font-medium">{FALLBACK_REPORT.generatedAtUtc}</dd>
          </div>
          <div className="flex justify-between gap-4 pb-2">
            <dt className="text-zinc-600">Report path</dt>
            <dd className="font-medium">/audit/{date}/{slug}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100"
          >
            Back to home
          </Link>
          <Link
            href={`/api/audit/${encodeURIComponent(FALLBACK_REPORT.auditedUrl)}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Re-run API audit
          </Link>
        </div>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
      <p className="text-xs text-zinc-600">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
