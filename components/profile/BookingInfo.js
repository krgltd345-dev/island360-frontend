import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useGetUserBookingsQuery } from '@/services/bookingApi';
import { ConvertCentToDollar, statusStyles } from '@/lib/utils';

const bookings = [
  {
    "activity_id": "695b72ec812c781af2aff0ba",
    "activity_name": "Mountain Climbing",
    "booking_date": "2026-01-21",
    "booking_time": "12:00 PM",
    "guests": 1,
    "total_price": 100,
    "status": "confirmed",
    "customer_name": "yogesh.sahu",
    "customer_email": "yogesh.sahu@oodles.io",
    "customer_phone": "",
    "special_requests": null,
    "vendor_notes": null,
    "is_group_booking": false,
    "group_organizer_id": null,
    "share_code": null,
    "id": "695baeb8dfb8438b5c070388",
    "created_date": "2026-01-05T12:29:44.436000",
    "updated_date": "2026-01-05T12:29:44.436000",
    "created_by_id": "693ae5d7a333edaf661db503",
    "is_sample": false
  },
  {
    "activity_id": "6938b281afe54abb13fb53ea",
    "activity_name": "Guided Tours ",
    "booking_date": "2026-01-08",
    "booking_time": "09:00 AM",
    "guests": 1,
    "total_price": 65,
    "status": "confirmed",
    "customer_name": "Mohd Yasar",
    "customer_email": "mohd.yasar@oodles.io",
    "customer_phone": "122322333",
    "special_requests": "",
    "vendor_notes": null,
    "is_group_booking": true,
    "group_organizer_id": "695b5e0f96e04eb587d04581",
    "share_code": "BOOK-Z4T88ORO",
    "id": "695ba5dc0c34e929ac71e28b",
    "created_date": "2026-01-05T11:51:56.216000",
    "updated_date": "2026-01-05T11:51:56.216000",
    "created_by_id": "695b5e0f96e04eb587d04581",
    "is_sample": false
  },
  {
    "activity_id": "695b72ec812c781af2aff0ba",
    "activity_name": "Mountain Climbing",
    "booking_date": "2026-01-21",
    "booking_time": "12:00 PM",
    "guests": 1,
    "total_price": 100,
    "status": "confirmed",
    "customer_name": "yogesh.sahu",
    "customer_email": "yogesh.sahu@oodles.io",
    "customer_phone": "",
    "special_requests": "",
    "vendor_notes": null,
    "is_group_booking": true,
    "group_organizer_id": "693ae5d7a333edaf661db503",
    "share_code": "BOOK-PLDLO6BZ",
    "id": "695ba5b63add22b90c491f4c",
    "created_date": "2026-01-05T11:51:18.068000",
    "updated_date": "2026-01-05T11:51:18.068000",
    "created_by_id": "693ae5d7a333edaf661db503",
    "is_sample": false
  },
  {
    "activity_id": "695b72ec812c781af2aff0ba",
    "activity_name": "Mountain Climbing",
    "booking_date": "2026-01-10",
    "booking_time": "09:00 AM",
    "guests": 1,
    "total_price": 100,
    "status": "cancelled",
    "customer_name": "yogesh.sahu",
    "customer_email": "yogesh.sahu@oodles.io",
    "customer_phone": "+918287940985",
    "special_requests": "",
    "vendor_notes": null,
    "is_group_booking": false,
    "group_organizer_id": "693ae5d7a333edaf661db503",
    "share_code": null,
    "id": "695b7516399c8e7d89f116ec",
    "created_date": "2026-01-05T08:23:50.621000",
    "updated_date": "2026-01-05T08:24:19.280000",
    "created_by_id": "693ae5d7a333edaf661db503",
    "is_sample": false
  },
  {
    "activity_id": "695b72ec812c781af2aff0ba",
    "activity_name": "Mountain Climbing",
    "booking_date": "2026-01-07",
    "booking_time": "10:00 AM",
    "guests": 1,
    "total_price": 200,
    "status": "completed",
    "customer_name": "Mohd Yasar",
    "customer_email": "mohd.yasar@oodles.io",
    "customer_phone": "",
    "special_requests": "",
    "vendor_notes": "thanks for your booking",
    "is_group_booking": false,
    "group_organizer_id": "695b5e0f96e04eb587d04581",
    "share_code": null,
    "id": "695b73246c61b503d6c8b736",
    "created_date": "2026-01-05T08:15:32.454000",
    "updated_date": "2026-01-05T09:28:20.539000",
    "created_by_id": "695b5e0f96e04eb587d04581",
    "is_sample": false
  },
  {
    "activity_id": "69366bfc48655942149af007",
    "activity_name": "Private Boat Charter ",
    "booking_date": "2026-01-10",
    "booking_time": "11:00 AM",
    "guests": 1,
    "total_price": 1050,
    "status": "confirmed",
    "customer_name": "Yakshap Tyagi",
    "customer_email": "yakshap.tyagi@oodles.io",
    "customer_phone": "",
    "special_requests": "",
    "vendor_notes": null,
    "is_group_booking": false,
    "group_organizer_id": "695b5d4d9e7a6d8e1b644ebd",
    "share_code": null,
    "id": "695b6db73e8f573ee2f2d56d",
    "created_date": "2026-01-05T07:52:23.176000",
    "updated_date": "2026-01-05T07:52:23.176000",
    "created_by_id": "695b5d4d9e7a6d8e1b644ebd",
    "is_sample": false
  },
  {
    "activity_id": "69366720e3f100c5df8f5725",
    "activity_name": "Kayak Eco Tours",
    "booking_date": "2026-01-10",
    "booking_time": "11:00 AM",
    "guests": 1,
    "total_price": 75,
    "status": "cancelled",
    "customer_name": "Mohd Yasar",
    "customer_email": "mohd.yasar@oodles.io",
    "customer_phone": "",
    "special_requests": "",
    "vendor_notes": null,
    "is_group_booking": false,
    "group_organizer_id": "695b5e0f96e04eb587d04581",
    "share_code": null,
    "id": "695b67adaefda376e641405f",
    "created_date": "2026-01-05T07:26:37.451000",
    "updated_date": "2026-01-05T07:27:23.970000",
    "created_by_id": "695b5e0f96e04eb587d04581",
    "is_sample": false
  }
]

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
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{booking?.numberOfPersons} {booking?.numberOfPersons === 1 ? 'guest' : 'guests'}</span>
                </div>
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

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
            <span>Booking ID: {booking?._id.slice(0, 8)}</span>
            <span>Booked on {format(parseISO(booking?.createdAt), 'MMM d, yyyy')}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}