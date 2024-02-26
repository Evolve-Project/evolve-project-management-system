import { createSlice } from "@reduxjs/toolkit";
import { feedback_metrics } from "@/dummyData";

const initialState = {
    feedback_metrics : feedback_metrics,
    lastIndex : feedback_metrics.length
}

const metricReducer = createSlice({
    name : "Feedback Metric Reducer",
    initialState,
    reducers: {
        addMetric: (state, action)=>{
            state.lastIndex += 1;
            state.feedback_metrics.push({...action.payload,id: state.lastIndex});
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
    }
});

export const {addMetric, deleteMetric, updateMetric} = metricReducer.actions;
export default metricReducer.reducer;
