import React from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export const metadata = {
  title: "Terms of Service | Island 360",
  description: "Terms of Service for using Island 360.",
};

export default function TermsOfServicePage() {
  return (
    <LayoutWrapper>
      <main className="min-h-[calc(100vh-154px)] bg-slate-50">
        <div className="">
          <header className="bg-gradient-to-br from-cyan-700 via-sky-600 to-blue-700 text-white pt-24 py-16 px-6 text-center shadow-xl">
            {/* <h1 className="text-5xl mb-2">Island 360</h1>  */}
            <h2 className="text-2xl font-light text-cyan-100 tracking-widest">Terms of Service</h2>
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
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">1. Binding Agreement</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p>These Terms of Service ("Terms") form a legally binding agreement between you ("User") and Island 360 LLC ("Company," "Island 360").</p>
                <p className="font-medium text-slate-700">By accessing or using the Platform, you:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Agree to these Terms</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Consent to electronic agreements (E-SIGN Act)</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Agree to binding arbitration</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Waive jury trial and className actions</li>
                </ul>
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-amber-800 font-semibold text-sm">
                  ⚠️ If you do not agree, do not use the Platform.
                </div>
              </div>
            </section>
            <section id="s2" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">2. Marketplace Status</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p>Island 360 is a <strong>neutral technology platform</strong>.</p>
                <p className="font-medium text-slate-700">Island 360:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span>Does <strong>NOT</strong> own or operate activities</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span>Does <strong>NOT</strong> supervise Vendors</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span>Is <strong>NOT</strong> a travel agency</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span>Is <strong>NOT</strong> a tour operator</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span>Is <strong>NOT</strong> a transportation provider</li>
                </ul>
                <p>All activities are provided solely by independent third-party Vendors. Island 360's role is limited to:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Listing Vendor services</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Processing payments</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Facilitating booking communications</li>
                </ul>
              </div>
            </section>
            <section id="s3" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">3. User Eligibility</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p className="font-medium text-slate-700">You must:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Be at least 18 years old</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Have legal authority to contract</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Provide accurate information</li>
                </ul>
                <p>You are responsible for all activity under your account.</p>
              </div>
            </section>

            <section id="s4" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">4. Booking &amp; Payment Structure</h3>
              </div>
              <div className="p-6 space-y-5 text-sm leading-relaxed">
                <div>
                  <h4 className="font-bold text-sky-700 mb-2">4.1 Pricing Structure</h4>
                  <p>When you book an activity, you agree to pay:</p>
                  <ul className="space-y-1.5 pl-2 mt-2">
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>The Vendor's listed activity price</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>A separate Island 360 platform service fee (currently <strong>8.5%</strong>)</li>
                  </ul>
                  <p className="mt-2 font-medium text-slate-700">The platform service fee:</p>
                  <ul className="space-y-1.5 pl-2 mt-1">
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Is charged to the User</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Is retained by Island 360</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Is separate from the Vendor's price</li>
                  </ul>
                  <p className="mt-2">Vendors do <strong>NOT</strong> pay the platform fee.</p>
                </div>
                <hr className="border-slate-100" />
                <div>
                  <h4 className="font-bold text-sky-700 mb-2">4.2 Payment Processing</h4>
                  <p>Payments are processed through third-party providers (e.g., Stripe, PayPal). Island 360 does not store full credit card data. A booking is confirmed only after successful payment authorization and confirmation issuance.</p>
                </div>
                <hr className="border-slate-100" />
                <div>
                  <h4 className="font-bold text-sky-700 mb-2">4.3 Refund Authority</h4>
                  <p>Island 360 reserves the right, in its sole discretion, to issue refunds or credits in cases involving:</p>
                  <ul className="space-y-1.5 pl-2 mt-2">
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Fraud</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Safety concerns</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Vendor non-performance</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Regulatory violations</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Reputational harm</li>
                    <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Chargeback mitigation</li>
                  </ul>
                  <p className="mt-2 text-slate-500 italic">This does not create a general refund guarantee.</p>
                </div>
              </div>
            </section>
            <section id="s5" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">5. Assumption of Risk</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p>Activities may involve inherent risks including:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                  <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Drowning</span>
                  <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Equipment Malfunction</span>
                  <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Collision</span>
                  <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Weather Hazards</span>
                  <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Serious Bodily Injury</span>
                  <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Death</span>
                </div>
                <p className="mt-2">You voluntarily assume all risks, known and unknown, including those arising from Vendor negligence (where legally permissible).</p>
              </div>
            </section>

            <section id="s6" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">6. Release of Liability</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p>To the fullest extent permitted under Florida law, you release Island 360 LLC and its members, managers, officers, employees, agents, and affiliates from liability for:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Personal injury &amp; Death</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Property damage</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Economic loss</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Emotional distress</li>
                </ul>
                <p>Including claims arising from Vendor services.</p>
              </div>
            </section>

            <section id="s7" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">7. Limitation of Liability</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p className="uppercase font-semibold text-slate-600 text-xs tracking-wide">To the maximum extent permitted by law, Island 360 shall not be liable for:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Indirect damages</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Consequential damages</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Lost profits</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Travel expenses</li>
                </ul>
                <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-sky-800 font-semibold">
                  💡 Total liability shall not exceed the lesser of <span className="text-sky-600">$500 USD</span> or the amount paid for the booking.
                </div>
              </div>
            </section>

            <section id="s8" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">8. User Indemnification</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p>You agree to indemnify and hold harmless Island 360 from claims arising from:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Your participation</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Your misconduct</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Your violation of these Terms</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Claims brought on your behalf</li>
                </ul>
              </div>
            </section>

            <section id="s9" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">9. No Warranties</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p className="uppercase font-bold text-slate-700 text-xs tracking-widest">The platform is provided "AS IS."</p>
                <p>Island 360 disclaims all warranties including:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Merchantability</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Fitness for a particular purpose</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Safety guarantees</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Vendor reliability</li>
                </ul>
              </div>
            </section>

            <section id="s10" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">10. Dispute Resolution</h3>
              </div>
              <div className="p-6 space-y-5 text-sm leading-relaxed">
                <div>
                  <h4 className="font-bold text-sky-700 mb-1">10.1 Mandatory Arbitration</h4>
                  <p>All disputes shall be resolved exclusively by binding arbitration in Orange County, Florida under the Federal Arbitration Act.</p>
                </div>
                <hr className="border-slate-100" />
                <div>
                  <h4 className="font-bold text-sky-700 mb-1">10.2 className Action Waiver</h4>
                  <p>You waive participation in className or representative actions.</p>
                </div>
                <hr className="border-slate-100" />
                <div>
                  <h4 className="font-bold text-sky-700 mb-1">10.3 Jury Trial Waiver</h4>
                  <p>You waive the right to trial by jury.</p>
                </div>
              </div>
            </section>

            <section id="s11" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">11. Canadian Users</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p>Canadian users acknowledge:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Data is processed in the United States</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Florida law governs disputes</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Certain non-waivable rights may apply under Canadian law</li>
                </ul>
              </div>
            </section>

            <section id="s12" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">12. Force Majeure</h3>
              </div>
              <div className="p-6 space-y-3 text-sm leading-relaxed">
                <p>Island 360 is not liable for delays caused by:</p>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Weather &amp; Natural disasters</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Government restrictions</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Pandemics</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Travel bans</li>
                </ul>
              </div>
            </section>

            <section id="s13" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-3">
                <h3 className="text-white font-semibold text-sm tracking-widest uppercase">13. Survival</h3>
              </div>
              <div className="p-6 text-sm leading-relaxed">
                <p>Liability limitations, arbitration, indemnification, and governing law provisions survive termination.</p>
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

