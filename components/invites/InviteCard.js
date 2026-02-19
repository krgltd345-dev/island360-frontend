import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Star, XCircle, Share2, Landmark, DeleteIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useCreatePaymentMutation } from '@/services/bookingApi';
import { useRouter } from 'next/navigation';
import { ConvertCentToDollar, statusStyles } from '@/lib/utils';
import { useCreateInvitePaymentMutation, useInviteActionMutation, useRemoveMyInviteMutation } from '@/services/inviteApi';
import { toast } from 'sonner';

export default function InviteCard({ invite, index = 0 }) {
  const [Action, { isLoading }] = useInviteActionMutation()
  const [InvitePayment] = useCreateInvitePaymentMutation()
  const [Cancel] = useRemoveMyInviteMutation()
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

  const handleCancel = async () => {
    try {
      if (invite) {
        const res = await Cancel({ id: invite?._id }).unwrap()
        toast.success(res?.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message)
    }
  };


  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Card className="overflow-hidden py-0 max-sm:py-0 bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col">
              <div className='flex gap-2 mb-3'>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  {invite?.activityId?.name}
                </h3>
                <Badge className={`${statusStyles[invite?.status]} border font-medium`}>
                  {invite?.status.charAt(0).toUpperCase() + invite?.status.slice(1)}
                </Badge>
              </div>
              <div className='flex items-center gap-2 mb-1'>
                <span className='text-black/50'>Organiser: </span>
                {invite?.inviterUserId?.name}
              </div>
              <div className='flex items-center gap-2 mb-4'>
                <span className='text-black/50 hidden sm:block'>Organiser Email: </span>
                <span className='text-black/50 sm:hidden block'> Email: </span>
                {invite?.inviterUserId?.email}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{moment(invite?.bookingId?.bookingDate).format('YYYY MM DD')}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{invite?.bookingId?.slotStartTime}</span>
                {"-"}
                <span>{invite?.bookingId?.slotEndTime}</span>
              </div>
              <div className="text-right">
                {
                  invite?.status == "REFUNDED" && <p>Refund Amount</p>
                }
                <span className="text-3xl font-bold text-slate-900">${ConvertCentToDollar(invite?.refundAmount ? invite?.refundAmount : invite?.bookingId?.groupShare)}</span>
              </div>
            </div>

            {invite?.bookingId?.specialRequests && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-500">
                  <span className="font-medium">Notes:</span> {invite?.bookingId?.specialRequests}
                </p>
              </div>
            )}
            {
              invite?.status == "PAID" &&
              <div className="bg-red-50 mt-6 border border-red-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DeleteIcon className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Cancel Booking</p>
                  </div>
                </div>
                <Button size='sm' variant="destructive" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            }
            {
              invite?.status == "PENDING"
              && (
                <div className="bg-amber-50 mt-6 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Landmark className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium text-amber-900">Payment Incomplete</p>
                      <p className="text-xs text-amber-700">Complete your payment to confirm your slot</p>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-2'>
                    <Button size='sm' variant="destructive" onClick={() => { handleAction("reject") }}>
                      Reject
                    </Button>
                    <Button onClick={() => { handleAction("accept") }} size="sm" className="bg-amber-600 hover:bg-amber-700">
                      Accept and Pay
                    </Button>
                  </div>
                </div>
              )}
          </div>
        </Card>
      </motion.div >
    </>
  );
}