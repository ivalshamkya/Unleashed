import { Button, Label, Spinner, TextInput, Toast } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiXCircle, HiXMark } from "react-icons/hi2";
import { resetPasswordValidationSchema } from "../../utils/validation/auth";
import { reset_password } from "../../store/slices/auth/slices";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleHideToast = () => {
    setShowToast(false);
  };

  const { token } = useParams();

  const showErrorToast = (msg) => {
    setErrMessage(msg);
    setShowToast(true);
  };

  return (
    <div className="w-screen h-screen bg-slate-950 font-albra flex flex-col justify-center items-center">
      <div>
        <Formik
          validationSchema={resetPasswordValidationSchema}
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            setLoading(true);
            reset_password(values)
              .then((res) => {
                setShowToast(false);
                console.log(res);
              })
              .catch((err) => {
                console.log(err.response.data.message);
                showErrorToast(err.response.data.message);
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
                Set your new password
              </h3>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your new password" />
              </div>
              <Field name="password">
                {({ field }) => (
                  <TextInput
                    {...field}
                    color="dark"
                    id="password"
                    placeholder="*********"
                    type="password"
                  />
                )}
              </Field>
              <ErrorMessage
                name="password"
                component="span"
                className="text-sm text-red-600"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="confirmpassword" value="Confirm password" />
              </div>
              <Field name="confirmPassword">
                {({ field }) => (
                  <TextInput
                    {...field}
                    color="dark"
                    id="confirmpassword"
                    placeholder="*********"
                    type="password"
                  />
                )}
              </Field>
              <ErrorMessage
                name="confirmPassword"
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
