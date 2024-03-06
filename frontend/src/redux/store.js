import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/redux/slices/authslice'
import { mentorReducer, messageReducer, menteeReducer } from './Reducers/User'
import feedbackMetricSlice from './slices/feedbackMetricSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        mentor: mentorReducer,
        mentee: menteeReducer,
        message: messageReducer,
        feedbackMetric: feedbackMetricSlice,
    },
})