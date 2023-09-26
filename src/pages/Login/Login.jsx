import {
  Button,
  Label,
  Spinner,
  TextInput,
  Toast,
  Tooltip,
} from "flowbite-react";
import {
  BsArrowLeft,
  BsEye,
  BsEyeSlash,
  BsFillInfoCircleFill,
  BsInfoCircle,
} from "react-icons/bs";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { HiXCircle, HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/auth/slices";
import { loginValidationSchema } from "../../store/slices/auth/validation";
import { isFulfilled } from "@reduxjs/toolkit";

export default function Login() {
  const [errMessage, setErrMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, loading } = useSelector(state => {
    return {
      id: state.auth.id,
      loading : state.auth.isLoginLoading,
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleHideToast = () => {
    setShowToast(false);
  };

  const showErrorToast = (msg) => {
    setErrMessage(msg);
    setShowToast(true);
  };

  return (
    <div className="w-screen h-screen bg-slate-950 font-albra flex flex-col justify-center items-center">
      <div>
        <Link
          to="/"
          className="group w-10 h-10 rounded-full p-2 shadow bg-slate-50 bg-opacity-20 flex justify-center items-center mb-2 hover:animate-pulse"
        >
          <BsArrowLeft className="text-2xl text-slate-50 text-opacity-40 group-hover:text-opacity-100 " />
        </Link>
        <Formik
          initialValues={{
            text: "",
            password: "",
          }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => {
            const { text, password } = values;
            const input = text;
            const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            const phone_pattern = /0[0-9]/;
            let username = "";
            let email = "";
            let phone = "";

            email_pattern.test(input)
              ? (email = input)
              : phone_pattern.test(input)
              ? (phone = input)
              : (username = input);

            dispatch(login({ username, email, phone, password }))
            .then((res) => {
              if(isFulfilled(res)) {
                setShowToast(false);
                navigate('/')
              }
              else{
                showErrorToast(res.payload);  
              }
            })
            .catch((err) => {
              console.log(err.response.data.message);
              showErrorToast(err.response.data.message);
            })
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="w-[450px] flex flex-col gap-4 px-7 py-7 bg-white rounded-md shadow-lg">
              <div className="mb-7">
                <h1 className="text-4xl text-blue-950 mb-2">Welcome Back</h1>
                <h3 className="text-sm font-resolve">Sign in to continue</h3>
              </div>
              <div>
                <div className="mb-2 flex space-x-2 items-center">
                  <Label htmlFor="text" value="Your email" />
                  <Tooltip
                    content="You can also use your username or phone number"
                    placement="right"
                    style="dark"
                  >
                    <BsFillInfoCircleFill className="hover:text-red-600"></BsFillInfoCircleFill>
                  </Tooltip>
                </div>
                <Field name="text">
                  {({ field }) => (
                    <TextInput
                      {...field}
                      className="tracking-wider"
                      color="dark"
                      placeholder="johoe.com@mail"
                      id="text"
                      type="text"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="email"
                  component="span"
                  className="text-sm text-red-600"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                <Field name="password">
                  {({ field }) => (
                    <div className="relative">
                    <TextInput
                      {...field}
                      className="tracking-wider"
                      color="dark"
                      placeholder="*********"
                      id="password"
                      type={!showPassword ? "password" : "text"}
                      rightIcon={!showPassword ? BsEyeSlash : BsEye}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute top-1/2 right-3 text-xl transform -translate-y-1/2 outline-none focus:outline-none"
                    >
                      {!showPassword ? <BsEyeSlash /> : <BsEye />}
                    </button>
                  </div>
                  )}
                </Field>
                <ErrorMessage
                  name="password"
                  component="span"
                  className="text-sm text-red-600"
                />
              </div>
              <div className="flex items-center justify-end mb-2">
                <a
                  href="/auth/forget-password"
                  className="text-sm text-slate-700 underline"
                >
                  Forget Password?
                </a>
              </div>
              <Button
                type="submit"
                color="dark"
                className="flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <span>
                    <Spinner color={"info"} className="w-5" /> Loggin In...
                  </span>
                ) : (
                  "Log In"
                )}
              </Button>
              <span className="text-sm text-center mb-5">
                Don`t have an account yet?
                <a href="/auth/signup" className="ml-0.5 text-blue-700">
                  Sign Up
                </a>
              </span>
            </Form>
          )}
        </Formik>
      </div>
      <div
        hidden={!showToast}
        className="fixed top-5 right-5 md:bottom-5 md:top-auto"
      >
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-200 text-red-600 dark:bg-red-800 dark:text-red-200">
            <HiXCircle className="h-5 w-5" />
          </div>
          <div className="mx-3 text-sm text-slate-950 font-normal inline-flex items-center justify-center">
            {errMessage}
          </div>
          <button
            onClick={handleHideToast}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-gray-300 hover:text-slate-900"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </Toast>
      </div>
    </div>
  );
}
