import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { deleteBlog, getArticles, likeArticle, postBlog, unlikeArticle, getUserArticles, getArticlesById } from "./slices";

const INITIAL_STATE = {
  articles: [],
  allArticles: [],
  filteredArticles: [],
  totalPage: 1,
  currentPage: 1,
  isLoading: false,
  isChangePage: false,
  isUploaded: false,
  isDeleted: false,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload?.result;
        state.totalPage = action.payload?.page;
        state.currentPage = action.payload?.blogPage;
        state.allArticles = action.payload?.response;
        state.filteredArticles = action.payload?.outputFilter;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getUserArticles.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload?.result;
        state.totalPage = action.payload?.page;
        state.currentPage = action.payload?.blogPage;
        state.allArticles = action.payload?.response;
        state.filteredArticles = action.payload?.outputFilter;
      })
      .addCase(getUserArticles.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getArticlesById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getArticlesById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload;
      })
      .addCase(getArticlesById.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(likeArticle.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(likeArticle.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(likeArticle.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(unlikeArticle.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(unlikeArticle.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(unlikeArticle.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(postBlog.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(postBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUploaded = true;
      })
      .addCase(postBlog.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteBlog.pending, (state, action) => {
        state.isDeleted = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isDeleted = true;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isDeleted = false;
      });
  },
});

export default blogsSlice.reducer;
