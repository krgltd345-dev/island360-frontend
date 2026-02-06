import { baseApi } from "@/baseQuery"


export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableSlots: builder.query({
      query: (data) => ({
        url: `/bookings/available-slots/${data?.id}?date=${data?.date}`,
      }),
    }),
    getUserBookings: builder.query({
      query: (states) => {
        console.log(states, "stateeeee");
        if (states.length === 1 && states[0] === 'ALL') {
          return {
            url: `/bookings`,
          }
        }
        const params = new URLSearchParams()
        states.forEach((s, i) => params.append(`states[${i}]`, s))
        return ({
          url: `/bookings?${params.toString()}`,
        })
      },
      providesTags: ["BOOKING"]
    }),
    createBooking: builder.mutation({
      query: (body) => ({
        url: '/bookings',
        method: 'POST',
        body,
      }),
    }),
    cancelBooking: builder.mutation({
      query: (body) => ({
        url: `/bookings/${body?.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["BOOKING"]
    }),
    createPayment: builder.mutation({
      query: (body) => ({
        url: `/payments/booking/${body?.id}`,
        method: 'POST',
      }),
    }),


    getVendorBookings: builder.query({
      query: (data) => ({
        url: `/bookings/vendor/?state=${data?.state}`,
      }),
      providesTags: ["BOOKING"]

    }),
    getBookingsCount: builder.query({
      query: (data) => ({
        url: `/bookings/count`,
      }),
      providesTags: ["BOOKING"]

    }),
    completeBooking: builder.mutation({
      query: (body) => ({
        url: `/bookings/${body?.id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ["BOOKING"]
    }),

  }),
})

export const {
  useGetAvailableSlotsQuery,
  useCreateBookingMutation,
  useCreatePaymentMutation,
  useGetUserBookingsQuery,
  useCancelBookingMutation,
  useGetVendorBookingsQuery,
  useGetBookingsCountQuery,
  useCompleteBookingMutation,


} = bookingApi
