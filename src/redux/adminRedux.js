
import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    currentUser: null,
    isFetching: false,
    isSending: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
    state.currentUser=null;
    state.isFetching=false;
    state.isSending=false;
    state.error=false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  logout,
} = adminSlice.actions;
export default adminSlice.reducer;
