import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/redux/slices/authslice'
import { mentorReducer, messageReducer } from './Reducers/User'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        mentor: mentorReducer,
        message: messageReducer,
    },
})