import { useGetSentInvitesQuery } from '@/services/inviteApi'
import React from 'react'
import SentInviteCard from './SentCard';

const SentInvites = () => {
  const { data: Invites, isLoading } = useGetSentInvitesQuery()

  console.log(Invites, "isLoading");
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