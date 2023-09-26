import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api.instance";
import Toast from "react-hot-toast";

export const getCategories = createAsyncThunk(
    "category/getCategories",
    async(payload,{rejectWithValue})=>{
        try{
            const {data} = await api.get("/blog/allCategory")

            return data
        }catch(error){
            console.error(error)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)