import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const response = await api.jwtsignin(credentials);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error)
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData:''
  },
  reducers: {
    logout(state) {
      localStorage.clear()
      state.authData=""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('profile',JSON.stringify(action.payload));
        state.authData=action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
