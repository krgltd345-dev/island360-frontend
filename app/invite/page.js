'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, Inbox, Share2, UserPlus, Users as UsersIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import BookingCard from '@/components/booking/MyBookingCard';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { useCancelBookingMutation, useGetUserBookingsQuery } from '@/services/bookingApi';
import { useRouter } from 'next/navigation';
import Recieved from '@/components/invites/Recieved';
import SentInvites from '@/components/invites/SentInvites';
import { ConvertCentToDollar } from '@/lib/utils';
import ReviewDialog from '@/components/booking/ReviewDialog';



export default function Invite() {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [showBookings, setShowBookings] = useState(true);
  const [bookingToEdit, setBookingToEdit] = useState(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [bookingToReview, setBookingToReview] = useState(null);
  const [editFormData, setEditFormData] = useState({
    guests: 1,
    special_requests: ''
  });

  const { data: userBookings, isLoading } = useGetUserBookingsQuery([statusFilter])
  const [Cancel] = useCancelBookingMutation()

  const handleCancelClick = (booking) => {
    setBookingToCancel(booking);
    setCancelDialogOpen(true);
  };

  const handleDeleteClick = (booking) => {
    setBookingToDelete(booking);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (booking) => {
    setBookingToEdit(booking);
    setEditFormData({
      guests: booking.guests,
      special_requests: booking.special_requests || ''
    });
    setEditDialogOpen(true);
  };

  const confirmCancel = async () => {
    try {
      if (bookingToCancel) {
        const res = await Cancel({ id: bookingToCancel?._id }).unwrap()
        toast.success(res?.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message)
    }
  };

  const handleReviewClick = (booking) => {
    setBookingToReview(booking);
    setReviewDialogOpen(true);
  };

  const hasReview = (bookingId) => {
    // return existingReviews.some(r => r.booking_id === bookingId);
  };

  // const getParticipantInfo = (booking) => {
  //   const participation = myParticipations.find(p => p.booking_id === booking.id);
  //   return participation;
  // };


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

  if (isLoading) {
    return (
      <LayoutWrapper>
        <div className="min-h-[calc(100vh-156px)] mt-12 bg-slate-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-slate-200 rounded w-1/4"></div>
              <div className="h-32 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <div className="min-h-[calc(100vh-156px)] mt-12 bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 text-sky-600 mb-3">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium tracking-wide uppercase">Your Reservations</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>
            </motion.div>
            <div className='flex items-center gap-2'>
              <Button onClick={() => setShowBookings(true)} variant={showBookings ? 'default' : 'outline'} className="mt-4">
                <UserPlus className="w-4 h-4 mr-2" />
                Bookings
              </Button>
              <Button onClick={() => setShowBookings(false)} variant={!showBookings ? 'default' : 'outline'} className="mt-4">
                <Share2 className="w-4 h-4 mr-2" />
                Invites
              </Button>
            </div>
          </div>
        </div>
        {
          showBookings ?
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4 text-slate-600">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filter by status</span>
                </div>
                <Tabs value={statusFilter} className={"w-full scrollbar-hide overflow-x-scroll"} onValueChange={setStatusFilter}>
                  <TabsList className="bg-white border border-slate-200 p-1">
                    <TabsTrigger value="ALL" className="rounded-lg">All</TabsTrigger>
                    <TabsTrigger value="HOLD" className="rounded-lg">Pending</TabsTrigger>
                    <TabsTrigger value="CONFIRMED" className="rounded-lg">Confirmed</TabsTrigger>
                    <TabsTrigger value="COMPLETED" className="rounded-lg">Completed</TabsTrigger>
                    <TabsTrigger value="CANCELLED" className="rounded-lg">Cancelled</TabsTrigger>
                    <TabsTrigger value="REFUNDED" className="rounded-lg">Refunded</TabsTrigger>
                  </TabsList>
                </Tabs>
              </motion.div>

              {/* Bookings List */}
              {userBookings?.pagination?.total === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Inbox className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No bookings found</h3>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {userBookings?.data?.map((booking, index) => {
                    // const participantInfo = getParticipantInfo(booking);
                    return (
                      <div key={booking._id}>
                        <BookingCard
                          booking={booking}
                          index={index}
                          onCancel={handleCancelClick}
                          onDelete={handleDeleteClick}
                          onEdit={handleEditClick}
                          onReview={handleReviewClick}
                          calculateAmount={calculateAmount}
                          hasReview={hasReview(booking.id)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            :
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

              <Tabs defaultValue="received" className="space-y-6">
                <TabsList className={`grid grid-cols-2 w-full'}`}>
                  <TabsTrigger value="received">
                    Received Invites
                  </TabsTrigger>
                  <TabsTrigger value="sent">
                    Sent Invites
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="received">
                  <Recieved />
                </TabsContent>

                <TabsContent value="sent">
                  <SentInvites />
                </TabsContent>
              </Tabs>
            </div>

        }


        {/* Cancel Confirmation Dialog */}
        <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
              <AlertDialogDescription>
                <>
                  Are you sure you want to cancel this booking? This action cannot be undone.
                  All accepted and paid invitees will also be cancelled and refunded.<br />
                  <span className='text-black font-semibold'>{calculateAmount(bookingToCancel, true)}</span>
                </>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Booking</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmCancel}
                className="bg-red-600 hover:bg-red-700"
              >
                Yes, Cancel
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Review Dialog */}
        <ReviewDialog
          reviewDialogOpen={reviewDialogOpen}
          setReviewDialogOpen={setReviewDialogOpen}
          bookingToReview={bookingToReview}
        />

        {/* Participant Payment Dialog */}
        {/* <ParticipantCheckout
        booking={selectedBooking}
        participant={selectedParticipant}
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
      /> */}
      </div>
    </LayoutWrapper>
  );
}