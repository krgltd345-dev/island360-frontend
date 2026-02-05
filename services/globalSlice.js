import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  signUp: "signin"
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setSignUp: (state, action) => {
      state.signUp = action.payload
    },
  },
})

export const { setIsLogin, setSignUp } = globalSlice.actions
export default globalSlice.reducer

