import { baseApi } from "@/baseQuery"


export const inviteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSentInvites: builder.query({
      query: (body) => `/booking-invites/sent`,
      providesTags: ["INVITE"]
    }),
    getReceivedinvites: builder.query({
      query: (body) => `/booking-invites/received`,
      providesTags: ["INVITE"]
    }),
    inviteFriends: builder.mutation({
      query: (body) => ({
        url: '/booking-invites/send',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["INVITE"]
    }),
    inviteAction: builder.mutation({
      query: (body) => ({
        url: `/booking-invites/${body.id}/${body.action}`,
        method: 'POST',
      }),
      invalidatesTags: ["INVITE"]
    }),
    removeInvite: builder.mutation({
      query: (body) => ({
        url: `/booking-invites/inviter/${body.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["INVITE"]
    }),
    removeMyInvite: builder.mutation({
      query: (body) => ({
        url: `/booking-invites/invitee/${body.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["INVITE"]
    }),
    createInvitePayment: builder.mutation({
      query: (body) => ({
        url: `/payments/invite/${body?.id}`,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useInviteFriendsMutation,
  useGetReceivedinvitesQuery,
  useGetSentInvitesQuery,
  useRemoveInviteMutation,
  useRemoveMyInviteMutation,
  useInviteActionMutation,
  useCreateInvitePaymentMutation

} = inviteApi
