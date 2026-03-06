export default function Privacy() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-20 text-zinc-900">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Last updated: March 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-600">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">
              1. Data We Collect
            </h2>
            <p>
              When you use GPC Auditor, we collect: the URLs you submit for
              auditing, your email address (via Stripe), and basic usage
              analytics. We do not scrape, store, or process any content from
              the pages we audit beyond network request URLs and screenshots.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">
              2. How We Use Your Data
            </h2>
            <p>
              URLs are used solely to perform the GPC audit. Email addresses are
              used for account management and transactional notifications.
              Screenshots and request logs are stored temporarily (30 days by
              default) and then purged.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">
              3. Data Sharing
            </h2>
            <p>
              We do not sell your data. We share information with Stripe for
              payment processing and with cloud hosting providers
              (Vercel/AWS) as required to run the Service. All sub-processors
              are GDPR-compliant.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">
              4. Data Retention
            </h2>
            <p>
              Audit reports are retained for 30 days by default. Professional
              and Agency plans can extend retention. You may request deletion of
              your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">
              5. Cookies
            </h2>
            <p>
              We use session cookies (2-hour expiry) for authentication. We do
              not use third-party tracking cookies. The irony is not lost on us.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">
              6. Contact
            </h2>
            <p>
              For privacy-related inquiries, contact us at
              privacy@deliciousproductions.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
