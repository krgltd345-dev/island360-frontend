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
      // invalidatesTags: ["USER"]
    }),
    getActivityReviews: builder.query({
      query: (body) => `/reviews/${body?.id}`,
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
  useGetActivityReviewsQuery
} = userApi
