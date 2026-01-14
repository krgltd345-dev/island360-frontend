import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    credentials: "include",
    prepareHeaders: (headers) => {
      // Example: attach token
      // const token = localStorage.getItem('token')
      // if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  // tagTypes: ['User', 'Post'],
  endpoints: () => ({}),
})