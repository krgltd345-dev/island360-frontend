import { baseApi } from '@/baseQuery'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(baseApi.middleware),
})
