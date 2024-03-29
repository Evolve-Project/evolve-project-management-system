import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { feedback_metrics } from "@/dummyData";
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

export const fetchFeedbackMetrics = createAsyncThunk(
    "feedbackMetric/fetchFeedbackMetrics",
    async () => {
      try {
        // const URL = "http://localhost:8000";
        const response = await api.get(`/api/feedback_metrics`);
        return response.data.metrics;
      } catch (err) {
        console.log("metric fetch err: ",err);
        const errorPayload = {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        };
        throw errorPayload;
      }
    }
);

export const addMetric = createAsyncThunk(
  "feedbackMetric/addMetric",
  async (newMetric, { getState, rejectWithValue }) => {
    try {
      const response = await api.post(`/api/add_metric`, newMetric);
      const id = response.data.newMetric.id;
      return { ...newMetric, id };
    } catch (err) {
      console.log("add metric err: ",err);
      const errorPayload = {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      };
      return rejectWithValue(errorPayload);
    }
  }
);

export const deleteMetric = createAsyncThunk(
  "feedbackMetric/deleteMetric",
  async ({id}, { getState, rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/delete_metric/${id}`);
      return id;
    } catch (err) {
      console.log("del metric err: ",err);
      const errorPayload = {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      };
      return rejectWithValue(errorPayload);
    }
  }
);

export const updateMetric = createAsyncThunk(
  "feedbackMetric/updateMetric",
  async (updatedMetric, { getState, rejectWithValue }) => {
    try {
      const response = await api.put(`/api/update_metric`, updatedMetric);
      return updatedMetric;
    } catch (err) {
      console.log("update metric err: ",err);
      const errorPayload = {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      };
      return rejectWithValue(errorPayload);
    }
  }
);

const initialState = {
    feedback_metrics : [],
    status : "idle",
    error : null,
}

const metricReducer = createSlice({
    name : "feedbackMetric",
    initialState,
    reducers: {
        // addMetric: async (state, action)=>{
        //     const newMetric = action.payload;
        //     try{
              
        //       const id = response.data.newMetric.id;
        //       state.feedback_metrics.push({...newMetric,id});
        //       state.status = "succeeded";
        //     }catch(err){
        //       state.status = "failed";
        //       state.error = err;
        //     }
        // },
        // deleteMetric: async (state, action)=>{
        //     const id = action.payload.id;
        //     try{
        //       const response = await axios.delete(`http://localhost:8000/api/delete_metric/${id}`);
        //       state.feedback_metrics = state.feedback_metrics.filter((metric)=> metric.id !== id)
        //       console.log(state.feedback_metrics);
        //       state.status = "succeeded";
        //     }catch(err){
        //       state.status = "failed";
        //       state.error = err;
        //     }
        // },
        // updateMetric: async (state, action)=>{
        //     const id = action.payload.id;
        //     const updatedMetric = action.payload;
        //     try{
        //       const response = await axios.put(`http://localhost:8000/api/update_metric`, updatedMetric);
        //       const index = state.feedback_metrics.findIndex(obj => obj.id === id);
        //       state.feedback_metrics[index].metric_name = action.payload.metric_name;
        //       console.log(state.feedback_metrics);
        //       state.status = "succeeded";
        //     }catch(err){
        //       state.status = "failed";
        //       state.error = err;
        //     }
        // }
    },
    extraReducers: (builder) => {
        builder
          //  INITIAL FETCHING DATA
          .addCase(fetchFeedbackMetrics.pending, (state) => {
            state.status = "Initial-loading";
          })
          .addCase(fetchFeedbackMetrics.fulfilled, (state, action) => {
            state.status = "Initail-succeeded";
            state.feedback_metrics = action.payload;
          })
          .addCase(fetchFeedbackMetrics.rejected, (state, action) => {
            state.status = "Initail-failed";
            state.error = action.error.message;
          })

          // ADDING NEW METRIC
          .addCase(addMetric.pending, (state)=>{
            state.status = "loading";
          })
          .addCase(addMetric.fulfilled, (state, action)=>{
            state.status = "succeeded";
            // console.log("added: ", action.payload);
            state.feedback_metrics.push(action.payload);
          })
          .addCase(addMetric.rejected, (state, action)=>{
            state.status = "failed";
            console.log(action.payload);
            // console.log("----------------------------------------------------");
            if(action.payload.status === 409)
            {
              state.statusCode = 409;
              state.message = action.payload?.data?.message;
              // console.log("hi");
            }else{
              state.error = action.payload?.data?.message;
            }
          })

          // DELETING METRIC
          .addCase(deleteMetric.pending, (state)=>{
            state.status = "loading";
          })
          .addCase(deleteMetric.fulfilled, (state, action)=>{
            state.status = "succeeded";
            const id = action.payload;
            // console.log("del id: ",id);
            state.feedback_metrics = state.feedback_metrics.filter((metric)=> metric.id !== id)
          })
          .addCase(deleteMetric.rejected, (state, action)=>{
            state.status = "failed";
            state.error = action.payload?.data?.message;
          })

          // UPDATING METRIC
          .addCase(updateMetric.pending, (state)=>{
            state.status = "loading";
          })
          .addCase(updateMetric.fulfilled, (state, action)=>{
            console.log(action.payload);  // return means its coming here not going to rejected
            state.status = "succeeded";
            // console.log("update : ",action.payload);
            const {id, metric_name} = action.payload;
            const index = state.feedback_metrics.findIndex(obj => obj.id === id);
            state.feedback_metrics[index].metric_name = metric_name;
          })
          .addCase(updateMetric.rejected, (state, action)=>{
            state.status = "failed";
            console.log(action.payload);
            // console.log("----------------------------------------------------");
            if(action.payload.status === 409)
            {
              state.statusCode = 409;
              state.message = action.payload?.data?.message;
              // console.log("hi");
            }else{
              state.error = action.payload?.data?.message;
            }
          })
    },
});

// export const {addMetric, deleteMetric, updateMetric} = metricReducer.actions;
export default metricReducer.reducer;
