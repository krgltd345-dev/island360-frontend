import { baseApi } from "@/baseQuery"


export const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (body) => ({
        url: '/upload/image',
        method: 'POST',
        body : body.formData,
      }),
    }),
    uploadDocument: builder.mutation({
      query: (body) => ({
        url: '/upload/document',
        method: 'POST',
        body : body.formData,
      }),
    }),
  }),
})

export const {
  useUploadImageMutation,
  useUploadDocumentMutation
} = uploadApi
