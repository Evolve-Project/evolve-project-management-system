import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { feedback_metrics } from "@/dummyData";

export const fetchFeedbackMetrics = createAsyncThunk(
    "feedbackMetric/fetchFeedbackMetrics",
    async () => {
      try {
        const URL = "http://localhost:8000";
        const response = await axios.get(`${URL}/api/feedback_metrics`);
        return response.data.metrics;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
);

const initialState = {
    feedback_metrics : [],
    // lastIndex : feedback_metrics.length,
    // lastIndex : 0,
    status : "idle",
    error : null,
}

const metricReducer = createSlice({
    name : "feedbackMetric",
    initialState,
    reducers: {
        addMetric: (state, action)=>{
            // state.lastIndex += 1;
            state.feedback_metrics.push({...action.payload});//,id: state.lastIndex});
        },
        deleteMetric: (state, action)=>{
            state.feedback_metrics = state.feedback_metrics.filter((metric)=> metric.id !== action.payload.id)
            console.log(state.feedback_metrics);
        },
        updateMetric: (state, action)=>{
            const index = state.feedback_metrics.findIndex(obj => obj.id === action.payload.id);
            state.feedback_metrics[index].metric_name = action.payload.name;
            console.log(state.feedback_metrics);
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchFeedbackMetrics.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchFeedbackMetrics.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.feedback_metrics = action.payload;
            // state.lastIndex = action.payload.length;
          })
          .addCase(fetchFeedbackMetrics.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          });
    },
});

export const {addMetric, deleteMetric, updateMetric} = metricReducer.actions;
export default metricReducer.reducer;
