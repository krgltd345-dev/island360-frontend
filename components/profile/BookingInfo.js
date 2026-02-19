import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock, Timer } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useGetUserBookingsQuery } from '@/services/bookingApi';
import { ConvertCentToDollar, statusStyles } from '@/lib/utils';


export default function BookingInfo() {
  const { data: userBookings, isLoading } = useGetUserBookingsQuery(["ALL"])


  const calculateAmount = (booking, cancel) => {
    if (booking?.status === "CANCELLED" || booking?.status === "REFUNDED" || cancel) {
      if (booking?.groupShare) {
        return `Refund Amount $${ConvertCentToDollar(booking?.groupShare) * booking?.activityId?.refundOnCancellations / 100}`
      } else {
        return `Refund Amount $${ConvertCentToDollar(booking?.totalPrice) * booking?.activityId?.refundOnCancellations / 100}`
      }
    } else {
      if (booking?.groupShare) {
        return `$${ConvertCentToDollar(booking?.groupShare)}`
      } else {
        return `$${ConvertCentToDollar(booking?.totalPrice)}`
      }
    }
  }
  if (userBookings?.data?.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-900 mb-2">No Bookings Yet</h3>
        <p className="text-slate-600">Your booking history will appear here</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-slate-900">Booking History</h3>
        <span className="text-sm text-slate-600">{userBookings?.pagination?.total} total bookings</span>
      </div>

      {userBookings?.data.map((booking) => (
        <Card key={booking._id} className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-lg font-semibold text-slate-900">
                  {booking?.activityId?.name}
                </h4>
                <Badge className={statusStyles[booking?.status]}>
                  {booking?.status}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{format(parseISO(booking?.bookingDate), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{booking?.slotStartTime}</span>
                  {"-"}
                  <span>{booking?.slotEndTime}</span>
                </div>
                {
                  booking?.numberOfPersons > 0 &&
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{booking?.numberOfPersons} {booking?.numberOfPersons === 1 ? 'guest' : 'guests'}</span>
                  </div>
                }
                {
                  (booking?.activityId?.billingType === "PER_HOUR" || booking?.activityId?.billingType === "PER_UNIT") &&
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4" />
                    {booking?.quantity} {booking?.activityId?.billingType === "PER_HOUR" ? "Hours" : "Units"}
                  </div>
                }
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">
                    {calculateAmount(booking)}
                  </span>
                </div>
              </div>

              {booking?.specialRequests && (
                <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-600 mb-1">Special Requests:</p>
                  <p className="text-sm text-slate-800">{booking?.specialRequests}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
            <span>Booking ID: {booking?._id}</span>
            <span>Booked on {format(parseISO(booking?.createdAt), 'MMM d, yyyy')}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}