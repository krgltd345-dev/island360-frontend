'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, CheckCircle2, Lock, Eye, EyeOff, KeyRound } from 'lucide-react';
import { useForgotPasswordMutation, useResetPasswordMutation, useVerifyOtpMutation } from '@/services/authApi';
import { toast } from 'sonner';

export default function ForgotPassword({ onSwitchToSignIn }) {
  const [OTP] = useForgotPasswordMutation()
  const [VerifyOtp] = useVerifyOtpMutation()
  const [Reset] = useResetPasswordMutation()
  const [step, setStep] = useState('email'); // 'email', 'otp', 'reset'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const otpInputRefs = useRef([]);

  // Timer effect for resend OTP
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [resendTimer]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validateOTP = (otpArray) => {
    const otpString = otpArray.join('');
    if (!otpString) {
      return 'OTP is required';
    }
    if (otpString.length !== 6) {
      return 'Please enter the complete 6-digit OTP';
    }
    if (!/^\d+$/.test(otpString)) {
      return 'OTP must contain only numbers';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    return '';
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) {
      return 'Please confirm your password';
    }
    if (confirmPassword !== password) {
      return 'Passwords do not match';
    }
    return '';
  };

  // Handle OTP input changes
  const handleOTPChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error when user starts typing
    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: '' }));
    }

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP backspace
  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP paste
  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('').slice(0, 6);
      setOtp(newOtp);
      otpInputRefs.current[5]?.focus();
    }
  };

  // Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Sending OTP to:', email);
      const res = await OTP({ email }).unwrap();
      toast.success(res?.message)
      setStep('otp');
      setResendTimer(60); // Start 60 second timer
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to send otp. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    const otpError = validateOTP(otp);
    if (otpError) {
      setErrors({ otp: otpError });
      return;
    }

    setIsLoading(true);
    try {
      const otpString = otp.join('');
      console.log('Verifying OTP:', otpString);
      const res = await VerifyOtp({ email: email, otp: otpString }).unwrap()
      toast.success(res?.message)
      setStep('reset');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to Verify otp. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);

    const newErrors = {};
    if (passwordError) newErrors.password = passwordError;
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      console.log('Resetting password for:', email);
      const res = await Reset({ email, newPassword: password, confirmNewPassword: confirmPassword }).unwrap();
      toast.success(res?.message)
      onSwitchToSignIn();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to Reset. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (resendTimer > 0) return; // Prevent resend if timer is active
    
    setIsLoading(true);
    try {
      console.log('Resending OTP to:', email);
      const res = await OTP({ email }).unwrap();
      toast.success(res?.message || 'OTP resent successfully');
      setOtp(['', '', '', '', '', '']);
      setErrors({});
      setResendTimer(60); // Start 60 second timer
      // Focus first OTP input
      otpInputRefs.current[0]?.focus();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Email Step
  if (step === 'email') {
    return (
      <div className="w-full space-y-6">
        <div>
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="flex items-center cursor-pointer text-sm text-white hover:text-white mb-4 drop-shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </button>
          <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            Forgot Password?
          </h2>
          <p className="text-white/90 drop-shadow-sm">
            Enter your email address and we'll send you an OTP to reset your password.
          </p>
        </div>

        <form onSubmit={handleSendOTP} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="forgot-email" className="text-white drop-shadow-sm">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/70" />
              <Input
                id="forgot-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                className={`pl-10 backdrop-blur-sm bg-white/20 border-white/30 text-black/80 placeholder:text-black/60 ${errors.email ? 'border-red-400 focus-visible:ring-red-400/20' : ''}`}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 drop-shadow-sm">{errors.email}</p>
            )}
          </div>

          {errors.submit && (
            <p className="text-sm text-red-300 text-center drop-shadow-sm">{errors.submit}</p>
          )}

          <Button
            type="submit"
            className="w-full h-11 bg-white/20 hover:bg-white/60 backdrop-blur-sm border border-white/30 text-black cursor-pointer font-semibold shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-white/80 drop-shadow-sm">Remember your password? </span>
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="text-white hover:text-white/90 cursor-pointer font-medium hover:underline drop-shadow-sm"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  // OTP Step
  if (step === 'otp') {
    return (
      <div className="w-full space-y-6">
        <div>
          <button
            type="button"
            onClick={() => {
              setStep('email');
              setOtp(['', '', '', '', '', '']);
              setErrors({});
              setResendTimer(0); // Reset timer when going back
            }}
            className="flex cursor-pointer items-center text-sm text-white hover:text-white mb-4 drop-shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            Enter OTP
          </h2>
          <p className="text-white text-sm drop-shadow-sm">
            We've sent a 6-digit OTP to <strong className="text-white">{email}</strong>
          </p>
        </div>

        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (otpInputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleOTPKeyDown(index, e)}
                  onPaste={index === 0 ? handleOTPPaste : undefined}
                  className={`w-12 h-12 text-center text-lg font-semibold backdrop-blur-sm bg-white/20 border-white/30 text-black ${errors.otp ? 'border-red-400 focus-visible:ring-red-400/20' : ''
                    }`}
                  aria-invalid={errors.otp ? 'true' : 'false'}
                />
              ))}
            </div>
            {errors.otp && (
              <p className="text-sm text-red-600 mt-1 text-center drop-shadow-sm">{errors.otp}</p>
            )}
          </div>

          {errors.submit && (
            <p className="text-sm text-red-600 text-center drop-shadow-sm">{errors.submit}</p>
          )}

          <Button
            type="submit"
            className="w-full h-11 bg-white/20 hover:bg-white/60 backdrop-blur-sm border border-white/30 text-black font-semibold shadow-lg cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </Button>
        </form>

        <div className="text-center space-y-3">
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={isLoading || resendTimer > 0}
            className="text-sm text-white disabled:text-white hover:text-white font-medium hover:underline disabled:cursor-not-allowed drop-shadow-sm cursor-pointer"
          >
            {resendTimer > 0 ? (
              <span className='text-white'>Resend OTP in {formatTimer(resendTimer)}</span>
            ) : (
              'Resend OTP'
            )}
          </button>
          <div className="text-sm">
            <span className="text-white/80 drop-shadow-sm">Wrong email? </span>
            <button
              type="button"
              onClick={() => {
                setStep('email');
                setOtp(['', '', '', '', '', '']);
                setErrors({});
                setResendTimer(0); // Reset timer when changing email
              }}
              className="text-white cursor-pointer hover:text-white/90 font-medium hover:underline drop-shadow-sm"
            >
              Change email
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Reset Password Step
  return (
    <div className="w-full space-y-6">
      <div>
        <button
          type="button"
          onClick={() => {
            setStep('otp');
            setPassword('');
            setConfirmPassword('');
            setErrors({});
          }}
          className="flex cursor-pointer items-center text-sm text-white/80 hover:text-white mb-4 drop-shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
          Reset Password
        </h2>
        <p className="text-white/90 drop-shadow-sm">
          Create a new password for your account.
        </p>
      </div>

      <form onSubmit={handleResetPassword} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reset-password" className="text-white drop-shadow-sm">New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/70" />
            <Input
              id="reset-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
              }}
              onBlur={(e) => {
                const error = validatePassword(e.target.value);
                if (error) {
                  setErrors((prev) => ({ ...prev, password: error }));
                }
              }}
              className={`pl-10 pr-10 backdrop-blur-sm bg-white/20 border-white/30 text-black/80 placeholder:text-black/60 ${errors.password ? 'border-red-400 focus-visible:ring-red-400/20' : ''}`}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black/80 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-600 mt-1 drop-shadow-sm">{errors.password}</p>
          )}
          <p className="text-xs text-white mt-1 drop-shadow-sm">
            Must be at least 8 characters with uppercase, lowercase, and a number
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reset-confirm-password" className="text-white drop-shadow-sm">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/70" />
            <Input
              id="reset-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
              }}
              onBlur={(e) => {
                const error = validateConfirmPassword(e.target.value, password);
                if (error) {
                  setErrors((prev) => ({ ...prev, confirmPassword: error }));
                }
              }}
              className={`pl-10 pr-10 backdrop-blur-sm bg-white/20 border-white/30 text-black.80 placeholder:text-black/60 ${errors.confirmPassword ? 'border-red-400 focus-visible:ring-red-400/20' : ''}`}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black/80 cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-600 mt-1 drop-shadow-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {errors.submit && (
          <p className="text-xs text-red-600 text-center drop-shadow-sm">{errors.submit}</p>
        )}

        <Button
          type="submit"
          className="w-full h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 text-white font-semibold shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? 'Resetting Password...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  );
}

