

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, Clock, Users, DollarSign } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useGetAllBookingsQuery, useGetBookingsCountQuery } from '@/services/bookingApi';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { ConvertCentToDollar, statusStyles } from '@/lib/utils';

const statusConfig = {
  pending: { color: 'bg-amber-100 text-amber-700' },
  confirmed: { color: 'bg-green-100 text-green-700' },
  cancelled: { color: 'bg-red-100 text-red-700' },
  completed: { color: 'bg-blue-100 text-blue-700' },
};

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

export default function AdminBookingOversight() {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const { data: allBookings, isLoading } = useGetAllBookingsQuery([statusFilter])
  const { data: bookingsCount, isLoading: bookingsCountLoading } = useGetBookingsCountQuery()

  return (
    <div className="space-y-6">
      {
        bookingsCount?.data &&
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-sm text-slate-600">Total</p>
            <p className="text-3xl font-bold text-amber-600">{bookingsCount?.data?.total}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-slate-600">Pending</p>
            <p className="text-3xl font-bold text-slate-600">{bookingsCount?.data?.pending}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-slate-600">Confirmed</p>
            <p className="text-3xl font-bold text-green-600">{bookingsCount?.data?.confirmed}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-slate-600">completed</p>
            <p className="text-3xl font-bold text-blue-600">{bookingsCount?.data?.completed}</p>
          </Card>
        </div>
      }

      <Tabs value={statusFilter} className={"w-full"} onValueChange={setStatusFilter}>
        <div className='scrollbar-hide overflow-x-scroll'>
        <TabsList className="bg-white border w-full max-md:w-3xl border-slate-200 p-1">
          <TabsTrigger value="ALL" className="rounded-lg">All</TabsTrigger>
          <TabsTrigger value="HOLD" className="rounded-lg">Pending</TabsTrigger>
          <TabsTrigger value="CONFIRMED" className="rounded-lg">Confirmed</TabsTrigger>
          <TabsTrigger value="COMPLETED" className="rounded-lg">Completed</TabsTrigger>
          <TabsTrigger value="CANCELLED" className="rounded-lg">Cancelled</TabsTrigger>
          <TabsTrigger value="REFUNDED" className="rounded-lg">Refunded</TabsTrigger>
        </TabsList>
        </div>
      </Tabs>

      <div className="space-y-4">
        {allBookings?.data.map(booking => (
          <Card key={booking._id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-slate-900">{booking?.activityId?.name}</h4>
                  <Badge className={statusStyles[booking?.status]}>
                    {booking?.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
                  <div>
                    <p className="text-xs text-slate-500">Customer</p>
                    <p className="font-medium text-slate-900">{booking?.userId?.name}</p>
                    <p className="text-xs">{booking?.userId?.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Date & Time</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(parseISO(booking?.bookingDate), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {booking?.slotStartTime}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Guests</p>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {booking?.quantity}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Total</p>
                    <div className="flex items-center gap-1 font-semibold text-slate-900">
                      <DollarSign className="w-3 h-3" />
                      {ConvertCentToDollar(booking?.price)}
                    </div>
                    {
                      booking?.refundAmount &&
                      <div className="flex items-center gap-1 font-semibold text-slate-900">
                        Refund Amt. <DollarSign className="w-3 h-3" />
                        {ConvertCentToDollar(booking?.refundAmount)}
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}