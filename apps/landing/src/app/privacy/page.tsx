export default function PrivacyPage() {
  const lastUpdated = "March 4, 2026";

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
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: {lastUpdated}</p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Who We Are</h2>
            <p>
              Inculva (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) provides a web accessibility widget and management platform
              at <strong>inculva.com</strong> and <strong>app.inculva.com</strong>. This Privacy Policy explains how we
              collect, use, and protect your personal data in compliance with the General Data Protection Regulation
              (GDPR), the California Consumer Privacy Act (CCPA), and other applicable privacy laws.
            </p>
            <p className="mt-3">
              For questions about this policy, contact us at: <a href="mailto:privacy@inculva.com" className="text-blue-600 dark:text-blue-400 underline">privacy@inculva.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Data We Collect</h2>

            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2 mt-4">2a. Account Data (Dashboard Users)</h3>
            <p>When you create an Inculva account, we collect:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Name and email address</li>
              <li>Hashed password (we never store plaintext passwords)</li>
              <li>Billing information (handled by LemonSqueezy — we receive a customer ID only)</li>
              <li>Site domains you register</li>
              <li>API keys you generate (stored as SHA-256 hashes)</li>
            </ul>

            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2 mt-4">2b. Widget Analytics Data (Your Visitors)</h3>
            <p>
              When the Inculva widget is installed on your site, we record anonymized usage events. These events
              include a random <strong>session ID</strong> (not linked to any user identity), the type of accessibility
              feature enabled, and a timestamp. We do <strong>not</strong> collect:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>IP addresses of widget users</li>
              <li>Names, emails, or any personal identifiers of your visitors</li>
              <li>Page content or keystrokes</li>
              <li>Cross-site tracking data</li>
            </ul>
            <p className="mt-3">
              Accessibility preferences (text size, contrast mode, etc.) are stored only in the visitor&apos;s
              browser <strong>localStorage</strong> — never on our servers.
            </p>

            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2 mt-4">2c. Technical Data</h3>
            <p>We collect standard server logs including IP address, browser user-agent, and request timestamps for
            security monitoring and rate limiting. Logs are retained for 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide and maintain the Inculva service</li>
              <li>To send transactional emails (email verification, password resets, billing receipts)</li>
              <li>To send usage alerts when you approach plan limits (you can unsubscribe)</li>
              <li>To enforce plan limits and prevent abuse</li>
              <li>To improve the service based on aggregated, anonymized usage patterns</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell your personal data to third parties. We do not use your data for
              advertising.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Legal Basis for Processing (GDPR)</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contract performance</strong> — processing necessary to provide the service you signed up for</li>
              <li><strong>Legitimate interests</strong> — security monitoring, fraud prevention, service improvement</li>
              <li><strong>Legal obligation</strong> — compliance with EU/US laws</li>
              <li><strong>Consent</strong> — marketing communications (you can opt out at any time)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Data Retention</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account data: retained until you delete your account</li>
              <li>Widget events: retained for 90 days (rolling)</li>
              <li>Server logs: 30 days</li>
              <li>Billing records: 7 years (legal requirement)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Third-Party Services</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>LemonSqueezy</strong> — payment processing. Handles all payment card data. Privacy policy: lemonsqueezy.com/privacy</li>
              <li><strong>Resend</strong> — transactional email delivery. Privacy policy: resend.com/privacy</li>
              <li><strong>Railway / Vercel</strong> — infrastructure hosting. Servers are located in the EU and/or US.</li>
              <li><strong>Cloudflare</strong> — CDN for widget.js delivery. No personal data is shared with Cloudflare.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Your Rights (GDPR / CCPA)</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Access</strong> — request a copy of all personal data we hold about you</li>
              <li><strong>Portability</strong> — export your data in machine-readable format (available from Settings → Export Data)</li>
              <li><strong>Rectification</strong> — correct inaccurate personal data</li>
              <li><strong>Erasure</strong> — delete your account and all associated data (available from Settings → Danger Zone)</li>
              <li><strong>Restriction</strong> — request we stop processing your data in certain circumstances</li>
              <li><strong>Objection</strong> — object to processing based on legitimate interests</li>
              <li><strong>Withdrawal of consent</strong> — unsubscribe from marketing emails at any time</li>
            </ul>
            <p className="mt-3">
              To exercise any right, email <a href="mailto:privacy@inculva.com" className="text-blue-600 dark:text-blue-400 underline">privacy@inculva.com</a>.
              We respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. Cookies</h2>
            <p>
              The Inculva management dashboard (<strong>app.inculva.com</strong>) uses cookies for authentication
              session management only. No analytics cookies, no advertising cookies, no third-party tracking cookies
              are set.
            </p>
            <p className="mt-3">
              The widget embedded on your visitors&apos; sites does <strong>not</strong> use cookies — it uses
              localStorage exclusively for storing accessibility preferences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9. Data Security</h2>
            <p>
              We use industry-standard security practices: TLS encryption in transit, bcrypt password hashing,
              SHA-256 API key hashing, and access controls. No system is 100% secure — if you discover a
              vulnerability, please report it to <a href="mailto:security@inculva.com" className="text-blue-600 dark:text-blue-400 underline">security@inculva.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">10. International Transfers</h2>
            <p>
              Your data may be processed in the United States and the European Union. When transferring data from
              the EU to the US, we rely on Standard Contractual Clauses (SCCs) and use processors with adequate
              safeguards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this policy. When we do, we&apos;ll update the &quot;Last updated&quot; date at the top and,
              for material changes, send an email notification to registered users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">12. Contact</h2>
            <p>
              Inculva<br />
              Email: <a href="mailto:privacy@inculva.com" className="text-blue-600 dark:text-blue-400 underline">privacy@inculva.com</a><br />
              For EU residents: you have the right to lodge a complaint with your local data protection authority.
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
