'use client';
import React, { useEffect } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'
import { useDispatch, useSelector } from 'react-redux';
import { bookingApi } from '@/services/bookingApi';
import { userApi } from '@/services/userApi';
import { setSignUp } from '@/services/globalSlice';

const CardComponent = ({ getGoogleLogin }) => {
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
      </div>
    </>
  )
}

export default CardComponent