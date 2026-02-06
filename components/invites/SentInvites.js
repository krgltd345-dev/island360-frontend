import { useGetSentInvitesQuery } from '@/services/inviteApi'
import React from 'react'
import SentInviteCard from './SentCard';
import { Inbox } from 'lucide-react';

const SentInvites = () => {
  const { data: Invites, isLoading } = useGetSentInvitesQuery()

  if (Invites?.data?.count === 0) {
    return (
      <div
        className="text-center py-16"
      >
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Inbox className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">No Invites found</h3>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {
        Invites?.data?.invitations.map((invite) => (
          <SentInviteCard key={invite?._id} invite={invite} />
        ))
      }
    </div>
  )
}

export default SentInvites