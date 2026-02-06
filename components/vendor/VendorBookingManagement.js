'use Client';
import React, { useState, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Calendar } from 'lucide-react';
import { useGetBookingsCountQuery } from '@/services/bookingApi';
import { BookingCard } from './Bookingcard';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

export default function VendorBookingManagement({ bookings, state, setState }) {

  return (
    <div className="space-y-6">
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