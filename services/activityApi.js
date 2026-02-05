import { baseApi } from "@/baseQuery"


export const activityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllActivities: builder.query({
      query: (data) => ({
        url: '/activities',
        params: { ...data },
      }),
      providesTags: ["ACTIVITY"]
    }),
    getActivityById: builder.query({
      query: (body) => `/activities/${body?.id}`,
    }),
    getCategory: builder.query({
      query: (body) => `/categories`,
      providesTags: ["CATEGORY"]
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["CATEGORY"]
    }),
    createActivity: builder.mutation({
      query: (body) => ({
        url: '/activities',
        method: 'POST',
        body,
      }),
      invalidatesTags: ["ACTIVITY"]
    }),
    getActivityCount: builder.query({
      query: () => '/activities/count',
      providesTags: ["ACTIVITY"]
    }),
    updateActivity: builder.mutation({
      query: (body) => ({
        url: `activities/${body._id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ["ACTIVITY"]
    }),
    removeActivity: builder.mutation({
      query: (body) => ({
        url: `activities/${body.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["ACTIVITY"]
    }),
  }),
})

export const {
  useGetAllActivitiesQuery,
  useGetActivityByIdQuery,
  useCreateActivityMutation,
  useGetActivityCountQuery,
  useUpdateActivityMutation,
  useRemoveActivityMutation,
  useGetCategoryQuery,
  useCreateCategoryMutation

} = activityApi
