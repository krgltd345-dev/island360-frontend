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
    // vendorApplication: builder.mutation({
    //   query: (body) => ({
    //     url: '/user/vendor-application',
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ["USER"]
    // }),
  }),
})

export const {
  useGetVendorRequestsQuery,
  useApproveVendorMutation,
  useGetVendorsQuery,
  useGetAdminsQuery,
  useAddAdminMutation,
  useRemoveAdminMutation
} = adminApi
