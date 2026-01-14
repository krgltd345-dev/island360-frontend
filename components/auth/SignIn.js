'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Eye, EyeOff, } from 'lucide-react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SocialLogin from './SocialLogin';
import { useLoginMutation } from '@/services/authApi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function SignIn({ onSwitchToSignUp, onSwitchToForgotPassword, getGoogleLogin }) {
    const router = useRouter()
  const [Login] = useLoginMutation()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      console.log('Signing in:', formData);
      const res = await Login(formData).unwrap()
      console.log(res, "Login res");
      toast.success(res?.message)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full space-y-6">
      {getGoogleLogin && (
        <GoogleOAuthProvider clientId={getGoogleLogin?.data?.clientId}>
          <SocialLogin />
        </GoogleOAuthProvider>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/30" />
        </div>
        <div className="relative flex justify-center uppercase">
          <span className=" px-2 text-white/80">
            Or
          </span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white drop-shadow-sm">Email</Label>
          <div className="relative">
            <Mail className="absolute z-10 left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/70" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`pl-10 backdrop-blur-sm bg-white/20 border-white/30 text-black/80 placeholder:text-black/60 ${errors.email ? 'border-red-400 focus-visible:ring-red-400/20' : ''}`}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-600 drop-shadow-sm">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white drop-shadow-sm">Password</Label>
          <div className="relative">
            <Lock className="absolute z-10 left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/70" />
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`pl-10 backdrop-blur-sm bg-white/20 border-white/30 text-black/80 placeholder:text-black/60 ${errors.password ? 'border-red-400 focus-visible:ring-red-400/20' : ''}`}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black/80 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-600 mt-1 drop-shadow-sm">{errors.password}</p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onSwitchToForgotPassword}
            className="text-sm text-white/90 hover:text-white hover:underline cursor-pointer drop-shadow-sm"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <p className="text-sm text-red-300 text-center drop-shadow-sm">{errors.submit}</p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-11 bg-white/20 hover:bg-white/60 backdrop-blur-sm border border-white/30 text-black cursor-pointer font-semibold shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      {/* Sign Up Link */}
      <div className="text-center text-sm">
        <span className="text-white/80 drop-shadow-sm">Don't have an account? </span>
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="text-white hover:text-white/90 text-base cursor-pointer font-medium hover:underline drop-shadow-sm"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

