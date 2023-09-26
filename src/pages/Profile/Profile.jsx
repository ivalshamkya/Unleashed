import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeEmail,
  changePass,
  changePhone,
  changeUsername,
  keepLogin,
  uploadProfilePic,
} from "../../store/slices/auth/slices";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  changePasswordSchema,
  editProfileSchema,
} from "../../store/slices/auth/validation";
import { useDropzone } from "react-dropzone";
import {
  Avatar,
  Button,
  Label,
  Modal,
  Spinner,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { Navbar } from "../../components";
import { BsFileEarmarkImage, BsFillInfoCircleFill } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";
import { isFulfilled } from "@reduxjs/toolkit";

export default function Profile() {
  const [file, setFile] = useState(null);
  const [isEditing, setEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState("");
  const props = { openModal, setOpenModal };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, email, phone, imgProfile } = useSelector((state) => {
    return {
      username: state.auth.username,
      phone: state.auth.phone,
      email: state.auth.email,
      imgProfile: state.auth.imgProfile,
    };
  });

  const doEditProfile = () => {
    setEditing(true);
  };

  const showProfileModal = () => {
    isEditing ? window.modalUploadImageProfile.showModal() : null;
  };

  const onDrop = (acceptedFiles, FileRejection) => {
    FileRejection.length === 0
      ? setFile(acceptedFiles[0])
      : setFile(FileRejection[0].errors[0]);
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { "image/*": [".jpg", ".jpeg", ".webp", ".png"] },
    maxSize: 1000000,
    noClick: true,
    noKeyboard: true,
  });

  const formData = new FormData();

  const onButtonSave = () => {
    formData.append("file", file);
    window.modalUploadImageProfile.close();
  };

  const onButtonCancelUpload = () => {
    setFile([]);
  };

  return (
    <>
      <Formik
        initialValues={{ username: "", email: "", phone: "" }}
        validationSchema={editProfileSchema}
        onSubmit={(values, { resetForm }) => {
          setLoading(true);
          const newUsername = values.username;
          const newEmail = values.email;
          const newPhone = values.phone;
          const dispatchPromises = [];

          if (newUsername !== username && newUsername !== "") {
            dispatchPromises.push(
              dispatch(
                changeUsername({
                  currentUsername: username,
                  newUsername: newUsername,
                })
              )
            );
          }
          if (newEmail !== email && newEmail !== "") {
            dispatchPromises.push(
              dispatch(
                changeEmail({
                  currentEmail: email,
                  newEmail: newEmail,
                })
              )
            );
          }
          if (newPhone !== phone && newPhone !== "") {
            dispatchPromises.push(
              dispatch(
                changePhone({
                  currentPhone: phone,
                  newPhone: newPhone,
                })
              )
            );
          }
          if (file?.name) {
            dispatchPromises.push(dispatch(uploadProfilePic(formData)));
          }
          if (dispatchPromises.length > 0) {
            Promise.all(dispatchPromises)
              .then(() => {
                resetForm();
                onButtonCancelUpload();
                setLoading(false);
                setEditing(false);
                localStorage.removeItem('token');
                localStorage.removeItem('id');
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {
                navigate("/", "replace");
              });
          } else {
            resetForm();
            setEditing(false);
            setLoading(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting, resetForm }) => (
          <div>
            <Navbar />
            <div className="w-screen p-5 lg:p-10">
              <div className="relative mb-16">
                <div className="w-full h-40 lg:h-72 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-fuchsia-950 rounded-tl-[4rem] lg:rounded-tl-[7rem] rounded-b-md rounded-tr-md"></div>
                <div
                  onClick={showProfileModal}
                  className="absolute top-[7.5rem] lg:top-56 left-7 w-28 h-28 lg:w-48 lg:h-48 rounded-full border-2 lg:border-4 border-slate-50 overflow-hidden shadow-md"
                >
                  <img
                    className="h-full w-full object-cover"
                    src={
                      imgProfile
                        ? import.meta.env.VITE_APP_API_PROFILE_IMAGE_URL +
                          imgProfile
                        : "/img/profile-dummy.png"
                    }
                    alt="Rounded avatar"
                  ></img>
                </div>
                <div className="flex items-center justify-between ml-40 lg:ml-64">
                  <div>
                    <h1 className="my-1 lg:my-3 text-2xl lg:text-4xl text-slate-900 font-semibold">
                      Profile
                    </h1>
                    <h1 className="my-1 lg:my-3 text-xs lg:text-lg text-slate-700 font-medium">
                      Update your photo and personal details.
                    </h1>
                  </div>
                  {!isEditing ? (
                    <div className="mt-5 flex space-x-2">
                      <Button
                        color="dark"
                        className="rounded-full"
                        onClick={doEditProfile}
                      >
                        Edit Profile
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
              <Form className="grid grid-cols-1 px-10 lg:px-64">
                <div className="grid grid-cols-3 gap-2 py-5 border-b border-slate-100 items-center">
                  <h1 className="text-sm lg:text-lg text-slate-700 font-medium">
                    Username
                  </h1>
                  <Field name="username">
                    {({ field }) => (
                      <TextInput
                        {...field}
                        className="col-span-2 lg:col-span-1 tracking-wider"
                        color="dark"
                        placeholder={username}
                        readOnly={!isEditing}
                        id="text"
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
                <div className="grid grid-cols-3 gap-2 py-5 border-b border-slate-100 items-center">
                  <h1 className="text-sm lg:text-lg text-slate-700 font-medium">
                    Email
                  </h1>
                  <Field name="email">
                    {({ field }) => (
                      <TextInput
                        {...field}
                        className="col-span-2 lg:col-span-1 tracking-wider"
                        color="dark"
                        placeholder={email}
                        readOnly={!isEditing}
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
                <div className="grid grid-cols-3 gap-2 py-5 border-b border-slate-100 items-center">
                  <h1 className="text-sm lg:text-lg text-slate-700 font-medium">
                    Phone
                  </h1>
                  <Field name="phone">
                    {({ field }) => (
                      <TextInput
                        {...field}
                        className="col-span-2 lg:col-span-1 tracking-wider"
                        color="dark"
                        placeholder={phone}
                        readOnly={!isEditing}
                        id="text"
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
                <div className="mt-5 flex justify-between">
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <Button
                        color="light"
                        onClick={() => {
                          setEditing(false);
                          resetForm();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        color="dark"
                        className="flex items-center"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span>
                            <Spinner color={"info"} className="w-5" /> Saving...
                          </span>
                        ) : (
                          "Save"
                        )}
                      </Button>
                    </div>
                  ) : null}
                  <Button
                    color="dark"
                    onClick={() => props.setOpenModal("form-elements")}
                  >
                    Change Password
                  </Button>
                </div>
              </Form>
            </div>
            <dialog id="modalUploadImageProfile" className="rounded-lg">
              <Form className="w-[350px] h-[400px] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-lg">
                      Upload Profile Picture
                    </h3>
                    <Tooltip
                      content="File should be jpg, jpeg, webp or png and less than 1Mb"
                      placement="bottom"
                      style="dark"
                    >
                      <BsFillInfoCircleFill className="hover:text-red-600" />
                    </Tooltip>
                  </div>
                  <span
                    onClick={() => window.modalUploadImageProfile.close()}
                    className="p-2 bg-slate-50 rounded-lg text-xl hover:bg-red-200 hover:text-red-700"
                  >
                    <HiXMark />
                  </span>
                </div>
                <div
                  className={`alert alert-error ${file?.code ? "" : "hidden"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{file?.code}</span>
                </div>
                {file?.name ? (
                  <div className="">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-28 h-28 lg:w-48 lg:h-48 rounded-full border-2 lg:border-4 border-slate-50 overflow-hidden shadow-md">
                        <img
                          className="h-full w-full object-cover"
                          src={URL.createObjectURL(file)}
                          alt="Selected"
                        ></img>
                      </div>
                      <img />
                      <div className="">{file.name}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-auto p-5 justify-between bg-white w-full rounded-md">
                    <label
                      htmlFor="file-upload"
                      onClick={open}
                      className="link link-hover bg-blue text-slate-950 font-normal p-1 rounded-lg w-auto mx-auto px-4 py-2 text-md"
                    >
                      <div
                        {...getRootProps({
                          className: `h-auto w-full p-5 bg-light-grey drop-shadow ${
                            isDragActive
                              ? "border-amber-950"
                              : "border-slate-400"
                          } border-2 border-dashed rounded-md`,
                        })}
                      >
                        <input {...getInputProps({ name: "image" })} />
                        <div className="flex flex-col justify-center items-center">
                          <BsFileEarmarkImage className="text-slate-400 text-5xl" />
                          <p className="text-slate-500 text-center mt-2 mb-4 font-albra">
                            Drop a file or click to select
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                )}
                <div className="flex space-x-2 my-2">
                  <Button
                    color="light"
                    onClick={onButtonCancelUpload}
                    disabled={file?.name ? false : true}
                  >
                    Delete
                  </Button>
                  <Button
                    color="dark"
                    onClick={onButtonSave}
                    disabled={file?.name ? false : true}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            </dialog>
          </div>
        )}
      </Formik>
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Change Password
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Formik
              validationSchema={changePasswordSchema}
              initialValues={{
                currentPassword: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={(values) => {
                dispatch(changePass(values)).then((res) => {
                  if(isFulfilled(res)) {
                    navigate("/profile");
                  }
                })
              }}
            >
              <Form className="flex flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="currentPassword"
                      value="Your current password"
                    />
                  </div>
                  <Field name="currentPassword">
                    {({ field }) => (
                      <TextInput
                        {...field}
                        color="dark"
                        id="currentPassword"
                        placeholder="*********"
                        type="currentPassword"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="currentPassword"
                    component="span"
                    className="text-sm text-red-600"
                  />
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
                >
                  Save
                </Button>
              </Form>
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
