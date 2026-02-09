import { baseApi } from "@/baseQuery"


export const activityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllActivities: builder.query({
      query: (data) => ({
        url: '/activities',
        params: { ...data },
      }),
      providesTags: ["ACTIVITY"],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        const { page } = arg;
        if (page > 1) {
          currentCache.data.push(...newItems.data);
        } else {
          currentCache.data = newItems.data;
        }
        currentCache.pagination = newItems.pagination;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getActivityById: builder.query({
      query: (body) => `/activities/${body?.id}`,
    }),
    getActivityMetrics: builder.query({
      query: (body) => `activities/metrics/${body?.id}`,
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
  useCreateCategoryMutation,
  useGetActivityMetricsQuery

} = activityApi
