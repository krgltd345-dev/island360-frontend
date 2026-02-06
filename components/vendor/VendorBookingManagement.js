'use Client';
import React, { useState, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Calendar } from 'lucide-react';
import { useGetBookingsCountQuery } from '@/services/bookingApi';
import { BookingCard } from './Bookingcard';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

export default function VendorBookingManagement({ bookings, state, setState }) {
  const { data: bookingsCount, isLoading: bookingsCountLoading } = useGetBookingsCountQuery()


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
        <Card className="p-4">
          <p className="text-sm text-slate-600">Cancelled</p>
          <p className="text-3xl font-bold text-red-600">{"NA"}</p>
        </Card>
      </div>
      <Tabs value={state} onValueChange={setState} className="w-full">
        <div className='scrollbar-hide overflow-x-scroll'>
          <TabsList className="grid w-full max-md:w-3xl grid-cols-4">
            <TabsTrigger value="CONFIRMED">CONFIRMED</TabsTrigger>
            <TabsTrigger value="COMPLETED">COMPLETED</TabsTrigger>
            <TabsTrigger value="REFUNDED">REFUNDED</TabsTrigger>
            <TabsTrigger value="CANCELLED">CANCELLED</TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
      {bookings?.data?.length === 0 &&
        <Card className="p-8 text-center">
          <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Bookings Yet</h3>
          <p className="text-slate-600">Bookings will appear here once customers book your activities</p>
        </Card>
      }
      {
        bookings?.data?.map((booking) => (
          <BookingCard key={booking?._id} booking={booking} />
        ))
      }
    </div>
  );
}