'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, Inbox, UserPlus, Users as UsersIcon } from 'lucide-react';
// import JoinBookingDialog from '@/components/booking/JoinBookingDialog';
// import ParticipantCheckout from '@/components/booking/ParticipantCheckout';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
// import BookingCard from '@/components/booking/BookingCard';
// import ReviewForm from '@/components/reviews/ReviewForm';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BookingCard from '@/components/booking/MyBookingCard';
import JoinBookingDialog from '@/components/booking/JoinBookings';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

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


export default function MyBookings() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [bookingToEdit, setBookingToEdit] = useState(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [bookingToReview, setBookingToReview] = useState(null);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [joinShareCode, setJoinShareCode] = useState('');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [editFormData, setEditFormData] = useState({
    guests: 1,
    special_requests: ''
  });

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const authenticated = await base44.auth.isAuthenticated();
  //     setIsAuthenticated(authenticated);
  //     setCheckingAuth(false);
  //     if (!authenticated) {
  //       base44.auth.redirectToLogin(window.location.href);
  //     }
  //   };
  //   checkAuth();

  //   // Check for join booking code in URL
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const joinCode = urlParams.get('join_booking');
  //   if (joinCode) {
  //     setJoinShareCode(joinCode);
  //     setJoinDialogOpen(true);
  //   }
  // }, []);



  const filteredBookings = statusFilter === 'all'
    ? bookings
    : bookings.filter(b => b.status === statusFilter);

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

  const confirmCancel = () => {
    if (bookingToCancel) {
      cancelMutation.mutate(bookingToCancel);
    }
  };

  const confirmDelete = () => {
    if (bookingToDelete) {
      deleteMutation.mutate(bookingToDelete.id);
    }
  };

  const confirmEdit = () => {
    if (bookingToEdit) {
      updateMutation.mutate({
        id: bookingToEdit.id,
        data: {
          guests: editFormData.guests,
          special_requests: editFormData.special_requests,
        }
      });
    }
  };

  const handleReviewClick = (booking) => {
    setBookingToReview(booking);
    setReviewDialogOpen(true);
  };

  const hasReview = (bookingId) => {
    // return existingReviews.some(r => r.booking_id === bookingId);
  };

  const handlePaymentClick = (booking) => {
    const participation = myParticipations.find(p => p.booking_id === booking.id);
    if (participation) {
      setSelectedBooking(booking);
      setSelectedParticipant(participation);
      setPaymentDialogOpen(true);
    }
  };

  // const getParticipantInfo = (booking) => {
  //   const participation = myParticipations.find(p => p.booking_id === booking.id);
  //   return participation;
  // };

  if (false) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="h-32 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen mt-12 bg-slate-50">
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
            <Button onClick={() => setJoinDialogOpen(true)} variant="outline" className="mt-4">
              <UserPlus className="w-4 h-4 mr-2" />
              Join Group Booking
            </Button>
          </div>
        </div>

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
            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList className="bg-white border border-slate-200 p-1">
                <TabsTrigger value="all" className="rounded-lg">All</TabsTrigger>
                <TabsTrigger value="pending" className="rounded-lg">Pending</TabsTrigger>
                <TabsTrigger value="confirmed" className="rounded-lg">Confirmed</TabsTrigger>
                <TabsTrigger value="completed" className="rounded-lg">Completed</TabsTrigger>
                <TabsTrigger value="cancelled" className="rounded-lg">Cancelled</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Inbox className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No bookings found</h3>
              <p className="text-slate-600">
                {statusFilter === 'all'
                  ? "You haven't made any bookings yet."
                  : `No ${statusFilter} bookings.`}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking, index) => {
                // const participantInfo = getParticipantInfo(booking);
                return (
                  <div key={booking.id}>
                    <BookingCard
                      booking={booking}
                      index={index}
                      onCancel={handleCancelClick}
                      onDelete={handleDeleteClick}
                      onEdit={handleEditClick}
                      onReview={handleReviewClick}
                      hasReview={hasReview(booking.id)}
                    />
                    {
                      // booking.is_group_booking && participantInfo && participantInfo.payment_status === 'unpaid' 
                      true
                      && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2"
                        >
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <UsersIcon className="w-5 h-5 text-amber-600" />
                              <div>
                                <p className="text-sm font-medium text-amber-900">Group Booking - Payment Required</p>
                                <p className="text-xs text-amber-700">Complete your payment to confirm your spot</p>
                              </div>
                            </div>
                            <Button onClick={() => handlePaymentClick(booking)} size="sm" className="bg-amber-600 hover:bg-amber-700">
                              Pay Now
                            </Button>
                          </div>
                        </motion.div>
                      )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Cancel Confirmation Dialog */}
        <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel this booking? This action cannot be undone.
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

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Booking?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this booking? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Edit Booking Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Booking</DialogTitle>
            </DialogHeader>
            {bookingToEdit && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-1">{bookingToEdit.activity_name}</p>
                  <p className="text-xs text-slate-500">
                    {bookingToEdit.booking_date} at {bookingToEdit.booking_time}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Number of Guests</Label>
                  <Input
                    type="number"
                    min="1"
                    value={editFormData.guests}
                    onChange={(e) => setEditFormData({ ...editFormData, guests: parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Special Requests</Label>
                  <Textarea
                    value={editFormData.special_requests}
                    onChange={(e) => setEditFormData({ ...editFormData, special_requests: e.target.value })}
                    placeholder="Any special requirements..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setEditDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmEdit}
                    className="flex-1 bg-slate-900"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Review Dialog */}
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Leave a Review</DialogTitle>
            </DialogHeader>
            {bookingToReview && (
              <div>
                <p className="text-sm text-slate-500 mb-4">
                  Share your experience with <span className="font-medium text-slate-700">{bookingToReview.activity_name}</span>
                </p>
                <ReviewForm
                  booking={bookingToReview}
                  onSuccess={() => {
                    setReviewDialogOpen(false);
                    queryClient.invalidateQueries({ queryKey: ['my-reviews'] });
                  }}
                  onCancel={() => setReviewDialogOpen(false)}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Join Booking Dialog */}
        <JoinBookingDialog
          shareCode={joinShareCode}
          open={joinDialogOpen}
          onOpenChange={setJoinDialogOpen}
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