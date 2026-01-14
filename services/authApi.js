import { baseApi } from "@/baseQuery"


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGoogleClientId: builder.query({
      query: () => '/auth/google/clientId',
    }),

    // getUserById: builder.query({
    //   query: (id) => `/users/${id}`,
    //   providesTags: (result, error, id) => [{ type: 'User', id }],
    // }),

    googleLogin: builder.mutation({
      query: (body) => ({
        url: '/auth/google/login',
        method: 'POST',
        body,
      }),
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: '/auth/verify-reset-otp',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetGoogleClientIdQuery,
  useGoogleLoginMutation,
  useSignUpMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation
} = authApi
