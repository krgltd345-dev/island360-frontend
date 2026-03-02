'use client';
import React, { useEffect, useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'
import { useDispatch, useSelector } from 'react-redux';
import { bookingApi } from '@/services/bookingApi';
import { userApi } from '@/services/userApi';
import { setSignUp } from '@/services/globalSlice';
import PrivacyPolicyModal from '../footer/PrivacyPolicyModal';
import TermsOfServiceModal from '../footer/TermsOfServiceModal';

const CardComponent = ({ getGoogleLogin }) => {
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false)
  const [openTerms, setOpenTerms] = useState(false)
  const { signUp } = useSelector((state) => state.global);
  const dispatch = useDispatch()

  const getTitle = () => {
    switch (signUp) {
      case 'signup':
        return 'Sign Up';
      case 'forgot':
        return 'Reset Password';
      default:
        return 'Welcome to Island 360';
    }
  };

  const getDescription = () => {
    switch (signUp) {
      case 'signup':
        return 'Sign up to start booking activities';
      case 'forgot':
        return '';
      default:
        return 'Sign in to continue';
    }
  };

  useEffect(() => {
    dispatch(bookingApi.util.resetApiState())
    dispatch(userApi.util.resetApiState())
  }, [])
  return (
    <>
      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-center text-white drop-shadow-lg">
          {getTitle()}
        </h1>
        {getDescription() && (
          <p className="mt-2 text-center text-sm text-white/90 drop-shadow-md">
            {getDescription()}
          </p>
        )}
      </div>
      <div className="relative z-10">
        {signUp === 'signin' && (
          <SignIn
            getGoogleLogin={getGoogleLogin}
            onSwitchToSignUp={() => dispatch(setSignUp('signup'))}
            onSwitchToForgotPassword={() => dispatch(setSignUp('forgot'))}
          />
        )}

        {signUp === 'signup' && (
          <SignUp onSwitchToSignIn={() => dispatch(setSignUp('signin'))} />
        )}

        {signUp === 'forgot' && (
          <ForgotPassword onSwitchToSignIn={() => dispatch(setSignUp('signin'))} />
        )}
        <div className='flex text-sm justify-center items-center mt-1 text-white/80 gap-1'>
          <div
            onClick={() => {
              setOpenTerms(true)
            }}
            className="underline cursor-pointer underline-offset-2 hover:text-white"
          >
            Terms of Service
          </div>
          |
          <div
            onClick={() => {
              setOpenPrivacyPolicy(true)
            }}
            className="underline cursor-pointer underline-offset-2 hover:text-white"
          >
            Privacy Policy
          </div>
        </div>
      </div>
      <PrivacyPolicyModal dialogOpen={openPrivacyPolicy} setDialogOpen={setOpenPrivacyPolicy} />
      <TermsOfServiceModal dialogOpen={openTerms} setDialogOpen={setOpenTerms} />
    </>
  )
}

export default CardComponent