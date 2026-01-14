'use client';
import React, { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'

const CardComponent = ({getGoogleLogin}) => {
  const [view, setView] = useState('signin'); // 'signin', 'signup', 'forgot'

  const getTitle = () => {
    switch (view) {
      case 'signup':
        return 'Sign Up';
      case 'forgot':
        return 'Reset Password';
      default:
        return 'Welcome to Island 360';
    }
  };

  const getDescription = () => {
    switch (view) {
      case 'signup':
        return 'Sign up to start booking activities';
      case 'forgot':
        return '';
      default:
        return 'Sign in to continue';
    }
  };
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
        {view === 'signin' && (
          <SignIn
            getGoogleLogin={getGoogleLogin}
            onSwitchToSignUp={() => setView('signup')}
            onSwitchToForgotPassword={() => setView('forgot')}
          />
        )}

        {view === 'signup' && (
          <SignUp onSwitchToSignIn={() => setView('signin')} />
        )}

        {view === 'forgot' && (
          <ForgotPassword onSwitchToSignIn={() => setView('signin')} />
        )}
      </div>
    </>
  )
}

export default CardComponent