"use Client";
import { ConvertCentToDollar, statusStyles } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import moment from "moment";
import { Ban, Calendar, CheckCircle, Clock, Mail, Users } from "lucide-react";
import { Button } from "../ui/button";
import { useCompleteBookingMutation } from "@/services/bookingApi";
import { toast } from "sonner";

export const BookingCard = ({ booking }) => {

  const [Complete, { isLoading }] = useCompleteBookingMutation()

  const handleComplete = async () => {
    try {
      const res = await Complete({ id: booking?._id }).unwrap()
      toast.success(res?.message)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message)
    }
  }
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-slate-900">{booking?.activityId?.name}</h3>
            <Badge className={statusStyles[booking?.status]}>
              {booking?.status}
            </Badge>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {moment(booking?.bookingDate).format("MMMM DD, YY")}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {booking?.slotStartTime}
              {"-"}
              <span>{booking?.slotEndTime}</span>
            </div>
            {
              (booking?.activityId?.billingType === "PER_HOUR" || booking?.activityId?.billingType === "PER_UNIT") &&
              <div className="flex items-center gap-2">
                {
                  booking?.activityId?.billingType === "PER_HOUR" && <Clock className="w-4 h-4" />
                }
                {booking?.quantity} { booking?.activityId?.billingType === "PER_HOUR" ? "Hours" : "Units"}
              </div>
            }
            {
              booking?.numberOfPersons > 0 &&
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {booking?.numberOfPersons} Max Group Members
              </div>
            }
            {
              booking?.inviteAcceptedCount > 0 &&
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {booking?.inviteAcceptedCount + 1} Confirmed Group Members
              </div>
            }
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900">${ConvertCentToDollar(booking?.groupBooking ? booking?.price * (booking?.inviteAcceptedCount + 1) / booking?.numberOfPersons : booking?.price)}</p>
        </div>
      </div>

      <div className="border-t pt-4 mb-4">
        <p className="text-sm font-medium text-slate-900 mb-2">Customer Details</p>
        <div className="space-y-1 text-sm text-slate-600">
          <p className="font-medium">{booking?.userId?.name}</p>
          <div className="flex items-center gap-2">
            <Mail className="w-3 h-3" />
            {booking?.userId?.email}
          </div>
        </div>
        {booking?.specialRequests && (
          <div className="mt-2">
            <p className="text-xs text-slate-500">Special Requests:</p>
            <p className="text-sm text-slate-700">{booking?.specialRequests}</p>
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {booking.status === 'CONFIRMED' && (
          <>
            <Button
              size="sm"
              disabled={isLoading}
              onClick={handleComplete}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Mark Complete
            </Button>
            {/* <Button
              size="sm"
              variant="outline"
              onClick={() => {
                toast.warning("Cannot Cancel Bookings at the Moment")
              }}
              className="text-red-600 hover:text-red-700"
            >
              <Ban className="w-4 h-4 mr-1" />
              Cancel
            </Button> */}
          </>
        )}
      </div>
    </Card>
  );
}