import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MoreHorizontal, Star, CheckCircle, XCircle, Trash2, Edit, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ShareBookingDialog from './ShareBookingModal';

const statusStyles = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
  completed: "bg-slate-100 text-slate-700 border-slate-200"
};

export default function BookingCard({ booking, index = 0, onCancel, onDelete, onEdit, onReview, hasReview }) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const canReview = booking.status === 'completed' && !hasReview;
  const canEdit = booking.status === 'pending' || booking.status === 'confirmed';
  const canCancel = booking.status === 'pending' || booking.status === 'confirmed';
  const canDelete = booking.status === 'cancelled';
  const canShare = booking.status === 'confirmed' || booking.status === 'pending';

  return (
    <>
      <ShareBookingDialog
        booking={booking}
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Card className="overflow-hidden bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  {booking.activity_name}
                </h3>
                <Badge className={`${statusStyles[booking.status]} border font-medium`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {canShare && (
                    <DropdownMenuItem onClick={() => setShareDialogOpen(true)}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share & Invite
                    </DropdownMenuItem>
                  )}
                  {canEdit && (
                    <DropdownMenuItem onClick={() => onEdit(booking)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Booking
                    </DropdownMenuItem>
                  )}
                  {(canShare || canEdit) && (canCancel || canDelete) && <DropdownMenuSeparator />}
                  {canCancel && (
                    <DropdownMenuItem
                      onClick={() => onCancel(booking)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel Booking
                    </DropdownMenuItem>
                  )}
                  {canDelete && (
                    <DropdownMenuItem
                      onClick={() => onDelete(booking)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Booking
                    </DropdownMenuItem>
                  )}
                  {(canReview || hasReview) && (canEdit || canCancel || canDelete) && <DropdownMenuSeparator />}
                  {canReview && (
                    <DropdownMenuItem onClick={() => onReview(booking)}>
                      <Star className="w-4 h-4 mr-2 text-amber-500" />
                      Leave a Review
                    </DropdownMenuItem>
                  )}
                  {hasReview && (
                    <DropdownMenuItem disabled className="text-slate-500">
                      <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />
                      Review Submitted
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{format(new Date(booking.booking_date), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{booking.booking_time}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-slate-900">${booking.total_price}</span>
              </div>
            </div>

            {booking.special_requests && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-500">
                  <span className="font-medium">Notes:</span> {booking.special_requests}
                </p>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </>
  );
}