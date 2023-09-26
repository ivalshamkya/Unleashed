import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

export const getArticles = createAsyncThunk(
  "blogs/getArticles",
  async (payload, { rejectWithValue }) => {
    try {
      const { id_cat, page, sort } = payload;

      const id = localStorage.getItem("id");

      const PARAMETER = `id_cat=${id_cat}&sort=${sort}&page=${page}`;

      const { data } = await api.get("/blog?" + encodeURI(PARAMETER));

      return data;
    } catch (error) {
      console.error(error);
      Toast.error(error.response.data.err);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const getArticlesById = createAsyncThunk(
  "blogs/getArticlesById",
  async (payload, { rejectWithValue }) => {
    try {
      const { id_cat, sort, BlogId } = payload;

      const id = localStorage.getItem("id");
      const PARAMETER = `id_cat=${id_cat}&sort=${sort}&size=1000&page=`;

      let blog = null;
      let currentPage = 1;

      while (!blog) {
        const { data } = await api.get(
          `/blog?${encodeURI(PARAMETER + currentPage)}`
        );

        for (let i = 0; i < data.result.length; i++) {
            if(parseInt(BlogId) == data.result[i].id) {
                blog = data.result[i];
                break;
            }
        }
        currentPage++;
      }

      if (!blog) {
        throw new Error("Blog not found");
      }

      return blog;
    } catch (error) {
      console.error(error);
      Toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getUserArticles = createAsyncThunk(
  "blogs/getUserArticles",
  async (payload, { rejectWithValue }) => {
    try {
      const { id_cat, page, sort } = payload;

      const id = localStorage.getItem("id");

      const PARAMETER = `id_cat=${id_cat}&sort=${sort}&page=${page}`;

      const { data } = await api.get("/blog/auth?" + encodeURI(PARAMETER));

      return data;
    } catch (error) {
      console.error(error);
      Toast.error(error.response.data.err);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const likeArticle = createAsyncThunk(
  "blogs/likeArticle",
  async (payload, { rejectWithValue }) => {
    try {
      await api.post("/blog/like", payload);
      console.log("Thankyou! You're Awesome");
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const unlikeArticle = createAsyncThunk(
  "blogs/unlikeArticle",
  async (payload, { rejectWithValue }) => {
    try {
      const id = localStorage.getItem("id");
      const { data } = await api.delete(`/blog/unlike/${id}`, payload);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const postBlog = createAsyncThunk(
  "blogs/postBlog",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/blog", payload);
      console.log("Success post an Article");
      return data;
    } catch (error) {
      console.error(error);
      Toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (payload, { rejectWithValue }) => {
    try {
      const id = payload.BlogId;
      console.log(id);
      const { data } = await api.patch("/blog/remove/" + id);
      console.log(data);
    } catch (error) {
      console.error(error);
      Toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
