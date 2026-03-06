export default function Terms() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-20 text-zinc-900">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Last updated: March 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-600">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">
              1. Acceptance
            </h2>
            <p>
              By accessing or using GPC Auditor (&quot;the Service&quot;),
              operated by Delicious Productions Limited (&quot;we&quot;,
              &quot;us&quot;), you agree to be bound by these Terms. If you do
              not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">
              2. Service Description
            </h2>
            <p>
              GPC Auditor provides automated website auditing for Global Privacy
              Control (Sec-GPC) compliance. We run headless browser passes
              against URLs you submit and generate comparison reports.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">
              3. Subscriptions & Billing
            </h2>
            <p>
              Paid plans are billed monthly via Stripe. You may cancel at any
              time; access continues through the end of the current billing
              period. Refunds are handled on a case-by-case basis.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">
              4. Acceptable Use
            </h2>
            <p>
              You may only audit URLs you own or have explicit permission to
              test. You must not use the Service to scan sites for malicious
              purposes, denial-of-service, or any unlawful activity.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">
              5. Limitation of Liability
            </h2>
            <p>
              The Service is provided &quot;as is&quot; without warranties of
              any kind. We are not liable for indirect, incidental, or
              consequential damages arising from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">
              6. Contact
            </h2>
            <p>
              For questions about these Terms, contact us at
              legal@deliciousproductions.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
