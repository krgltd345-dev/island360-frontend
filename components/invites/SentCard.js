import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MoreHorizontal, Star, CheckCircle, XCircle, Trash2, Edit, Share2, Landmark, User } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useRemoveInviteMutation } from '@/services/inviteApi';
import { toast } from 'sonner';

const statusStyles = {
  'PENDING': "bg-amber-100 text-amber-700 border-amber-200",
  'CONFIRMED': "bg-emerald-100 text-emerald-700 border-emerald-200",
  "CANCELLED": "bg-red-100 text-red-700 border-red-200",
  "COMPLETED": "bg-slate-100 text-slate-700 border-slate-200",
  'ACCEPTED': "bg-emerald-100 text-emerald-700 border-emerald-200",
  'PAID': "bg-emerald-100 text-emerald-700 border-emerald-200",
   "EXPIRED": "bg-red-100 text-red-700 border-red-200",
};

export default function SentInviteCard({ invite }) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [Remove, { isLoading }] = useRemoveInviteMutation()
  const router = useRouter()

  const handleCancel = async () => {
    try {
      const res = await Remove({ id: invite?._id }).unwrap()
      toast.success(res?.message)
    } catch (error) {
      toast.error(error?.data?.message)
      console.log(error, "error");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="overflow-hidden bg-white border-0 py-0 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="p-6">
            <div className="flex items-start flex-col justify-between mb-4">
              <div className='flex items-center gap-2 mb-4'>
                <User className="w-4 h-4 mr-2" />
                {invite?.inviteeEmail}
              </div>
              <div className='flex  gap-2'>
                <h3 className="text-2xl font-semibold text-slate-900 mb-1">
                  {invite?.activityId?.name}
                </h3>
                <Badge className={`${statusStyles[invite?.status]} border h-6 font-medium`}>
                  {invite?.status.charAt(0).toUpperCase() + invite?.status.slice(1)}
                </Badge>
              </div>
              <div className='flex gap-2'>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{moment(invite?.bookingId?.bookingDate).format('YYYY MM DD')}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{invite?.bookingId?.slotStartTime}</span>
              </div>
            </div>
            {
              invite?.status == "PENDING" &&
              <Button className={"mt-3"} disabled={isLoading} variant="destructive" onClick={() => handleCancel()}>
                <XCircle className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            }
          </div>
        </Card>
      </motion.div>
    </>
  );
}