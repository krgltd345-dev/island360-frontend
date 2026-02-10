import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useCreateInvitePaymentMutation, useInviteActionMutation } from '@/services/inviteApi';
import { toast } from 'sonner';
import { ConvertCentToDollar, statusStyles } from '@/lib/utils';



export default function ReceiveInviteCard({ invite }) {
  const [Action, { isLoading }] = useInviteActionMutation()
  const [InvitePayment] = useCreateInvitePaymentMutation()
  const router = useRouter()


  const handlePaymentClick = async (invite) => {
    try {
      const payData = await InvitePayment({ id: invite?._id }).unwrap();
      router.push(`/checkout?id=${payData?.data?.clientSecret}`)
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleAction = async (action) => {
    try {
      const res = await Action({ id: invite?._id, action: action }).unwrap()
      console.log(res, "res");
      toast.success(res?.message)
      if (action == "accept") {
        handlePaymentClick(invite)
      }
    } catch (error) {
      toast.error(error?.data?.message)
      console.log(error, "error");
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="overflow-hidden h-full bg-white border-0 py-0 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="p-6">
            <div className="flex items-start flex-col justify-between mb-4">
              <div className='flex items-center gap-2 mb-1'>
                <span className='text-black/50'>Organiser: </span>
                {invite?.inviterUserId?.name}
              </div>
              <div className='flex items-center gap-2 mb-4'>
                <span className='text-black/50 hidden sm:block'>Organiser Email: </span>
                <span className='text-black/50 sm:hidden block'> Email: </span>
                {invite?.inviterUserId?.email}
              </div>
              <div className='flex justify-between w-full  gap-2'>
                <div className='flex max-sm:flex-col gap-1'>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-1">
                    {invite?.activityId?.name}
                  </h3>
                  <Badge className={`${statusStyles[invite?.status]} border h-6 font-medium`}>
                    {invite?.status.charAt(0).toUpperCase() + invite?.status.slice(1)}
                  </Badge>
                </div>
                <div className="text-right">
                  {
                    invite?.status == "REFUNDED" && <p>Refund Amount</p>
                  }
                  <span className="text-3xl font-bold text-slate-900">${ConvertCentToDollar(invite?.refundAmount ? invite?.refundAmount : invite?.bookingId?.groupShare)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{moment(invite?.bookingId?.bookingDate).format('YYYY MM DD')}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{invite?.bookingId?.slotStartTime}</span>
              </div>
            </div>
            {
              invite?.status == "PENDING" &&
              <div className='grid grid-cols-2 gap-2 mt-4'>
                <Button size='sm' variant="destructive" onClick={() => { handleAction("reject") }}>
                  Reject
                </Button>
                <Button size='sm' variant="outline" onClick={() => { handleAction("accept") }}>
                  Accept
                </Button>
              </div>
            }
            {
              invite?.status == "ACCEPTED" &&
              <div className='grid grid-cols-1 gap-2 mt-4'>
                <Button size='sm' variant="default" className={"bg-black text-white"} onClick={() => { handlePaymentClick(invite) }}>
                  Complete Payment
                </Button>
              </div>
            }
          </div>
        </Card>
      </motion.div>
    </>
  );
}