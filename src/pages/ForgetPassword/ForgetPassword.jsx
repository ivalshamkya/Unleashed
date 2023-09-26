import { Button, Label, Spinner, TextInput, Toast } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { HiCheckCircle, HiXCircle, HiXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { forgotValidationSchema } from "../../store/slices/auth/validation";
import { forgotPassword } from "../../store/slices/auth/slices";
import { isFulfilled } from "@reduxjs/toolkit";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHideErrorToast = () => {
    setShowErrorToast(false);
  };

  const handleHideSuccessToast = () => {
    setShowSuccessToast(false);
  };

  const _showErrorToast = (msg) => {
    setErrMessage(msg);
    setShowErrorToast(true);
    setShowSuccessToast(false);
  };

  const _showSuccessToast = (msg) => {
    setErrMessage(msg);
    setShowErrorToast(false);
    setShowSuccessToast(true);
  };

  return (
    <div className="w-screen h-screen bg-slate-950 font-albra flex flex-col justify-center items-center">
      <div>
        <Link
          to="/auth/login"
          className="group w-10 h-10 rounded-full p-2 shadow bg-slate-50 bg-opacity-20 flex justify-center items-center mb-2 hover:animate-pulse"
        >
          <BsArrowLeft className="text-2xl text-slate-50 text-opacity-40 group-hover:text-opacity-100 " />
        </Link>
        <Formik
          validationSchema={forgotValidationSchema}
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => {
            setLoading(true);
            dispatch(forgotPassword(values))
              .then((res) => {
                if(isFulfilled(res)) {
                    setShowErrorToast(false);
                    _showSuccessToast('A reset password link has been sent to your email account');
                }
                else{
                    _showErrorToast(res.payload);
                }
              })
              .catch((err) => {
                console.log(err.response.data.message);
                _showErrorToast(err.response.data.message);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          <Form className="w-[450px] flex flex-col gap-4 px-7 py-7 bg-white rounded-md shadow-lg">
            <div className="mb-5">
              <h1 className="text-4xl text-blue-950 mb-2">Reset Password</h1>
              <h3 className="text-sm font-resolve">
                Enter the email address associated with your account and we`ll
                send you a link to reset your password.
              </h3>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <Field
                name="email"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    className="tracking-wider"
                    color="dark"
                    id="email"
                    placeholder="johoe.com@mail"
                    required
                    type="text"
                  />
                )}
              />
              <ErrorMessage
                name="email"
                component="span"
                className="text-sm text-red-600"
              />
            </div>
            <Button
              type="submit"
              color="dark"
              className="tracking-wide flex items-center"
              disabled={loading}
            >
              {loading ? (
                <span>
                  <Spinner color={"info"} className="w-5" /> Sending email...
                </span>
              ) : (
                "Continue"
              )}
            </Button>
          </Form>
        </Formik>
      </div>
      <div
        hidden={!showErrorToast}
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
            onClick={handleHideErrorToast}
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
            A reset password link has been sent to your email account
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
