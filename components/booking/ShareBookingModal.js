'use client';
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, Mail, Plus, X, User, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useGetSentInvitesQuery, useInviteFriendsMutation, useRemoveInviteMutation } from '@/services/inviteApi';
import SentInviteCard from '../invites/SentCard';
import { Badge } from '../ui/badge';
import { statusStyles } from '@/lib/utils';
import { Card } from '../ui/card';

export default function ShareBookingDialog({ booking, open, onOpenChange }) {
  const [emailFields, setEmailFields] = useState([{ id: 1, value: '' }]);
  const [filteredInvites, setFilteredInvites] = useState([]);
  const { data: Invites } = useGetSentInvitesQuery()
  const [Remove, { isLoading }] = useRemoveInviteMutation()
  const [emails, setEmails] = useState([]);
  const [invite] = useInviteFriendsMutation()

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setEmailFields([{ id: 1, value: '' }]);
      setEmails([]);
    }
  }, [open]);

  const addEmailField = () => {
    if (emailFields.length >= booking?.numberOfPersons) {
      toast.error(`You can add only ${booking?.numberOfPersons} email(s)`);
      return;
    }

    const newId = Math.max(...emailFields.map(f => f.id), 0) + 1;
    setEmailFields([...emailFields, { id: newId, value: '' }]);
  };

  const removeEmailField = (id) => {
    if (emailFields.length > 1) {
      setEmailFields(emailFields.filter(field => field.id !== id));
    } else {
      toast.warning('At least one email field is required');
    }
  };

  const updateEmailField = (id, value) => {
    setEmailFields(emailFields.map(field =>
      field.id === id ? { ...field, value } : field
    ));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCancel = async (id) => {
    try {
      const res = await Remove({ id }).unwrap()
      toast.success(res?.message)
    } catch (error) {
      toast.error(error?.data?.message)
      console.log(error, "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Extract all non-empty emails
      const validEmails = emailFields
        .map(field => field.value.trim())
        .filter(email => email !== '');

      if (validEmails.length === 0) {
        toast.error('Please enter at least one email address');
        return;
      }

      // Validate all emails
      const invalidEmails = validEmails.filter(email => !validateEmail(email));
      if (invalidEmails.length > 0) {
        toast.error(`Invalid email addresses: ${invalidEmails.join(', ')}`);
        return;
      }

      // Store emails in array
      setEmails(validEmails);

      console.log('Emails to send invitations:', validEmails);
      const res = await invite({ bookingId: booking?._id, emails: validEmails }).unwrap()

      toast.success(`Invitations will be sent to ${validEmails.length} email${validEmails.length > 1 ? 's' : ''}`);
      onOpenChange(false);
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.data?.message)
    }
  };
  // console.log(booking, "booking");
  useEffect(() => {
    console.log(booking, Invites?.data?.length > 0, "booking && Invites?.data?.length > 0");
    if (booking && Invites?.data?.invitations?.length > 0) {
      const filtered = Invites?.data?.invitations?.filter((invite) => invite?.bookingId?._id === booking?._id)
      console.log(filtered, "filteredfiltered");
      setFilteredInvites(filtered)
    }


  }, [booking, Invites, open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Invite Group Members
          </DialogTitle>
          <DialogDescription>
            Invite others to join your booking for {booking?.activityId?.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <Label>Email Addresses</Label>
            {emailFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={field.value}
                    onChange={(e) => updateEmailField(field.id, e.target.value)}
                    className="w-full"
                  />
                </div>
                {emailFields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeEmailField(field.id)}
                    className="shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addEmailField}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Email
          </Button>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Invitations
            </Button>
          </div>
          {
            filteredInvites?.length > 0 &&
            <div className='grid grid-cols-1 gap-2 max-h-50 overflow-auto '>
              {
                filteredInvites?.map((invite) => (
                  <Card key={invite?._id} className="overflow-hidden h-full bg-white border-0 py-0 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between p-3">
                      <div className='flex items-center gap-2'>
                        <User className="w-4 h-4 mr-2" />
                        {invite?.inviteeEmail}
                        <Badge className={`${statusStyles[invite?.status]} border h-6 font-medium`}>
                          {invite?.status.charAt(0).toUpperCase() + invite?.status.slice(1)}
                        </Badge>
                      </div>
                      {
                        invite?.status == "PENDING" &&
                        <Button className={""} disabled={isLoading} variant="destructive" onClick={() => handleCancel(invite?._id)}>
                          <XCircle className="w-4 h-4" />
                        </Button>
                      }
                    </div>
                  </Card>
                ))
              }
            </div>
          }
        </form>
      </DialogContent>
    </Dialog>
  );
}