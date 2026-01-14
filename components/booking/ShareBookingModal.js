'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Share2, Copy, Mail, Users, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

export default function ShareBookingDialog({ booking, open, onOpenChange }) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');

  const generateShareCode = () => {
    return `BOOK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  };

  const handleCopyLink = async () => {
    if (!booking.share_code) {
      const shareCode = generateShareCode();
      await updateBookingMutation.mutateAsync({
        id: booking.id,
        data: {
          share_code: shareCode,
          is_group_booking: true,
          group_organizer_id: currentUser?.id
        }
      });
      booking.share_code = shareCode;
    }

    const shareLink = `${window.location.origin}?join_booking=${booking.share_code}`;
    await navigator.clipboard.writeText(shareLink);
    toast.success('Link copied to clipboard!');
  };

  const handleSendInvite = () => {
    if (!inviteEmail || !inviteName) {
      toast.error('Please enter both name and email');
      return;
    }
    inviteMutation.mutate({ email: inviteEmail, name: inviteName });
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4 text-amber-500" />,
    accepted: <CheckCircle className="w-4 h-4 text-green-500" />,
    declined: <XCircle className="w-4 h-4 text-red-500" />
  };

  const paymentBadge = (participant) => {
    if (participant.payment_status === 'paid') {
      return <Badge className="bg-green-100 text-green-700 text-xs">Paid ${participant.amount_paid?.toFixed(2)}</Badge>;
    }
    return <Badge variant="outline" className="text-xs">Unpaid</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Booking
          </DialogTitle>
          <DialogDescription>
            Invite others to join your booking for {booking?.activity_name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Share Link */}
          <div className="space-y-2">
            <Label>Share Link</Label>
            <div className="flex gap-2">
              <Input
                value={booking?.share_code ? `${window.location.origin}?join_booking=${booking.share_code}` : 'Generate a link first'}
                readOnly
                className="flex-1"
              />
              <Button onClick={handleCopyLink} variant="outline" size="icon">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-500">Anyone with this link can join your booking</p>
          </div>

          {/* Invite by Email */}
          <div className="space-y-2">
            <Label>Invite by Email</Label>
            <div className="space-y-2">
              <Input
                placeholder="Name"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <Button
                onClick={handleSendInvite}
                className="w-full"
                // disabled={inviteMutation.isPending}
              >
                <Mail className="w-4 h-4 mr-2" />
                {'Send Invitation'}
              </Button>
            </div>
          </div>

          {/* Participants List */}
          {/* {participants.length > 0 && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Participants ({participants.length})
              </Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{participant.user_name}</p>
                      <p className="text-xs text-slate-500">{participant.user_email}</p>
                      {participant.booking_number && (
                        <p className="text-xs text-slate-400 mt-1">#{participant.booking_number}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {participant.is_organizer && (
                        <Badge variant="outline" className="text-xs">Organizer</Badge>
                      )}
                      {paymentBadge(participant)}
                      {statusIcons[participant.status]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </DialogContent>
    </Dialog>
  );
}