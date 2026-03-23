'use client';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import CheckoutElement from '@/components/checkout/Checkout';
import { ArrowLeft, CheckCircle2, Hourglass, Lock, ShieldCheck } from 'lucide-react';
import { useCreateNmiOrderMutation, useNmiPaymentMutation } from '@/services/bookingApi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RiShieldCrossLine } from 'react-icons/ri';
import { FcCancel } from 'react-icons/fc';

const Checkout = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id');
  const isGroup = searchParams.get('isGroup');
  const entity = searchParams.get('entity');
  const [Payment] = useCreateNmiOrderMutation()
  const [status, setStatus] = useState()
  const [inviteLoading, setInviteLoading] = useState(true);
  const [nmiPayment] = useNmiPaymentMutation()

  const handlePay = async (event) => {
    try {
      console.log(event?.token, event, "event");
      const payData = await Payment({ entityType: entity, entityId: bookingId }).unwrap();
      if (payData?.data?.orderId) {
        const res = await nmiPayment({ orderId: payData?.data?.orderId, paymentToken: event?.token, firstName: event?.billing?.fName, lastName: event?.billing?.lName, zipCode: event?.billing?.zip }).unwrap()
        setStatus(res?.data?.responseText)
        console.log(res, "ress");
      }
    } catch (error) {
      setStatus("FAILED")
      console.log(error, "err");
    }
  }

  useEffect(() => {
    if (bookingId && (status === "SUCCESS") && (isGroup == "true")) {
      setInviteLoading(true)
      setTimeout(() => {
        setInviteLoading(false)
        router.push(`/invite?id=${bookingId}`)
      }, 3000);
    }
  }, [bookingId, status, isGroup])


  if (status === "FAILED") {
    return (
      <LayoutWrapper>
        <div className="min-h-[calc(100vh-160px)] sm:min-h-[calc(100vh-100px)] bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4">
          <Card className="p-8 text-center max-w-md shadow-lg">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FcCancel className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Failed!</h2>
            <p className="text-slate-600 mb-6">Payment failed, Please try again later.</p>
            <div className="flex flex-col gap-3">
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


  if (status === "SUCCESS") {
    return (
      <LayoutWrapper>
        <div className="min-h-[calc(100vh-160px)] sm:min-h-[calc(100vh-100px)] bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4">
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


  return (
    <LayoutWrapper>
      <div className="min-h-[calc(100vh-164px)] mt-16 flex justify-center items-center bg-gradient-to-br from-slate-50 via-white to-slate-50 px-2 sm:px-4">
        <div className="max-w-xl p-5 border border-slate-200  rounded-lg w-full">
          {/* <div className="flex justify-center w-full min-w-2xl"> */}
          <div className="text-center  pb-3">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-slate-600" />
              <h2 className="text-2xl font-bold text-slate-900">Secure Checkout</h2>
            </div>
            <p className="text-sm text-slate-600 mt-2">
              Your payment information is encrypted and secure
            </p>
          </div>
          {
            bookingId && <CheckoutElement handlePay={handlePay} />
          }
          <div className="text-center">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-sm text-slate-600 cursor-pointer hover:text-slate-900 underline"
            >
              Cancel and go back
            </button>
          </div>
          {/* </div> */}
        </div>
      </div>

    </LayoutWrapper>
  );
}

export default Checkout;