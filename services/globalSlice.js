import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
}

const globalSlice = createSlice({
  name: 'globalSlice',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
  },
})

export const { setIsLogin } = globalSlice.actions
export default globalSlice.reducer

