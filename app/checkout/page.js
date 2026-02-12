'use client';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import CheckoutForm from '@/components/payments/Checkout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Shield, ShieldCheck, CheckCircle2, ArrowLeft, Hourglass } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const Id = searchParams.get('id');
  const bookingId = searchParams.get('booking');
  const status = searchParams.get('redirect_status');
  const isGroup = searchParams.get('isGroup');
  const [isStripeLoading, setIsStripeLoading] = useState(true);
  const [inviteLoading, setInviteLoading] = useState(true);

  useEffect(() => {
    // Check if Stripe is loaded
    stripePromise.then(() => {
      setIsStripeLoading(false);
    }).catch(() => {
      setIsStripeLoading(false);
    });
  }, []);

  useEffect(() => {
    if (bookingId && (status === "succeeded") && (isGroup == "true")) {
      setInviteLoading(true)
      setTimeout(() => {
        setInviteLoading(false)
        router.push(`/invite?id=${bookingId}`)
      }, 3000);
    }
  }, [bookingId, status, isGroup])

  if (!Id && !status) {
    return (
      <LayoutWrapper>
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center py-12 px-4">
          <Card className="p-8 text-center max-w-md shadow-lg">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Invalid Payment Request</h2>
            <p className="text-slate-600 mb-6">The payment link is invalid or has expired.</p>
            <Link href="/mybookings">
              <Button variant="outline">Go to My Bookings</Button>
            </Link>
          </Card>
        </div>
      </LayoutWrapper>
    );
  }

  if (status === "succeeded") {
    return (
      <LayoutWrapper>
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4">
          <Card className="p-8 text-center max-w-md shadow-lg">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
            <p className="text-slate-600 mb-6">Your payment has been processed successfully.</p>
            <div className="flex flex-col gap-3">
              {
                inviteLoading && isGroup == "true" &&
                <Button disabled className="w-full">
                  <Hourglass className="w-4 h-4 mr-2 animate-spin" />
                  Invite Friends
                </Button>}
              {!inviteLoading && isGroup == "true" &&
                <Link href={`/invite?id=${bookingId}`} className="w-full">
                  <Button className="w-full">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Invite Friends
                  </Button>
                </Link>
              }
              <Link href="/mybookings" className="w-full">
                <Button className="w-full">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Go to My Bookings
                </Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </LayoutWrapper>
    );
  }

  // Show loading state while Stripe is initializing
  if (isStripeLoading) {
    return (
      <LayoutWrapper>
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center py-12 px-4">
          <Card className="p-8 max-w-2xl w-full shadow-lg">
            <div className="space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Loading Secure Payment</h3>
                <p className="text-sm text-slate-600">Please wait while we initialize the payment system...</p>
              </div>
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </Card>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <div className="min-h-[calc(100vh-154px)] mt-16 flex justify-center items-center bg-gradient-to-br from-slate-50 via-white to-slate-50 px-2 sm:px-4">
        <div className="max-w-7xl w-full">
          <div className="flex flex-row gap-8 items-start justify-center">
            {/* Main Checkout Form */}
            <div className="flex-1 max-w-2xl w-full">
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: Id,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: '#0f172a',
                      colorBackground: '#ffffff',
                      colorText: '#1e293b',
                      colorDanger: '#ef4444',
                      fontFamily: 'system-ui, sans-serif',
                      spacingUnit: '4px',
                      borderRadius: '8px',
                    },
                  },
                }}
              >
                <CheckoutForm isGroup={isGroup} bookingId={bookingId} />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}

export default Checkout;