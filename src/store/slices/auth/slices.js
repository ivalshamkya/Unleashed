import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance"
// import Toast from "react-hot-toast";

export const login = createAsyncThunk(
    "auth/login",
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.post("/auth/login", payload)
            console.log(data)
            localStorage.setItem("token", data?.token)
            localStorage.setItem("id", data?.isAccountExist?.id)
            return data?.isAccountExist
        } catch (error) {
            console.log(error.response.data.err)
            return rejectWithValue(error.response.data.err)
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async (payload, { rejectWithValue }) => {
        try {
            localStorage.removeItem("token")
            localStorage.removeItem("id")
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error)
        }
    }
)

export const keepLogin = createAsyncThunk(
    "auth/keepLogin",
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.get("/auth")
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.post("/auth/", payload)
            return data?.data
        } catch (error) {
            console.log(error.response.data.message)
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const verification = createAsyncThunk(
    "auth/verification",
    async (payload, { rejectWithValue }) => {
        try {
            localStorage.setItem("token", payload)
            const {data} = await api.patch("/auth/verify")
            console.log(data.message)
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.reponse.data.message)
        }
    }
)

export const forgotPassword = createAsyncThunk(
    "auth/forgot",
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.put("/auth/forgotPass",payload)
            localStorage.setItem("token",data.data)
            console.log(data)
        } catch (error) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const reset_password = createAsyncThunk(
    "auth/reset_password",
    async (payload, { rejectWithValue }) => {
        try {
            
            localStorage.setItem("token",payload.token)
            const response= await api.patch("/auth/resetPass",payload.data)
            console.log(response?.data?.message) 
        } catch (error) {
            console.log(error?.response?.data?.err)
            return rejectWithValue(error?.response?.data?.err)
        }
    }
)


export const changeUsername = createAsyncThunk(
    "auth/changeUsername",
    async (payload, { rejectWithValue }) => {
        try {
            const {data} = await api.patch("/auth/changeUsername",payload)
            console.log(data)
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            return data
        } catch (error) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data.err)
        }
    }
)

export const changeEmail = createAsyncThunk(
    "auth/changeEmail",
    async (payload, { rejectWithValue }) => {
        try {            
            const {data} = await api.patch("auth/changeEmail",payload)
            console.log(data)
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            return data
        } catch (error) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data.err)
        }
    }
)

export const changePhone = createAsyncThunk(
    "auth/changePhone",
    async (payload, { rejectWithValue }) => {
        try {            
            const {data} = await api.patch("auth/changePhone",payload)
            console.log(data)
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            return data
        } catch (error) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data.err)
        }
    }
)

export const changePass = createAsyncThunk(
    "auth/changePass",
    async (payload, { rejectWithValue }) => {
        try {            
            const {data} = await api.patch("auth/changePass",payload)
            console.log(data) 
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            return data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error.response.data)
        }
    }
)

export const uploadProfilePic = createAsyncThunk(
    "auth/uploadProfilePic",
    async (payload, { rejectWithValue }) => {
        try {            
            const {data} = await api.post("/profile/single-uploaded",payload)
            console.log("Image Changed Success") 
            console.log(data)
            return data
        } catch (error) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)