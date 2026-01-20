import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  credentials: "include",
  prepareHeaders: (headers) => {
    // Example: attach token
    // const token = localStorage.getItem('token')
    // if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  },
})

// Track if we're currently refreshing to prevent multiple simultaneous refresh calls
let isRefreshing = false
let refreshPromise = null

// Custom baseQuery with token refresh logic
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  // If we get a 401, try to refresh the token
  if (result?.error?.status === 401) {
    // Skip refresh if this is already the refresh or logout endpoint to prevent infinite loop
    if (
      args?.url === 'auth/refresh' || 
      args?.url === '/auth/refresh' ||
      args?.url === 'auth/logout' ||
      args?.url === '/auth/logout'
    ) {
      return result
    }

    // If we're already refreshing, wait for that promise
    if (isRefreshing && refreshPromise) {
      await refreshPromise
      // Retry the original query after refresh completes
      result = await baseQuery(args, api, extraOptions)
      return result
    }

    // Start refresh process
    isRefreshing = true
    refreshPromise = baseQuery(
      {
        url: 'auth/refresh',
        method: 'POST',
        credentials: 'include',
      },
      api,
      extraOptions
    )

    const refreshResult = await refreshPromise
    isRefreshing = false
    refreshPromise = null

    if (refreshResult?.data) {
      // Retry the original query with the new token
      result = await baseQuery(args, api, extraOptions)
    } else {
      // Refresh failed, call logout endpoint
      try {
        await baseQuery(
          {
            url: 'auth/logout',
            method: 'POST',
            credentials: 'include',
          },
          api,
          extraOptions
        )
      } catch (logoutError) {
        // Logout call failed, but we'll still redirect
        console.error('Logout failed:', logoutError)
      }
      
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['USER', 'VENDOR', 'ADMIN', "Notification"],
  endpoints: () => ({}),
})