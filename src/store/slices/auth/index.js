import { createSlice } from "@reduxjs/toolkit";

import {
  login,
  logout,
  keepLogin,
  register,
  verification,
  forgotPassword,
  reset_password,
  changeUsername,
  changePhone,
  changeEmail,
  changePass,
  uploadProfilePic,
} from "./slices";

const INITIAL_STATE = {
  email: "",
  phone: "",
  username: "",
  imgProfile: null,
  isVerified: false,
  isLogin: false,
  isResetPasswordLoading: false,
  isRegisterLoading: false,
  isLoginLoading: false,
  isKeepLoginLoading: false,
  isForgotLoading: false,
  isUpdateProfilePicLoading: false,
  isUpdateProfileDetails: false,
  isLogoutLoading: false,
};

// @create slice
const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { id, username, email, phone, imgProfile, isVerified } =
          action.payload;
        state.id = id;
        state.username = username;
        state.email = email;
        state.phone = phone;
        state.imgProfile = imgProfile;
        state.isVerified = isVerified;
        state.isLogin = true;
        state.isLoginLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoginLoading = false;
        state.isLogin = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLogoutLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        Object.assign(state, INITIAL_STATE);
      })
      .addCase(logout.rejected, (state) => {
        state.isLogoutLoading = false;
      })
      .addCase(keepLogin.pending, (state) => {
        state.isKeepLoginLoading = true;
      })
      .addCase(keepLogin.fulfilled, (state, action) => {
        const { id, username, email, phone, password, imgProfile, isVerified } =
          action.payload;
        state.id = id;
        state.username = username;
        state.email = email;
        state.phone = phone;
        state.password = password;
        state.imgProfile = imgProfile;
        state.isVerified = isVerified;
        state.isLogin = true;
        state.isKeepLoginLoading = false;
      })
      .addCase(keepLogin.rejected, (state) => {
        state.isKeepLoginLoading = false;
        state.isLogin = false;
      })
      .addCase(register.pending, (state) => {
        state.isRegisterLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { id, username, email, phone } = action.payload;
        state.id = id;
        state.username = username;
        state.email = email;
        state.phone = phone;
        state.isVerified = false;
        state.isKeepLoginLoading = false;
        state.isRegisterLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isRegisterLoading = false;
        state.isLogin = false;
      })
      .addCase(verification.pending, (state) => {
        state.isRegisterLoading = true;
      })
      .addCase(verification.fulfilled, (state) => {
        state.isRegisterLoading = false;
        state.isVerified = true;
        state.isLogin = false;
      })
      .addCase(verification.rejected, (state) => {
        state.isRegisterLoading = false;
        state.isVerified = false;
        state.isLogin = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isForgotLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isForgotLoading = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.isForgotLoading = false;
      })
      .addCase(reset_password.pending, (state) => {
        state.isResetPasswordLoading = true;
      })
      .addCase(reset_password.fulfilled, (state) => {
        state.isResetPasswordLoading = false;
      })
      .addCase(reset_password.rejected, (state) => {
        state.isResetPasswordLoading = false;
      })
      .addCase(changeUsername.pending, (state) => {
        state.isUpdateProfileDetails = true;
      })
      .addCase(changeUsername.fulfilled, (state) => {
        state.isUpdateProfileDetails = false;
      })
      .addCase(changeUsername.rejected, (state) => {
        state.isUpdateProfileDetails = false;
      })
      .addCase(changeEmail.pending, (state) => {
        state.isUpdateProfileDetails = true;
      })
      .addCase(changeEmail.fulfilled, (state) => {
        state.isUpdateProfileDetails = false;
      })
      .addCase(changeEmail.rejected, (state) => {
        state.isUpdateProfileDetails = false;
      })
      .addCase(changePhone.pending, (state) => {
        state.isUpdateProfileDetails = true;
      })
      .addCase(changePhone.fulfilled, (state) => {
        state.isUpdateProfileDetails = false;
      })
      .addCase(changePhone.rejected, (state) => {
        state.isUpdateProfileDetails = false;
      })
      .addCase(changePass.pending, (state) => {
        state.isResetPassword = false;
      })
      .addCase(changePass.fulfilled, (state) => {
        state.id = "";
        state.username = "";
        state.email = "";
        state.phone = "";
        state.password = "";
        state.imgProfile = "";
        state.isResetPassword = true;
        state.isLogin = false;
      })
      .addCase(changePass.rejected, (state) => {
        state.isResetPassword = false;
      })
      .addCase(uploadProfilePic.pending, (state) => {
        state.isUpdateProfilePicLoading = true;
        state.imgProfile = null;
      })
      .addCase(uploadProfilePic.fulfilled, (state, action) => {
        state.isUpdateProfilePicLoading = false;
        state.imgProfile = action.payload.imgProfile;
      })
      .addCase(uploadProfilePic.rejected, (state) => {
        state.isUpdateProfilePicLoading = false;
      });
  },
});

// export reducer
export default authSlice.reducer;
