'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Users } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
// import ParticipantCheckout from './ParticipantCheckout';

export default function JoinBookingDialog({ shareCode, open, onOpenChange }) {
  const [inputCode, setInputCode] = useState(shareCode || '');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [myParticipant, setMyParticipant] = useState(null);


  return (
    <>
      {/* <ParticipantCheckout
        booking={booking}
        participant={myParticipant}
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
      /> */}
      <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join Group Booking</DialogTitle>
          <DialogDescription>
            Enter a booking code to join an existing group booking
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Booking Code</Label>
            <Input
              placeholder="BOOK-XXXXXXXX"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              className="uppercase"
            />
          </div>

          {false && (
            <div className="text-center text-sm text-slate-500 py-4">
              Loading booking details...
            </div>
          )}

          {/* {booking && (
            <div className="bg-slate-50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-slate-900">{booking.activity_name}</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(booking.booking_date), 'MMMM d, yyyy')}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {booking.booking_time}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {booking.guests} guests
                </div>
              </div>
            </div>
          )} */}

          {/* {!booking && inputCode && !isLoading && (
            <div className="text-center text-sm text-red-600 py-4">
              Booking not found. Please check the code and try again.
            </div>
          )} */}

          <Button
            onClick={() => joinMutation.mutate()}
            // disabled={!booking || joinMutation.isPending}
            className="w-full"
          >
            {'Join Booking'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}