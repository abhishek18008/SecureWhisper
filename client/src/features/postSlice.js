import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

export const getSecretmessages = createAsyncThunk(
  "messages/fetchmessages",
  async () => {
    try {
      const res = await api.fetchSecrets();
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching secret messages:", error);
      throw error; 
    }
  }
);

export const addPost = createAsyncThunk(
  'messages/addMessages',
  async (postData) => {
    try {
      const res = await api.createPost(postData);
      console.log(res);
      return res;
    } catch (error) {
      console.error('Error adding post:', error);
      throw error; 
    }
  }
);

export const postSlice = createSlice({
  name: "messages",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getSecretmessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSecretmessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getSecretmessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
      builder.addCase(addPost.fulfilled,(state,action)=>{
        state.posts.push(action.payload.data);
      })
  },
});

export default postSlice.reducer;
