import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { getCategories } from "./slices"

const INITIAL_STATE = {
    categories :[],
    isLoading : false
}

const categorySlice = createSlice({
    name: "category",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCategories.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(getCategories.fulfilled, (state, action) => {
          state.isLoading = false;
          state.categories = action.payload;
        })
        .addCase(getCategories.rejected, (state, action) => {
          state.isLoading = false;
        });
    },
  });

export default categorySlice.reducer