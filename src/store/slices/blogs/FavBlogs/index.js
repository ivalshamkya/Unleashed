import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { getFavBlogs } from "./slices";

const INITIAL_STATE = {
  favorites: [],
  isLoading: false,
  filtered: [],
  top: [],
};

const FavBlogsSlice = createSlice({
  name: "favorites",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavBlogs.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFavBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload?.result;
        state.filtered = action.payload?.responseFiltered?.result;
        state.top = action.payload?.outputFilterFavBlogs;
      })
      .addCase(getFavBlogs.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default FavBlogsSlice.reducer;
