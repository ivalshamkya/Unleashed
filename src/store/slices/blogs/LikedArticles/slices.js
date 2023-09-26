import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api.instance";
import Toast from "react-hot-toast";

export const getLikedArticles = createAsyncThunk(
    "blogs/getLikedArticles",
    async (payload, { rejectWithValue }) => {
        try {
            const { page, listLimit } = payload

            const PARAMETER = `?page=${page}&listLimit=${listLimit}`;

            console.log(PARAMETER)

            const { data } = await api.get("/blog/pagLike" + encodeURI(PARAMETER))
            console.log(data);
            return data    
            
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error.response.data.err)
        }
    }
)