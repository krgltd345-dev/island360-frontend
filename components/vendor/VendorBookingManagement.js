'use Client';
import React, { useState, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Calendar } from 'lucide-react';
import { useGetBookingsCountQuery } from '@/services/bookingApi';
import { BookingCard } from './Bookingcard';

export default function VendorBookingManagement({ bookings }) {
  const { data: bookingsCount, isLoading: bookingsCountLoading } = useGetBookingsCountQuery()
  if (bookings?.data?.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No Bookings Yet</h3>
        <p className="text-slate-600">Bookings will appear here once customers book your activities</p>
      </Card>
    );
  }
  console.log(bookingsCount, "bookingsCount");
  return (
    <div className="space-y-6">
      {
        bookings?.data?.map((booking) => (
          <BookingCard key={booking?._id} booking={booking} />
        ))
      }
      {/* <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-600">Pending</p>
          <p className="text-3xl font-bold text-amber-600">{pending.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-600">Confirmed</p>
          <p className="text-3xl font-bold text-green-600">{confirmed.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-600">Upcoming</p>
          <p className="text-3xl font-bold text-blue-600">{upcoming.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-600">Cancelled</p>
          <p className="text-3xl font-bold text-red-600">{cancelled.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-600">Past</p>
          <p className="text-3xl font-bold text-slate-600">{past.length}</p>
        </Card>
      </div> */}

      {/* <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed ({confirmed.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelled.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcoming.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-slate-500">No upcoming bookings</p>
            </Card>
          ) : (
            upcoming.map(booking => <BookingCard key={booking.id} booking={booking} />)
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pending.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-slate-500">No pending bookings</p>
            </Card>
          ) : (
            pending.map(booking => <BookingCard key={booking.id} booking={booking} />)
          )}
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-4">
          {confirmed.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-slate-500">No confirmed bookings</p>
            </Card>
          ) : (
            confirmed.map(booking => <BookingCard key={booking.id} booking={booking} />)
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {cancelled.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-slate-500">No cancelled bookings</p>
            </Card>
          ) : (
            cancelled.map(booking => <BookingCard key={booking.id} booking={booking} />)
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {past.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-slate-500">No past bookings</p>
            </Card>
          ) : (
            past.map(booking => <BookingCard key={booking.id} booking={booking} />)
          )}
        </TabsContent>
      </Tabs> */}
    </div>
  );
}