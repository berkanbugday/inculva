export default function TermsPage() {
  const lastUpdated = "March 4, 2026";
  const APP_URL = process.env["NEXT_PUBLIC_APP_URL"] ?? "https://app.inculva.com";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <header className="border-b border-gray-100 dark:border-gray-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <circle cx="12" cy="5" r="2.5"/>
                <path d="M12 9c-1.1 0-2 .9-2 2v4H7.5l-1.5 4h2l1-2.5H10v3h4v-3h1l1 2.5h2l-1.5-4H14V11c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
            Inculva
          </a>
          <a href="/" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">← Back</a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: {lastUpdated}</p>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using Inculva (&quot;Service&quot;), you agree to be bound by these Terms of Service.
              If you do not agree to all terms, do not use the Service. These terms apply to all users including
              visitors, registered users, and customers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Description of Service</h2>
            <p>
              Inculva provides a web accessibility widget and management platform that allows website owners to
              embed accessibility features on their websites. The Service includes the management dashboard
              at <a href={APP_URL} className="text-blue-600 dark:text-blue-400 underline">{APP_URL}</a>, the
              embeddable JavaScript widget served via CDN, the widget configuration API, and related analytics tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Accounts</h2>
            <p>You must provide accurate information when creating an account. You are responsible for:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Maintaining the security of your account credentials</li>
              <li>All activity that occurs under your account</li>
              <li>Notifying us immediately of any unauthorized access at <a href="mailto:support@inculva.com" className="text-blue-600 dark:text-blue-400 underline">support@inculva.com</a></li>
            </ul>
            <p className="mt-3">
              You must be at least 16 years old to use the Service. Accounts may not be shared with third parties
              without express authorization.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Acceptable Use</h2>
            <p>You agree <strong>not</strong> to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Use the Service for any unlawful purpose or in violation of applicable laws</li>
              <li>Attempt to bypass plan limits, rate limits, or access controls</li>
              <li>Reverse engineer, decompile, or attempt to extract the source code of our proprietary systems</li>
              <li>Use the Service to distribute malware or harmful content</li>
              <li>Impersonate another person or entity</li>
              <li>Resell or sublicense access to the Service without our written consent</li>
              <li>Use automated means to scrape or extract data from the Service beyond normal API usage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Plans, Billing & Payment</h2>
            <p>
              The Service is offered on Free, Pro, and Business plans. Paid plans are billed monthly through
              LemonSqueezy. By subscribing to a paid plan, you authorize us to charge your payment method on a
              recurring basis.
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>All prices are in USD unless otherwise noted. Turkish Lira (TRY) pricing is available at checkout.</li>
              <li>Subscriptions auto-renew. You may cancel at any time from your billing dashboard — cancellation takes effect at the end of the current billing period.</li>
              <li>We do not provide refunds for partial months. If you cancel mid-cycle, you retain access through the end of the paid period.</li>
              <li>We reserve the right to change pricing with 30 days&apos; notice to existing subscribers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Plan Limits</h2>
            <p>
              Each plan has limits on the number of sites, monthly events, and team members. If you exceed your
              monthly event limit, new events will stop being recorded for the remainder of the month. The widget
              itself will continue to function for your visitors. You will receive an email alert at 80% of your limit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Intellectual Property</h2>
            <p>
              The Inculva widget code is <strong>open source</strong> — the widget itself is available under the
              MIT License. The management dashboard, API, and related platform code are proprietary and owned by
              Inculva. You retain all rights to your own website content and data.
            </p>
            <p className="mt-3">
              By using the Service, you grant us a limited license to process your data solely to provide the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. WCAG Compliance Disclaimer</h2>
            <p>
              <strong>Important:</strong> The Inculva widget provides user-facing accessibility controls that help
              users adapt how they experience your website. It does <strong>not</strong> automatically make your
              website fully compliant with WCAG 2.1 AA, the European Accessibility Act, the ADA, or any other
              accessibility standard. Full compliance requires accessible underlying code, semantic HTML, keyboard
              navigability, and other development practices beyond the scope of this widget.
            </p>
            <p className="mt-3">
              Inculva makes no warranty that use of the Service will satisfy any legal accessibility requirement
              or protect you from legal liability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9. Availability & SLA</h2>
            <p>
              We aim for 99.9% uptime for the widget CDN and API. However, we do not guarantee uninterrupted
              availability. The widget is designed to be resilient — if our API is unavailable, the widget continues
              to function using previously loaded configuration. Business plan customers receive priority support.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">10. Termination</h2>
            <p>
              You may terminate your account at any time from Settings → Danger Zone. We may suspend or terminate
              accounts that violate these Terms, with or without notice. Upon termination, your data will be deleted
              within 30 days, except where retention is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">11. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Inculva shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including loss of profits or data, arising from your use
              of the Service. Our total liability in any matter arising from these Terms or your use of the Service
              shall not exceed the amount you paid to us in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">12. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
              BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">13. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the European Union and applicable member state law, without
              regard to conflict of law provisions. Disputes shall be resolved through good-faith negotiation first.
              If unresolved, disputes shall be submitted to the competent courts in the EU.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">14. Changes to Terms</h2>
            <p>
              We may update these Terms. We will notify registered users by email at least 14 days before material
              changes take effect. Continued use of the Service after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">15. Contact</h2>
            <p>
              Questions about these Terms? Contact us at:<br />
              <a href="mailto:support@inculva.com" className="text-blue-600 dark:text-blue-400 underline">support@inculva.com</a>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-100 dark:border-gray-800 px-6 py-8 mt-12">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Inculva. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</a>
            <a href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
