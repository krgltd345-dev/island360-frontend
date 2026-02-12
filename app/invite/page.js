'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Mail, Plus, Share2, User, Users as UsersIcon, X, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { useGetBookingByIdQuery } from '@/services/bookingApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { statusStyles } from '@/lib/utils';
import { useGetSentInvitesQuery, useInviteFriendsMutation, useRemoveInviteMutation } from '@/services/inviteApi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';



export default function Invite() {
  const searchParams = useSearchParams();
  const router = useRouter()
  const bookingId = searchParams.get('id');


  const { data: booking, isLoading } = useGetBookingByIdQuery({ id: bookingId }, { skip: !bookingId });
  const [emailFields, setEmailFields] = useState([{ id: 1, value: '' }]);
  const [filteredInvites, setFilteredInvites] = useState([]);
  const { data: Invites } = useGetSentInvitesQuery()
  const [Remove, { isLoading: removeLoading }] = useRemoveInviteMutation()
  const [emails, setEmails] = useState([]);
  const [invite] = useInviteFriendsMutation()


  // useEffect(() => {
  //   if (!open) {
  //     setEmailFields([{ id: 1, value: '' }]);
  //     setEmails([]);
  //   }
  // }, [open]);

  const addEmailField = () => {
    if (emailFields.length >= booking?.data?.booking?.numberOfPersons) {
      toast.error(`You can add only ${booking?.data?.booking?.numberOfPersons} email(s)`);
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
      const res = await invite({ bookingId: booking?.data?.booking?._id, emails: validEmails }).unwrap()

      toast.success(`Invitations will be sent to ${validEmails.length} email${validEmails.length > 1 ? 's' : ''}`);
      setEmailFields([{ id: 1, value: '' }]);
      setEmails([]);
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.data?.message)
    }
  };
  // console.log(booking, "booking");
  useEffect(() => {
    if (booking && Invites?.data?.invitations?.length > 0) {
      const filtered = Invites?.data?.invitations?.filter((invite) => invite?.bookingId?._id === booking?.data?.booking?._id)
      setFilteredInvites(filtered)
    }


  }, [booking, Invites])


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
                <Link href={('/mybookings')}>
                  <Button className={"text-black"} variant="ghost" size="icon">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium tracking-wide uppercase">Group Invites</span>
              </div>
              <h1 className="text-3xl flex gap-2 items-center font-bold text-slate-900"> <Share2 className="w-5 h-5" />Invite your Friends</h1>
              <p>
                Invite others to join your booking for {booking?.data?.booking?.activityId?.name}
              </p>
            </motion.div>
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
                              {invite?.status}
                            </Badge>
                          </div>
                          {
                            invite?.status == "PENDING" &&
                            <Button className={""} disabled={removeLoading} variant="destructive" onClick={() => handleCancel(invite?._id)}>
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

          </motion.div>
        </div>
      </div>
    </LayoutWrapper>
  );
}