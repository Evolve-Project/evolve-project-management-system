import { createSlice } from '@reduxjs/toolkit'

const userAuthFromLocalStorage = () => {
  const authData = localStorage.getItem('authData')

  if (authData) {
    const { isAuth, role } = JSON.parse(authData)
    return { isAuth, role }
  }
  return { isAuth: false, role: null }
}

const initialState = {
  isAuth: userAuthFromLocalStorage().isAuth,
  role: userAuthFromLocalStorage().role,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuth = true
      state.role = action.payload.role
    },
    unauthenticateUser: (state) => {
      state.isAuth = false
      state.role = null
    },
  },
})

export const { authenticateUser, unauthenticateUser } = authSlice.actions

export default authSlice.reducer