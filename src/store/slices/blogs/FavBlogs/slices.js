import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api.instance";

export const getFavBlogs = createAsyncThunk(
    "blogs/getFavBlogs",
    async (payload, { rejectWithValue }) => {
        try {
            let res = null;
            if(payload) {
                const { sort, id_cat, size } = payload;
                res = await api.get(`/blog/pagFav?page=1&orderBy=total_fav&sort=DESC&id_cat=${id_cat}&search=&size=${size ? size : 10}`)
            }
            else{
                res = await api.get("/blog/pagFav?page=1&orderBy=total_fav&sort=DESC&id_cat=&search=&size=10")    
            }
            
            const { data } = res;

            return data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)