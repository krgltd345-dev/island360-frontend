import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { IoMdClose } from "react-icons/io";


const VendorAggrementModal = ({ dialogOpen, setDialogOpen, agree, setAgree }) => {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent showCloseButton={false} className="max-w-3xl! max-h-screen md:max-h-[90vh] max-sm:py-12 max-sm:px-1 overflow-y-auto">
        <DialogHeader className={"flex flex-row justify-between"}>
          <DialogTitle className={"text-2xl sm:text-3xl"}>{'Vendor Service Agreement'}</DialogTitle>
          <DialogClose className={"cursor-pointer"}>
            <IoMdClose />
          </DialogClose>
        </DialogHeader>
        <main className="max-w-3xl mx-auto px-3 space-y-5">
          <div className="flex flex-col justify-center text-sm">
            <span className="bg-white/15 backdrop-blur rounded-full px-4 py-0.5">📅 Effective: February 2026</span>
            <span className="bg-white/15 backdrop-blur rounded-full px-4 py-0.5">📍 11954 Narcoossee Rd Suite 607, Orlando, FL 32832</span>
            <span className="bg-white/15 backdrop-blur rounded-full px-4 py-0.5">✉️ support@island360.com</span>
            <span className="bg-white/15 backdrop-blur rounded-full px-4 py-0.5">⚖️ Governing Law: Florida</span>
          </div>
          <section id="s1" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">1. Independent Contractor Status</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className='m-0'>Vendor is an <strong>independent contractor</strong>. No employment, agency, partnership, or joint venture is created.</p>
              <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-sky-800 text-sm">
                🔑 Vendor retains full operational control.
              </div>
            </div>
          </section>

          <section id="s2" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">2. Payment Structure</h3>
            </div>
            <div className="px-4 py-1 space-y-5 text-sm leading-relaxed">

              <div>
                <h4 className="font-bold text-sky-700 mb-2">2.1 User-Paid Platform Fee</h4>
                <p>Island 360 charges Users a separate platform service fee (currently <strong>8.5%</strong>) at checkout.</p>
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-800 font-semibold text-sm mt-3">
                  ✅ Vendor does <strong>NOT</strong> pay this fee.
                </div>
                <p className="mt-3 font-medium text-slate-700">The fee is:</p>
                <ul className="space-y-1.5 pl-2 mt-1">
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Paid by the User</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Retained by Island 360</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Separate from Vendor's listed price</li>
                </ul>
              </div>

              <hr className="border-slate-100" />

              <div>
                <h4 className="font-bold text-sky-700 mb-2">2.2 Vendor Compensation</h4>
                <p>Vendor receives the <strong>full listed activity price</strong>, subject only to:</p>
                <ul className="space-y-1.5 pl-2 mt-2">
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Payment processor fees</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Chargebacks attributable to Vendor</li>
                  <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Authorized payout holds</li>
                </ul>
              </div>

              <hr className="border-slate-100" />

              <div>
                <h4 className="font-bold text-sky-700 mb-2">2.3 Limited Payment Collection Agent</h4>
                <p>Vendor appoints Island 360 as <strong>limited payment collection agent</strong> for collecting booking payments. Receipt of funds by Island 360 constitutes receipt by Vendor.</p>
              </div>

            </div>
          </section>

          <section id="s3" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">3. Insurance Requirements</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">Vendor must maintain:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-center">
                  <p className="text-sky-700 font-bold text-base">$1,000,000</p>
                  <p className="text-sky-600 text-xs mt-1">Commercial General Liability per occurrence</p>
                </div>
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-center">
                  <p className="text-sky-700 font-bold text-base">Passenger</p>
                  <p className="text-sky-600 text-xs mt-1">Liability (if applicable)</p>
                </div>
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-center">
                  <p className="text-sky-700 font-bold text-base">Watercraft</p>
                  <p className="text-sky-600 text-xs mt-1">Liability (if applicable)</p>
                </div>
              </div>
              <p>Vendor must name <strong>Island 360 LLC as Additional Insured</strong>.</p>
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 font-semibold text-sm">
                ⚠️ Failure to maintain coverage results in <strong>immediate suspension</strong>.
              </div>
            </div>
          </section>

          <section id="s4" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">4. Incident Reporting</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">Vendor must report <span className="text-red-600 font-bold">within 24 hours</span>:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Injury</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Hospitalization</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Fatality</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Law Enforcement</span>
                <span className="bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Property Damage &gt;$1,000</span>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-amber-800 font-semibold text-sm">
                ⚠️ Failure to report constitutes <strong>material breach</strong>.
              </div>
            </div>
          </section>

          <section id="s5" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">5. Payout Freeze Rights</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">Island 360 may freeze or delay payouts if:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Safety incident occurs</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Fraud suspected</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Regulatory inquiry arises</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Chargeback investigation pending</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Insurance lapses</li>
              </ul>
              <p className="text-slate-500 italic">Vendor waives claims related to reasonable investigative holds.</p>
            </div>
          </section>

          <section id="s6" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">6. Chargeback Liability</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">Vendor is financially responsible for chargebacks arising from:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Non-performance</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Safety issues</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Misrepresentation</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Regulatory violations</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Vendor misconduct</li>
              </ul>
              <p className="font-medium text-slate-700 mt-1">Island 360 may:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Deduct from payouts</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Offset against future earnings</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Invoice Vendor</li>
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-amber-800 text-sm">
                ⏱ Vendor must reimburse within <strong>10 business days</strong> if invoiced.
              </div>
            </div>
          </section>

          <section id="s7" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">7. Indemnification</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">Vendor agrees to defend and indemnify Island 360 from claims arising from:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Personal injury</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Death</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Equipment failure</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Negligence</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Regulatory violations</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Employee misconduct</li>
              </ul>
              <p className="text-slate-500 italic">This obligation survives termination.</p>
            </div>
          </section>

          <section id="s8" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">8. Audit Rights</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">Island 360 may request:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Insurance certificates</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Licensing documentation</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Safety compliance proof</li>
              </ul>
              <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-sky-800 text-sm">
                ⏱ Vendor must comply within <strong>5 business days</strong>.
              </div>
            </div>
          </section>

          <section id="s9" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">9. Termination</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">Island 360 may terminate for:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Insurance lapse</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Fraud</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Safety violations</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Regulatory non-compliance</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Reputational harm</li>
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-amber-800 font-semibold text-sm">
                🔒 Upon termination, funds may be held for up to <strong>90 days</strong>.
              </div>
            </div>
          </section>
          <section id="s10" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">10. Limitation of Liability</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p className="font-medium text-slate-700">Island 360 shall not be liable for:</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Lost profits</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Consequential damages</li>
              </ul>
              <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-sky-800 font-semibold text-sm">
                💡 Maximum liability shall not exceed total booking revenue processed through Vendor listings in the prior <strong>3 months</strong>.
              </div>
            </div>
          </section>
          <section id="s11" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">11. Dispute Resolution</h3>
            </div>
            <div className="px-4 py-1 space-y-3 text-sm leading-relaxed">
              <p>Binding arbitration in <strong>Orange County, Florida</strong>.</p>
              <ul className="space-y-1.5 pl-2">
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Vendor waives jury trial</li>
                <li className="flex items-start gap-2"><span className="text-sky-500">▸</span>Vendor waives className action participation</li>
              </ul>
            </div>
          </section>
          <section id="s12" className="bg-white overflow-hidden">
            <div className="px-2">
              <h3 className="text-black font-semibold text-sm tracking-widest uppercase">12. Survival</h3>
            </div>
            <div className="px-4 py-1 text-sm leading-relaxed">
              <p>The following obligations survive termination:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                <span className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Indemnification</span>
                <span className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Arbitration</span>
                <span className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Chargeback Liability</span>
                <span className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-2 text-center text-xs font-medium">Insurance Obligations</span>
              </div>
            </div>
          </section>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree((prev) => !prev)}
              className="w-4 h-4 cursor-pointer"
            />
            <Label onClick={() => {
            }} className="text-black sm:text-lg">
              I Have Read and Agreed to all agreement conditions.
            </Label>
          </div>

        </main>
      </DialogContent>
    </Dialog>
  )
}

export default VendorAggrementModal