import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { useGetUserRoleQuery } from '@/services/userApi'

const PrivacyPolicyModal = ({ dialogOpen, setDialogOpen, handleAccept }) => {
  const { data: userRoleInfo, isLoading: userRoleInfoFetching } = useGetUserRoleQuery()
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-3xl! max-h-screen md:max-h-[90vh] max-sm:py-12 max-sm:px-1 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={"text-2xl sm:text-3xl"}>{'Island 360 Privacy Policy'}</DialogTitle>
        </DialogHeader>
        <main className="max-w-3xl mx-auto px-3 space-y-5">

          <section id="s1" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">1. Introduction</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className='m-0'>Island 360 LLC ("Island 360," "Company," "we," "us," or "our") respects your privacy.</p>
              <p className="font-medium text-slate-700 m-0">This Privacy Policy explains:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>What information we collect</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>How we use it</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>How we store it</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Your rights</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>How we comply with U.S. and Canadian data laws</li>
              </ul>
              <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-sky-800 text-sm">
                By using our website, mobile app, or services ("Platform"), you consent to this Policy.
              </div>
            </div>
          </section>

          <section id="s2" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">2. Information We Collect</h3>
            </div>
            <div className="px-4 py-1 space-y-5 text-sm leading-relaxed">
              <div>
                <h4 className="font-bold text-sky-700 mb-2">A. Information You Provide</h4>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Full name</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Email address</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Phone number</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Billing address</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Booking details</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Account login credentials</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Vendor business information (if applicable)</li>
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
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>IP address</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Device information</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Browser type</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Location (approximate)</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Usage data</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Referring URL</li>
                </ul>
              </div>
              <hr className="border-slate-100" />
              <div>
                <h4 className="font-bold text-sky-700 mb-2">D. Behavioral Tracking &amp; Analytics</h4>
                <p className="mb-2">We use:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Google Analytics</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Meta Pixel</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Similar tracking technologies</li>
                </ul>
                <p className="mt-2 text-slate-500">To analyze traffic, advertising performance, and improve services.</p>
              </div>
            </div>
          </section>

          <section id="s3" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">3. How We Use Your Information</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">We use personal information to:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Process bookings</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Facilitate payments</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Communicate confirmations</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Prevent fraud</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Improve platform performance</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Send marketing communications</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Comply with legal obligations</li>
              </ul>
            </div>
          </section>
          <section id="s4" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">4. Marketing Communications</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">You agree that we may send:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Promotional emails</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Platform updates</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Special offers</li>
              </ul>
              <p>You may unsubscribe at any time using the "unsubscribe" link.</p>
              <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-sky-800 text-sm">
                We comply with the U.S. <strong>CAN-SPAM Act</strong>.
              </div>
            </div>
          </section>
          <section id="s5" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">5. Sharing of Information</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">We may share information with:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Activity Vendors (to fulfill bookings)</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Payment processors</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Analytics providers</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Hosting providers</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Legal authorities (if required)</li>
              </ul>
              <p>We may share anonymized, aggregated data with business partners for analytics or research.</p>
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-800 font-semibold text-sm">
                ✅ We do <strong>NOT</strong> sell personal information.
              </div>
            </div>
          </section>

          <section id="s6" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">6. Data Storage &amp; Cross-Border Transfer</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p>Island 360 operates in the United States. Your data may be stored in U.S.-based servers and processed in the United States.</p>
              <p className="font-medium text-slate-700">Canadian users acknowledge that:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Data is transferred outside Canada</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>U.S. laws may differ from Canadian privacy laws</li>
              </ul>
              <p className="text-slate-500 italic">By using the Platform, you consent to this transfer.</p>
            </div>
          </section>

          <section id="s7" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">7. Data Retention</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">We retain personal information:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>As long as necessary for bookings</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>As required for tax compliance</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>For fraud prevention</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>For dispute resolution</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>For legal compliance</li>
              </ul>
              <p className="text-slate-500 italic">Retention periods may extend beyond account closure.</p>
            </div>
          </section>

          <section id="s8" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">8. Data Security</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">We implement commercially reasonable safeguards including:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Encrypted payment processing</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Secure hosting</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Access controls</li>
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-amber-800 text-sm">
                ⚠️ However, no online system is 100% secure.
              </div>
            </div>
          </section>

          <section id="s9" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">9. Data Breach Policy</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">If a data breach occurs affecting sensitive information, we will:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Investigate promptly</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Notify affected users where legally required</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Cooperate with regulatory authorities</li>
              </ul>
            </div>
          </section>

          <section id="s10" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">10. Your Rights (U.S. &amp; Canada)</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">You may request:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Access to your personal data</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Correction of inaccurate information</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Deletion (subject to legal retention requirements)</li>
              </ul>
              <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-sky-800 text-sm">
                📧 Requests may be sent to: <strong>support@island360.com</strong><br />
                <span className="text-sky-600 text-xs">We may verify identity before processing requests.</span>
              </div>
            </div>
          </section>
          <section id="s11" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">11. Minors</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p>The Platform is not intended for users under 18.</p>
              <p>We do not knowingly collect personal information from minors.</p>
            </div>
          </section>

          <section id="s12" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">12. Cookies</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
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
          <section id="s13" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">13. Third-Party Links</h3>
            </div>
            <div className="px-4 py-1 space-y-2 text-sm leading-relaxed">
              <p>The Platform may contain links to third-party websites.</p>
              <p>Island 360 is <strong>not responsible</strong> for their privacy practices.</p>
            </div>
          </section>
          <section id="s14" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">14. Changes to This Policy</h3>
            </div>
            <div className="px-4 py-1 space-y-2 text-sm leading-relaxed">
              <p>We may update this Privacy Policy.</p>
              <p>Continued use of the Platform constitutes acceptance of updated terms.</p>
            </div>
          </section>
          <section id="s15" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">15. Contact</h3>
            </div>
            <div className="px-4 py-1 text-sm leading-relaxed">
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 space-y-1">
                <p className="font-semibold text-slate-700">Island 360 LLC</p>
                <p className="text-slate-500">11954 Narcoossee Rd Suite 607</p>
                <p className="text-slate-500">Orlando, FL 32832</p>
                <p className="text-sky-600 font-medium">support@island360.com</p>
              </div>
            </div>
          </section>
          {
            handleAccept && userRoleInfo && !userRoleInfo?.data?.user?.privacyConsentVersion &&
            <div onClick={() => {
              handleAccept("PRIVACY_POLICY")
            }} className="mt-4 cursor-pointer hover:bg-sky-700 hover:shadow-md bg-sky-600 text-white rounded-sm px-6 py-2 text-center">
              <p className="font-bold">✔ I Agree</p>
            </div>
          }
        </main>
      </DialogContent>
    </Dialog>
  )
}

export default PrivacyPolicyModal