export default function About() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-20 text-zinc-900">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">About GPC Auditor</h1>
        <p className="mt-4 text-zinc-600">
          GPC Auditor is a product of Delicious Productions Limited. We provide
          automated compliance evidence for the Global Privacy Control (Sec-GPC)
          signal.
        </p>
        <p className="mt-4 text-zinc-600">
          Our service runs dual headless browser passes — one baseline and one
          with the GPC header — to produce diffable proof of your site&apos;s
          privacy posture.
        </p>
      </div>
    </div>
  )
}
