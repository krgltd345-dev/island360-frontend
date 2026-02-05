import { baseApi } from "@/baseQuery"


export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => '/user/profile',
      providesTags: ["USER"]
    }),
    getUserRole: builder.query({
      query: () => '/auth/me',
      providesTags: ["USER", 'VENDOR']
    }),
    getVendorDetails: builder.query({
      query: () => '/vendor/user',
    }),
    getAllUser: builder.query({
      query: (data) => ({
        url: '/user',
        params: { ...data },
      }),
      providesTags: ["ADMIN"]
    }),
    getUserById: builder.query({
      query: (body) => `/user/${body?.id}`,
    }),
    getNotifications: builder.query({
      query: () => '/user/notification-setting',
      providesTags: ["Notification"]
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: '/user/profile',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ["USER"]
    }),
    updateNotifications: builder.mutation({
      query: (body) => ({
        url: '/user/notification-setting',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ["Notification"]
    }),
    vendorApplication: builder.mutation({
      query: (body) => ({
        url: '/user/vendor-application',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["USER"]
    }),
    submitReview: builder.mutation({
      query: (body) => ({
        url: `/reviews/${body?.id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ["REVIEWS"]
    }),
    getActivityReviews: builder.query({
      query: (body) => `/reviews/${body?.id}`,
      providesTags: ["REVIEWS"]

    }),
    getUserActivityReviews: builder.query({
      query: (body) => `/reviews/user/${body?.id}`,
      providesTags: ["REVIEWS"]

    }),
    removeReview: builder.mutation({
      query: (body) => ({
        url: `/reviews/${body?.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["REVIEWS"]
    }),
    getVendorStats: builder.query({
      query: (body) => `/reviews/vendor-stats`,

    }),
    getVendorReviews: builder.query({
      query: (body) => `/reviews/vendor`,

    }),
  }),
})

export const {
  useGetUserProfileQuery,
  useGetUserRoleQuery,
  useGetAllUserQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
  useGetNotificationsQuery,
  useUpdateNotificationsMutation,
  useVendorApplicationMutation,
  useSubmitReviewMutation,
  useGetActivityReviewsQuery,
  useGetUserActivityReviewsQuery,
  useRemoveReviewMutation,
  useGetVendorStatsQuery,
  useGetVendorReviewsQuery,
  useGetVendorDetailsQuery
} = userApi
