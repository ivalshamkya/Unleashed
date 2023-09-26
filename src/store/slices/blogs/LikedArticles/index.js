import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { getLikedArticles } from "./slices"

const INITIAL_STATE = {
    likedArticles :[],
    currentPage : 1,
    isLoading : false,  
}

const likedSlice = createSlice({
    name : "liked",
    initialState : INITIAL_STATE,
    extraReducers : (builder) => {
    builder
      .addCase(getLikedArticles.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getLikedArticles.fulfilled, (state, action) => {
        console.log("-------------------")
        console.log(action.payload)
        state.isLoading = false;
        state.likedArticles = action.payload?.result;
        state.currentPage = action.payload?.blogPage;
      })
      .addCase(getLikedArticles.rejected, (state, action) => {
        state.isLoading = false;
      });
    }
})

export default likedSlice.reducer