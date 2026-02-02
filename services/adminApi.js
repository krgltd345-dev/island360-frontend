import { baseApi } from "@/baseQuery"


export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendorRequests: builder.query({
      query: () => '/admin/vendor-requests',
      providesTags: ["VENDOR"]
    }),
    getVendors: builder.query({
      query: () => '/vendor',
      providesTags: ["VENDOR"]
    }),
    getFee: builder.query({
      query: () => '/settings/fee',
      // providesTags: ["VENDOR"]
    }),
    getAdmins: builder.query({
      query: (data) => ({
        url: '/admin',
        params: { ...data },
      }),
      providesTags: ["ADMIN"],
    }),
    approveVendor: builder.mutation({
      query: (body) => ({
        url: `admin/vendor-requests/${body.id}`,
        method: 'PATCH',
        body: { approved: body?.approved }
      }),
      invalidatesTags: ["VENDOR"]
    }),
    // getNotifications: builder.query({
    //   query: () => '/user/notification-setting',
    //   providesTags: ["Notification"]
    // }),
    addAdmin: builder.mutation({
      query: (body) => ({
        url: '/admin',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["ADMIN"]
    }),
    removeAdmin: builder.mutation({
      query: (body) => ({
        url: `/admin/${body?.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["ADMIN"]
    }),
    getSettings: builder.query({
      query: () => '/settings',
      providesTags: ["SETTINGS"]
    }),
    updateSettings: builder.mutation({
      query: (body) => ({
        url: `/settings/${body?.id}`,
        method: 'PATCH',
        body: {
          value: body?.value
        }
      }),
      invalidatesTags: ["SETTINGS"]
    }),
  }),
})

export const {
  useGetVendorRequestsQuery,
  useApproveVendorMutation,
  useGetVendorsQuery,
  useGetAdminsQuery,
  useAddAdminMutation,
  useRemoveAdminMutation,
  useGetFeeQuery,
  useGetSettingsQuery,
  useUpdateSettingsMutation
} = adminApi
