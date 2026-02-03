import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MoreHorizontal, Star, CheckCircle, XCircle, Trash2, Edit, Share2, Landmark } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ShareBookingDialog from './ShareBookingModal';
import moment from 'moment';
import { useCreatePaymentMutation } from '@/services/bookingApi';
import { useRouter } from 'next/navigation';
import { ConvertCentToDollar } from '@/lib/utils';

const statusStyles = {
  'HOLD': "bg-amber-100 text-amber-700 border-amber-200",
  'CONFIRMED': "bg-emerald-100 text-emerald-700 border-emerald-200",
  "CANCELLED": "bg-red-100 text-red-700 border-red-200",
  "COMPLETED": "bg-slate-100 text-slate-700 border-slate-200"
};

export default function BookingCard({ booking, index = 0, onCancel, onDelete, onEdit, onReview, hasReview }) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const router = useRouter()
  const [Payment, { data: paymentData }] = useCreatePaymentMutation()
  const canReview = booking.status === 'COMPLETED' && !hasReview;
  const canCancel = booking.status === 'HOLD' || booking.status === 'CONFIRMED';
  const canDelete = booking.status === 'CANCELLED';
  const canShare = booking.status === 'CONFIRMED' || booking.status === 'HOLD';

  const handlePaymentClick = async (booking) => {
    try {
      const payData = await Payment({ id: booking?._id }).unwrap();
      router.push(`/checkout?id=${payData?.data?.clientSecret}`)
    } catch (error) {
      console.log(error, "error");
    }
  };


  const calculateAmount = (booking) => {
    if (booking?.status === "CANCELLED" || booking?.status === "REFUNDED") {

    } else {
      if (booking?.groupShare) {
        return ConvertCentToDollar(booking?.groupShare)
      } else {
        ConvertCentToDollar(booking?.totalPrice)
      }
    }

  }

  return (
    <>
      <ShareBookingDialog
        booking={booking}
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Card className="overflow-hidden bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  {booking?.activityId?.name}
                </h3>
                <Badge className={`${statusStyles[booking.status]} border font-medium`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>
              {
                (booking.status === 'CONFIRMED' || booking.status === 'PARTIALLY_CONFIRMED') &&
                <div className='flex gap-2'>
                  {
                    <Button size='sm' variant="outline" className={"cursor-pointer"} onClick={() => onReview(booking)}>
                      <Star className="w-4 h-4 mr-2 text-amber-500" />
                      Leave a Review
                    </Button>
                  }
                  {
                    booking?.groupBooking &&
                    <Button size='sm' variant="outline" className={"cursor-pointer"} onClick={() => setShareDialogOpen(true)}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Invite
                    </Button>
                  }
                  {
                    booking?.activityId?.allowCancellations &&
                    <Button size='sm' variant="destructive" className={"cursor-pointer"} onClick={() => onCancel(booking)}>
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  }
                  {/* <Button size='sm' variant="outline" onClick={() => onReview(booking)}>
                  <Star className="w-4 h-4 mr-2 text-amber-500" />
                  Leave a Review
                </Button> */}
                </div>
              }
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {canShare && (
                    <DropdownMenuItem onClick={() => setShareDialogOpen(true)}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Invite
                    </DropdownMenuItem>
                  )}
                  {(canShare) && (canCancel || canDelete) && <DropdownMenuSeparator />}
                  {canCancel && (
                    <DropdownMenuItem
                      onClick={() => onCancel(booking)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel Booking
                    </DropdownMenuItem>
                  )}
                  {canDelete && (
                    <DropdownMenuItem
                      onClick={() => onDelete(booking)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Booking
                    </DropdownMenuItem>
                  )}
                  {(canReview || hasReview) && (canCancel || canDelete) && <DropdownMenuSeparator />}
                  {canReview && (
                    <DropdownMenuItem onClick={() => onReview(booking)}>
                      <Star className="w-4 h-4 mr-2 text-amber-500" />
                      Leave a Review
                    </DropdownMenuItem>
                  )}
                  {hasReview && (
                    <DropdownMenuItem disabled className="text-slate-500">
                      <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />
                      Review Submitted
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{moment(booking?.bookingDate).format('YYYY MM DD')}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{booking?.slotStartTime}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{booking?.activityId?.billingType === "PER_UNIT" ?
                  `${booking?.quantity} Units` : booking?.activityId?.billingType === "PER_HOURS" ?
                    `${booking?.quantity} Hours` : `${booking?.quantity} Guests`
                }
                </span>
              </div>
              <div className="text-right">
                {
                  booking?.status === "CANCELLED" ? <span className="text-lg font-bold text-slate-900">${booking?.groupShare ? ConvertCentToDollar(booking?.groupShare) - ConvertCentToDollar(booking?.fees) / booking?.numberOfPersons : ConvertCentToDollar(booking?.totalPrice)}</span> :
                    <span className="text-lg font-bold text-slate-900">${booking?.groupShare ? ConvertCentToDollar(booking?.groupShare) : ConvertCentToDollar(booking?.totalPrice)}</span>
                }
              </div>
            </div>

            {booking?.specialRequests && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-500">
                  <span className="font-medium">Notes:</span> {booking?.specialRequests}
                </p>
              </div>
            )}
            {
              booking?.status === "HOLD"
              && (
                <div className="bg-amber-50 mt-6 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Landmark className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium text-amber-900">Payment Incomplete</p>
                      <p className="text-xs text-amber-700">Complete your payment to confirm your Booking</p>
                    </div>
                  </div>
                  <Button onClick={() => handlePaymentClick(booking)} size="sm" className="bg-amber-600 hover:bg-amber-700">
                    Pay Now
                  </Button>
                </div>
              )}
          </div>
        </Card>
      </motion.div>
    </>
  );
}