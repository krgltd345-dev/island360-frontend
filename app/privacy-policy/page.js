import React from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export const metadata = {
  title: "Privacy Policy | Island 360",
  description: "Privacy Policy for Island 360.",
};

export default function PrivacyPolicyPage() {
  return (
    <LayoutWrapper>
      <main className="min-h-[calc(100vh-154px)] bg-slate-50">
        <div className="">
          <header className="bg-gradient-to-br from-cyan-700 via-sky-600 to-blue-700 text-white pt-24 py-16 px-6 text-center shadow-xl">
            {/* <h1 className="text-5xl mb-2">Island 360</h1>  */}
            <h2 className="text-2xl font-light text-cyan-100 tracking-widest">Privacy Policy</h2>
            {/* <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="bg-white/15 backdrop-blur rounded-full px-4 py-1.5">📅 February 2026</span>
              <span className="bg-white/15 backdrop-blur rounded-full px-4 py-1.5">📍 11954 Narcoossee Rd Suite 607, Orlando, FL 32832</span>
              <span className="bg-white/15 backdrop-blur rounded-full px-4 py-1.5">✉️ support@island360.com</span>
              <span className="bg-white/15 backdrop-blur rounded-full px-4 py-1.5">⚖️ Governing Law: Florida</span>
            </div> */}
          </header>

          <main className="max-w-4xl mx-auto px-6 py-12 space-y-5">

            <section id="s1" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">1. Introduction</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p>Island 360 LLC ("Island 360," "Company," "we," "us," or "our") respects your privacy.</p>
                <p className="font-medium text-slate-700">This Privacy Policy explains:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>What information we collect</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>How we use it</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>How we store it</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Your rights</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>How we comply with U.S. and Canadian data laws</li>
                </ul>
                <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-sky-800 text-sm">
                  By using our website, mobile app, or services ("Platform"), you consent to this Policy.
                </div>
              </div>
            </section>

            <section id="s2" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">2. Information We Collect</h3>
              </div>
              <div className="p-6 space-y-5 text-sm leading-relaxed">
                <div>
                  <h4 className="font-bold text-sky-700 mb-2">A. Information You Provide</h4>
                  <ul className="space-y-1.5 pl-2">
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Full name</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Email address</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Phone number</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Billing address</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Booking details</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Account login credentials</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Vendor business information (if applicable)</li>
                  </ul>
                </div>
                <hr className="border-slate-100" />
                <div>
                  <h4 className="font-bold text-sky-700 mb-2">B. Payment Information</h4>
                  <p>Payments are processed through third-party processors (e.g., Stripe, PayPal). Island 360 does <strong>not</strong> store full credit card numbers.</p>
                </div>
                <hr className="border-slate-100" />
                <div>
                  <h4 className="font-bold text-sky-700 mb-2">C. Automatically Collected Data</h4>
                  <ul className="space-y-1.5 pl-2">
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>IP address</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Device information</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Browser type</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Location (approximate)</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Usage data</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Referring URL</li>
                  </ul>
                </div>
                <hr className="border-slate-100" />
                <div>
                  <h4 className="font-bold text-sky-700 mb-2">D. Behavioral Tracking &amp; Analytics</h4>
                  <p className="mb-2">We use:</p>
                  <ul className="space-y-1.5 pl-2">
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Google Analytics</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Meta Pixel</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Similar tracking technologies</li>
                  </ul>
                  <p className="mt-2 text-slate-500">To analyze traffic, advertising performance, and improve services.</p>
                </div>
              </div>
            </section>

            <section id="s3" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">3. How We Use Your Information</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p className="font-medium text-slate-700">We use personal information to:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Process bookings</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Facilitate payments</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Communicate confirmations</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Prevent fraud</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Improve platform performance</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Send marketing communications</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Comply with legal obligations</li>
                </ul>
              </div>
            </section>
            <section id="s4" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">4. Marketing Communications</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p className="font-medium text-slate-700">You agree that we may send:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Promotional emails</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Platform updates</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Special offers</li>
                </ul>
                <p>You may unsubscribe at any time using the "unsubscribe" link.</p>
                <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-sky-800 text-sm">
                  We comply with the U.S. <strong>CAN-SPAM Act</strong>.
                </div>
              </div>
            </section>
            <section id="s5" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">5. Sharing of Information</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p className="font-medium text-slate-700">We may share information with:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Activity Vendors (to fulfill bookings)</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Payment processors</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Analytics providers</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Hosting providers</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Legal authorities (if required)</li>
                </ul>
                <p>We may share anonymized, aggregated data with business partners for analytics or research.</p>
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-800 font-semibold text-sm">
                  ✅ We do <strong>NOT</strong> sell personal information.
                </div>
              </div>
            </section>

            <section id="s6" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">6. Data Storage &amp; Cross-Border Transfer</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p>Island 360 operates in the United States. Your data may be stored in U.S.-based servers and processed in the United States.</p>
                <p className="font-medium text-slate-700">Canadian users acknowledge that:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Data is transferred outside Canada</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>U.S. laws may differ from Canadian privacy laws</li>
                </ul>
                <p className="text-slate-500 italic">By using the Platform, you consent to this transfer.</p>
              </div>
            </section>

            <section id="s7" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">7. Data Retention</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p className="font-medium text-slate-700">We retain personal information:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>As long as necessary for bookings</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>As required for tax compliance</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>For fraud prevention</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>For dispute resolution</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>For legal compliance</li>
                </ul>
                <p className="text-slate-500 italic">Retention periods may extend beyond account closure.</p>
              </div>
            </section>

            <section id="s8" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">8. Data Security</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p className="font-medium text-slate-700">We implement commercially reasonable safeguards including:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Encrypted payment processing</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Secure hosting</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Access controls</li>
                </ul>
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-amber-800 text-sm">
                  ⚠️ However, no online system is 100% secure.
                </div>
              </div>
            </section>

            <section id="s9" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">9. Data Breach Policy</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p className="font-medium text-slate-700">If a data breach occurs affecting sensitive information, we will:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Investigate promptly</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Notify affected users where legally required</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Cooperate with regulatory authorities</li>
                </ul>
              </div>
            </section>

            <section id="s10" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">10. Your Rights (U.S. &amp; Canada)</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p className="font-medium text-slate-700">You may request:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Access to your personal data</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Correction of inaccurate information</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Deletion (subject to legal retention requirements)</li>
                </ul>
                <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-sky-800 text-sm">
                  📧 Requests may be sent to: <strong>support@island360.com</strong><br />
                  <span className="text-sky-600 text-xs">We may verify identity before processing requests.</span>
                </div>
              </div>
            </section>
            <section id="s11" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">11. Minors</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p>The Platform is not intended for users under 18.</p>
                <p>We do not knowingly collect personal information from minors.</p>
              </div>
            </section>

            <section id="s12" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">12. Cookies</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p className="font-medium text-slate-700">We use cookies for:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                  <span className="bg-sky-50 border border-sky-100 text-sky-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Authentication</span>
                  <span className="bg-sky-50 border border-sky-100 text-sky-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Analytics</span>
                  <span className="bg-sky-50 border border-sky-100 text-sky-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Advertising</span>
                  <span className="bg-sky-50 border border-sky-100 text-sky-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Performance</span>
                </div>
                <p className="text-slate-500 italic">You may disable cookies in your browser settings, though some features may not function properly.</p>
              </div>
            </section>
            <section id="s13" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">13. Third-Party Links</h3>
              </div>
              <div className="p-6 space-y-2 text-sm leading-relaxed">
                <p>The Platform may contain links to third-party websites.</p>
                <p>Island 360 is <strong>not responsible</strong> for their privacy practices.</p>
              </div>
            </section>
            <section id="s14" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">14. Changes to This Policy</h3>
              </div>
              <div className="p-6 space-y-2 text-sm leading-relaxed">
                <p>We may update this Privacy Policy.</p>
                <p>Continued use of the Platform constitutes acceptance of updated terms.</p>
              </div>
            </section>
            <section id="s15" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">15. Contact</h3>
              </div>
              <div className="p-6 text-sm leading-relaxed">
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 space-y-1">
                  <p className="font-semibold text-slate-700">Island 360 LLC</p>
                  <p className="text-slate-500">11954 Narcoossee Rd Suite 607</p>
                  <p className="text-slate-500">Orlando, FL 32832</p>
                  <p className="text-sky-600 font-medium">support@island360.com</p>
                </div>
              </div>
            </section>

          </main>

          <footer className="text-center text-xs text-slate-400 pb-10 px-6">
            &copy; 2026 Island 360 LLC &bull; 11954 Narcoossee Rd Suite 607, Orlando, FL 32832 &bull; support@island360.com
          </footer>
        </div>
      </main>
    </LayoutWrapper>
  );
}

