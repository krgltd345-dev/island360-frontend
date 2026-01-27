import { baseApi } from '@/baseQuery'
import { configureStore } from '@reduxjs/toolkit'
import globalReducer from '@/services/globalSlice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    global: globalReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(baseApi.middleware),
})
