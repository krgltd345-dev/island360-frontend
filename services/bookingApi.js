import { baseApi } from "@/baseQuery"


export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableSlots: builder.query({
      query: (data) => ({
        url: `/bookings/available-slots/${data?.id}?date=${data?.date}`,
      }),
    }),
    getBookingById: builder.query({
      query: (data) => ({
        url: `/bookings/${data?.id}`,
      }),
    }),
    getUserBookings: builder.query({
      query: (states) => {
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
    getAllBookings: builder.query({
      query: (states) => {
        if (states.length === 1 && states[0] === 'ALL') {
          return {
            url: `/bookings/all`,
          }
        }
        const params = new URLSearchParams()
        states.forEach((s, i) => params.append(`states[${i}]`, s))
        return ({
          url: `/bookings/all?${params.toString()}`,
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
    rescheduleBooking: builder.mutation({
      query: (body) => ({
        url: '/bookings/reschedule',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ["BOOKING"]
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
    createNmiOrder: builder.mutation({
      query: (body) => ({
        url: `/nmi-payments/order`,
        method: 'POST',
        body
      }),
    }),
    nmiPayment: builder.mutation({
      query: (body) => ({
        url: `/nmi-payments`,
        method: 'POST',
        body
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
  useRescheduleBookingMutation,
  useCreatePaymentMutation,
  useGetUserBookingsQuery,
  useGetAllBookingsQuery,
  useCancelBookingMutation,
  useGetVendorBookingsQuery,
  useGetBookingsCountQuery,
  useCompleteBookingMutation,
  useGetBookingByIdQuery,

  useCreateNmiOrderMutation,
  useNmiPaymentMutation


} = bookingApi
