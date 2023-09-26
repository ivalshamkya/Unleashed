import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
    LandingPage,
    ResetPassword,
    Login,
    SignUp,
    ForgetPassword,
    NotFound,
    VerifyAccount,
    MyBlog,
    CreateBlog,
} from "./pages";
import { keepLogin } from "./store/slices/auth/slices";
import ProtectedRoute from "./ProtectedRoute";
import { Profile } from "./pages/Profile";
import { isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
import { BlogDetail } from "./pages/Blog";

export default function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
      dispatch(keepLogin()).then((result) => {
        if(isRejectedWithValue(result)) {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
        }
      }).catch((err) => {
        console.log(err)
      });
    }, []);

    return (
        <>
          <main>
            <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/forget-password" element={<ForgetPassword />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route
                path="/verification/:token"
                element={<VerifyAccount />}
            />
            <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
            />
            <Route
                path="/blog/:id"
                element={<BlogDetail />}
            />
            <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
            />
            <Route
                path="/myblog"
                element={
                  <ProtectedRoute>
                    <MyBlog />
                  </ProtectedRoute>
                }
            />
            <Route
                path="/post-blog"
                element={
                  <ProtectedRoute>
                    <CreateBlog />
                  </ProtectedRoute>
                }
            />
            </Routes>
          </main>
        </>
      );
    }