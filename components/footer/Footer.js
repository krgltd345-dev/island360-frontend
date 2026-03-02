'use client';
import React, { useState } from 'react'
import Link from 'next/link'
import PrivacyPolicyModal from './PrivacyPolicyModal'
import TermsOfServiceModal from './TermsOfServiceModal';

const Footer = () => {
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false)
  const [openTerms, setOpenTerms] = useState(false)
  return (
    <footer className="bg-white border-t border-slate-100 py-8 mt-auto relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex lg:w-60 items-center gap-2 text-slate-600">
            <img src={"/island_logo.png"} alt="Logo" className="w-8 h-6" />
            <span className="font-semibold">Island 360</span>
          </div>
          <div className='flex text-sm items-center text-slate-500 gap-1'>
            <div
              onClick={() => {
                setOpenTerms(true)
              }}
              className="underline cursor-pointer underline-offset-2 hover:text-slate-700"
            >
              Terms of Service
            </div>
            |
            <div
              onClick={() => {
                setOpenPrivacyPolicy(true)
              }}
              className="underline cursor-pointer underline-offset-2 hover:text-slate-700"
            >
              Privacy Policy
            </div>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Island 360. All rights reserved.{" "}
          </p>
        </div>
      </div>
      <PrivacyPolicyModal dialogOpen={openPrivacyPolicy} setDialogOpen={setOpenPrivacyPolicy} />
      <TermsOfServiceModal dialogOpen={openTerms} setDialogOpen={setOpenTerms} />
    </footer>
  )
}

export default Footer