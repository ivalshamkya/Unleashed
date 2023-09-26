import { Button, Label, Spinner, TextInput, Toast } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { BsArrowLeft, BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerValidationSchema } from "../../store/slices/auth/validation";
import { register } from "../../store/slices/auth/slices";
import { HiCheckCircle, HiXCircle, HiXMark } from "react-icons/hi2";
import { isFulfilled } from "@reduxjs/toolkit";

export default function SignUp() {
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValuesSignUp = {
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  };

  const { isRegisterLoading } = useSelector((state) => {
    return {
      id: state.auth.id,
      isRegisterLoading: state.auth.isRegisterLoading,
    };
  });

  const id = localStorage.getItem("id");
  if (id) {
    return navigate("/");
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleHideSuccessToast = () => {
    setShowSuccessToast(false);
  };

  const handleHideToast = () => {
    setShowToast(false);
  };

  const showSuccesToast = (msg) => {
    setSuccessMessage(msg);
    setShowToast(false);
    setShowSuccessToast(true);
  };

  const showErrorToast = (msg) => {
    setErrMessage(msg);
    setShowSuccessToast(false);
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
          initialValues={initialValuesSignUp}
          validationSchema={registerValidationSchema}
          onSubmit={(values, { resetForm }) => {
            const { username, email, phone, password, confirmpassword } =
              values;
            dispatch(
              register({
                username: username,
                email: email,
                phone: phone,
                password: password,
                confirmPassword: confirmpassword,
              })
            )
              .then((res) => {
                if (isFulfilled(res)) {
                  setShowToast(false);
                  showSuccesToast('A verification link has been sent to your email account.')
                  resetForm();
                } else {
                  showErrorToast(res.payload);
                }
                // navigate("/dashboard");
              })
              .catch((err) => {
                console.log(err.response.data.message);
                showErrorToast(err.response.data.message);
              });
          }}
        >
          {() => {
            return (
              <Form className="w-[450px] flex flex-col gap-4 px-7 py-7 bg-white rounded-md shadow-lg">
                <div className="mb-5">
                  <h1 className="text-4xl text-blue-950 mb-2">
                    Create Account
                  </h1>
                  <h3 className="text-sm font-resolve">Create a new account</h3>
                </div>
                <div>
                  <div className="mb-2 flex space-x-2 items-center">
                    <Label htmlFor="email" value="Email" />
                  </div>
                  <Field name="email">
                    {({ field }) => (
                      <TextInput
                        {...field}
                        className="tracking-wider"
                        color="dark"
                        placeholder="johndoe@mail.com"
                        id="email"
                        type="email"
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
                  <div className="mb-2 flex space-x-2 items-center">
                    <Label htmlFor="username" value="Username" />
                  </div>
                  <Field name="username">
                    {({ field }) => (
                      <TextInput
                        {...field}
                        className="tracking-wider"
                        color="dark"
                        placeholder="johndoe"
                        id="username"
                        type="text"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="username"
                    component="span"
                    className="text-sm text-red-600"
                  />
                </div>
                <div>
                  <div className="mb-2 flex space-x-2 items-center">
                    <Label htmlFor="phone" value="Phone Number" />
                  </div>
                  <Field name="phone">
                    {({ field }) => (
                      <TextInput
                        {...field}
                        className="tracking-wider"
                        color="dark"
                        placeholder="Phone Number"
                        id="phone"
                        type="text"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="phone"
                    component="span"
                    className="text-sm text-red-600"
                  />
                </div>
                <div>
                  <div className="mb-2 flex space-x-2 items-center">
                    <Label htmlFor="password" value="Password" />
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
                <div>
                  <div className="mb-2 flex space-x-2 items-center">
                    <Label htmlFor="confirmpassword" value="Confirm Password" />
                  </div>
                  <Field name="confirmpassword">
                    {({ field }) => (
                      <div className="relative">
                        <TextInput
                          {...field}
                          className="tracking-wider"
                          color="dark"
                          placeholder="*********"
                          id="confirmpassword"
                          type={!showConfirmPassword ? "password" : "text"}
                          rightIcon={!showConfirmPassword ? BsEyeSlash : BsEye}
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
                          className="absolute top-1/2 right-3 text-xl transform -translate-y-1/2 outline-none focus:outline-none"
                        >
                          {!showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                        </button>
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="confirmpassword"
                    component="span"
                    className="text-sm text-red-600"
                  />
                </div>

                <Button
                  type="submit"
                  color="dark"
                  className="my-1"
                  disabled={isRegisterLoading}
                >
                  {isRegisterLoading ? <Spinner color={"info"} /> : "Continue"}
                </Button>
                <span className="text-sm text-center mb-5">
                  Already have an account?
                  <a href="/auth/login" className="ml-0.5 text-blue-700">
                    Log In
                  </a>
                </span>
              </Form>
            );
          }}
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
      <div
        hidden={!showSuccessToast}
        className="fixed top-5 right-5 md:bottom-5 md:top-auto"
      >
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-200 text-emerald-600 dark:bg-emerald-800 dark:text-emerald-200">
            <HiCheckCircle className="h-5 w-5" />
          </div>
          <div className="mx-3 text-sm text-slate-950 font-normal inline-flex items-center justify-center">
            {successMessage}
          </div>
          <button
            onClick={handleHideSuccessToast}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-gray-300 hover:text-slate-900"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </Toast>
      </div>
    </div>
  );
}
