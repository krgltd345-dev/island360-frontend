'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import PrivacyPolicyModal from './PrivacyPolicyModal'
import TermsOfServiceModal from './TermsOfServiceModal';
import { useGetUserRoleQuery, useUserConsentMutation } from '@/services/userApi';
import ReleaseOfLiabilityModal from './ReleaseOfLiabilityModal';
import { toast } from 'sonner';

const Footer = () => {
  const { data: userRoleInfo, isLoading: userRoleInfoFetching } = useGetUserRoleQuery()
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false)
  const [openTerms, setOpenTerms] = useState(false)
  const [openLiability, setOpenLiability] = useState(false)
  const [Consent, { isLoading }] = useUserConsentMutation()


  const handleAccept = async (type) => {
    try {
      const res = await Consent({
        consentGiven: true,
        consentType: type
      }).unwrap();
      // if (type == "PRIVACY_POLICY") {
      //   setOpenPrivacyPolicy(false)
      // }
      // if (type == "TERMS_OF_SERVICE") {
      //   setOpenTerms(false)
      // }
      // if (type == "RELEASE_OF_LIABILITY") {
      //   setOpenLiability(false)
      // }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message)
    }
  }

  useEffect(() => {
    if (userRoleInfo?.data?.user?.liabilityConsentVersion) {
      setOpenLiability(false)
    }
    if (userRoleInfo?.data?.user?.termsConsentVersion) {
      setOpenTerms(false)
    }
    if (userRoleInfo?.data?.user?.privacyConsentVersion) {
      setOpenPrivacyPolicy(false)
    }
  }, [userRoleInfo?.data?.user])

  useEffect(() => {
    if (userRoleInfo && !userRoleInfoFetching && !isLoading) {
      if (!userRoleInfo?.data?.user?.liabilityConsentVersion) {
        setOpenLiability(true)
      }
      if (!userRoleInfo?.data?.user?.termsConsentVersion) {
        setOpenTerms(true)
      }
      if (!userRoleInfo?.data?.user?.privacyConsentVersion) {
        setOpenPrivacyPolicy(true)
      }
      // if (userRoleInfo?.data?.user?.liabilityConsentVersion) {
      //   setOpenLiability(false)
      // }
      // if (userRoleInfo?.data?.user?.termsConsentVersion) {
      //   setOpenTerms(false)
      // }
      // if (userRoleInfo?.data?.user?.privacyConsentVersion) {
      //   setOpenPrivacyPolicy(false)
      // }
    }
  }, [userRoleInfo, openPrivacyPolicy, openTerms, openLiability, userRoleInfoFetching, isLoading])
  return (
    <footer className="bg-white border-t border-slate-100 py-6 mt-auto relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex lg:w-60 items-center gap-2 text-slate-600">
            <img src={"/island_logo.png"} alt="Logo" className="w-8 h-6" />
            <span className="font-semibold">Island 360</span>
          </div>
          <div className='flex flex-col text-sm items-center gap-2 text-slate-500'>
            <Link
              href={"/vendorsignup"}
              className="underline cursor-pointer underline-offset-2 hover:text-slate-700"
            >
              Join Vendor Application
            </Link>
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
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Island 360. All rights reserved.{" "}
          </p>
        </div>
      </div>
      <PrivacyPolicyModal handleAccept={handleAccept} dialogOpen={openPrivacyPolicy} setDialogOpen={setOpenPrivacyPolicy} />
      <TermsOfServiceModal handleAccept={handleAccept} dialogOpen={openTerms} setDialogOpen={setOpenTerms} />
      <ReleaseOfLiabilityModal handleAccept={handleAccept} dialogOpen={openLiability} setDialogOpen={setOpenLiability} />
    </footer>
  )
}

export default Footer