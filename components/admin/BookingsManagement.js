

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, DollarSign } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useGetAllBookingsQuery, useGetBookingsCountQuery } from '@/services/bookingApi';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { ConvertCentToDollar, statusStyles } from '@/lib/utils';


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