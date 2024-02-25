import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const mentorReducer = createReducer(initialState, (builder) => {
  builder
    //----------------------------------------------
    .addCase("GetMentorDetailsRequest", (state) => {
      state.loading = true;
    })
    .addCase("GetMentorDetailsSuccess", (state, action) => {
      state.loading = false;
      state.mentor = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("GetMentorDetailsFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    //----------------------------------------------
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
export const messageReducer = createReducer(initialState, (builder) => {
  builder
    //----------------------------------------------
    .addCase("createProjectRequest", (state) => {
      state.loading = true;
    })
    .addCase("createProjectSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("createProjectFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    //----------------------------------------------
    .addCase("clearMessage", (state, action) => {
      state.message = null;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});