'use client';
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Lock, Loader2, CreditCard, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutForm({ bookingId }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isStripeReady, setIsStripeReady] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Check if Stripe is ready
  useEffect(() => {
    if (stripe && elements) {
      setIsStripeReady(true);
    }
  }, [stripe, elements]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error('Payment system is not ready. Please wait...');
      return;
    }

    setLoading(true);
    setPaymentError(null);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout?booking=${bookingId}`,
        },
      });

      if (error) {
        setPaymentError(error.message);
        toast.error(error.message);
      } else {
        toast.success('Payment processing...');
      }
    } catch (err) {
      setPaymentError(err.message || 'An error occurred during payment');
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading skeleton while Stripe is loading
  if (!isStripeReady) {
    return (
      <Card className="p-8 max-w-2xl w-full">
        <div className="space-y-6">
          <div className="flex items-center justify-center mb-6">
            <Loader2 className="w-8 h-8 text-slate-600 animate-spin" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="text-center text-slate-500 text-sm">
            Loading secure payment form...
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 sm:p-8 max-w-2xl w-full shadow-lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center border-b border-slate-200 pb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-slate-600" />
            <h2 className="text-2xl font-bold text-slate-900">Secure Checkout</h2>
          </div>
          <p className="text-sm text-slate-600 mt-2">
            Your payment information is encrypted and secure
          </p>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Payment Details
            </Label>
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <PaymentElement
                options={{
                  layout: 'tabs',
                }}
              />
            </div>
          </div>

          {/* Error Message */}
          {paymentError && (
            <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-900">Payment Error</p>
                <p className="text-sm text-red-700 mt-1">{paymentError}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!stripe || loading}
            className="w-full h-12 text-base font-semibold bg-slate-900 hover:bg-slate-800"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Complete Payment
              </>
            )}
          </Button>

          {/* Cancel Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-sm text-slate-600 hover:text-slate-900 underline"
            >
              Cancel and go back
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
}
