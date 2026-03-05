import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { toast } from 'sonner';
import { useUserConsentMutation } from '@/services/userApi';

const ReleaseOfLiabilityModal = ({ dialogOpen, setDialogOpen, handleAccept }) => {



  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-3xl! max-h-screen md:max-h-[90vh] max-sm:py-12 max-sm:px-1 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={"text-xl sm:text-3xl"}>{'Assumption of Risk, Release of Liability & Waiver Agreement'}</DialogTitle>
        </DialogHeader>
        <div className="bg-red-600 text-white rounded-xl px-6 py-5 shadow-md">
          <p className="text-sm font-bold tracking-widest uppercase mb-1 text-red-100">⚠️ Important: This is a Legal Document</p>
          <p className="text-sm mb-1">By completing a booking through Island 360 LLC, you acknowledge that:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="flex items-start gap-2"><span className=" text-red-200">▸</span>You are waiving certain legal rights</div>
            <div className="flex items-start gap-2"><span className=" text-red-200">▸</span>You are assuming substantial risks</div>
            <div className="flex items-start gap-2"><span className=" text-red-200">▸</span>You are agreeing to binding arbitration</div>
            <div className="flex items-start gap-2"><span className=" text-red-200">▸</span>You are releasing Island 360 from liability</div>
          </div>
          <p className="mt-2 text-sm font-bold text-red-100">If you do not agree, do not proceed with booking.</p>
        </div>
        <main className="max-w-3xl mx-auto px-3 space-y-5">

          <section id="s1" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">1. Acknowledgment of Marketplace Status</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p>I understand that <strong>Island 360 LLC is a technology platform only</strong>.</p>
              <p className="font-medium text-slate-700">Island 360:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span>Does <strong>NOT</strong> own, operate, manage, or control activities</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span>Does <strong>NOT</strong> supervise vendors</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span>Is <strong>NOT</strong> a tour operator or charter company</li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span>Is <strong>NOT</strong> responsible for safety procedures</li>
              </ul>
              <p>All activities are operated solely by <strong>independent third-party Vendors</strong>.</p>
            </div>
          </section>

          <section id="s2" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">2. Assumption of Risk (Comprehensive)</h3>
            </div>
            <div className="px-4 py-1 space-y-4 text-sm leading-relaxed">
              <p>I understand that participation in booked activities may involve inherent and unforeseeable risks including, but not limited to:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Drowning</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Near Drowning</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Slip &amp; Fall</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Equipment Malfunction</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Boat Collision</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Jet Ski Accidents</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">ATV Accidents</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Wildlife Encounters</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Weather Exposure</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Heat Stroke</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Dehydration</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Medical Emergencies</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Serious Bodily Injury</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Permanent Disability</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium col-span-2 sm:col-span-2">Death</span>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-amber-800 font-semibold text-sm">
                ⚠️ I voluntarily and knowingly assume <strong>ALL risks</strong> — whether known or unknown, foreseeable or unforeseeable.
              </div>
              <p className="font-medium text-slate-700">This includes risks arising from:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Vendor negligence</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Equipment failure</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Environmental conditions</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Actions of other participants</li>
              </ul>
            </div>
          </section>

          <section id="s3" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">3. Affirmation of Swimming Ability (Water Activities)</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">For any water-based activity, I affirm:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>I can swim unassisted</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>I am comfortable in open water</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>I understand ocean and marine risks</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>I accept risks of currents, waves, marine wildlife</li>
              </ul>
              <p className="text-slate-500 italic">If I cannot swim, I voluntarily assume the increased risk.</p>
            </div>
          </section>

          <section id="s4" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">4. Health &amp; Fitness Confirmation</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">I represent that:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>I am physically fit to participate</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>I do not have medical conditions that would create unreasonable risk</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>I am not under the influence of drugs or alcohol</li>
              </ul>
              <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-sky-800 text-sm">
                ℹ️ Island 360 does <strong>not</strong> evaluate your medical condition.
              </div>
            </div>
          </section>

          <section id="s5" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">5. Release of Liability (Maximum Protection Clause)</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p>To the fullest extent permitted under Florida law, I hereby <strong>Release, Waive, Discharge, and Covenant Not to Sue</strong> Island 360 LLC, its members, managers, officers, affiliates, employees, agents, contractors, successors, and assigns from any and all liability for:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Personal injury</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Wrongful death</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Property damage</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Emotional distress</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Economic loss</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Travel disruption</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Medical expenses</li>
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-amber-800 text-sm">
                ⚠️ <strong>Including</strong> claims arising from negligence — but <strong>not</strong> gross negligence or intentional misconduct where prohibited by law.
              </div>
            </div>
          </section>

          <section id="s6" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">6. Medical Authorization &amp; Evacuation Costs</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p>In the event of emergency, I authorize <strong>emergency medical treatment</strong>.</p>
              <p className="font-medium text-slate-700">I agree that I am financially responsible for:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Medical treatment</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Evacuation costs</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Ambulance, helicopter, or maritime rescue</li>
              </ul>
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm font-semibold">
                🚁 Island 360 is <strong>not responsible</strong> for arranging or paying for evacuation.
              </div>
            </div>
          </section>

          <section id="s7" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">7. Media &amp; Photo Release</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p>I grant Island 360 LLC and its Vendors the <strong>irrevocable right</strong> to:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Photograph</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Record video</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Use my image or likeness</li>
              </ul>
              <p>For promotional, marketing, and commercial purposes <strong>worldwide, without compensation</strong>.</p>
              <p className="text-slate-500 italic">I waive rights to review or approve such materials.</p>
            </div>
          </section>

          <section id="s8" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">8. Indemnification</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p>I agree to indemnify and hold harmless Island 360 LLC from claims arising from:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>My actions</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>My misconduct</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>My violation of safety instructions</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Claims brought by family members or third parties on my behalf</li>
              </ul>
            </div>
          </section>

          <section id="s9" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">9. Limitation of Liability</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p>If liability is found despite this waiver, total liability of Island 360 LLC shall not exceed the lesser of:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-center">
                  <p className="text-sky-700 font-bold text-xl">$500 USD</p>
                  <p className="text-sky-600 text-xs mt-1">Maximum cap</p>
                </div>
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-center">
                  <p className="text-sky-700 font-bold text-base">Amount Paid</p>
                  <p className="text-sky-600 text-xs mt-1">The amount paid for the booking</p>
                </div>
              </div>
            </div>
          </section>

          <section id="s10" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">10. Binding Arbitration Agreement</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">Any dispute arising from:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>This Waiver</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Participation in activities</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Injury claims</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Booking disputes</li>
              </ul>
              <p>Shall be resolved exclusively by <strong>binding arbitration in Orange County, Florida</strong> under the Federal Arbitration Act.</p>
              <p className="font-medium text-slate-700 mt-1">I waive:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Jury trial</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>className action participation</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Representative actions</li>
              </ul>
            </div>
          </section>

          <section id="s11" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">11. Severability (Florida Court Protection Structure)</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p>If any provision is found unenforceable, the remaining provisions remain valid.</p>
              <p>Any unenforceable provision shall be modified only to the extent necessary to make it enforceable under Florida law.</p>
            </div>
          </section>

          <section id="s12" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">12. Survival</h3>
            </div>
            <div className="px-4 py-1 text-sm leading-relaxed">
              <p className="mb-3">This Waiver survives:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Cancellation</span>
                <span className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Termination of Account</span>
                <span className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Completion of Activity</span>
              </div>
            </div>
          </section>
          <section id="s13" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">13. Electronic Signature Consent</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">By clicking "I Agree," I:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Acknowledge reading this document</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Understand its legal effect</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Agree electronically under the E-SIGN Act</li>
                <li className="flex items-start gap-2"><span className="text-sky-500 mt-0.5">▸</span>Confirm I am at least 18 years old</li>
              </ul>
              <div onClick={() => {
                handleAccept("RELEASE_OF_LIABILITY")
              }} className="mt-4 cursor-pointer hover:bg-sky-700 hover:shadow-md bg-sky-600 text-white rounded-xl px-6 py-4 text-center">
                <p className="text-xs uppercase tracking-widest font-semibold text-sky-200 mb-1">Electronic Acceptance</p>
                <p className="font-bold text-lg">✔ I Agree</p>
                <p className="text-xs text-sky-200 mt-1">Clicking "I Agree" constitutes your electronic signature under the E-SIGN Act</p>
              </div>
            </div>
          </section>

        </main>
      </DialogContent>
    </Dialog>
  )
}

export default ReleaseOfLiabilityModal