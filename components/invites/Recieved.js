import { useGetReceivedinvitesQuery } from '@/services/inviteApi'
import React from 'react'
import ReceiveInviteCard from './ReceiveCard';

const Received = () => {
  const { data: Invites, isLoading } = useGetReceivedinvitesQuery()

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {
        Invites?.data?.invitations.map((invite) => (
          <ReceiveInviteCard key={invite?._id} invite={invite} />
        ))
      }
    </div>
  )
}

export default Received