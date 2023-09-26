import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeEmail,
  changePhone,
  changeUsername,
  keepLogin,
  uploadProfilePic,
} from "../../store/slices/auth/slices";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { editProfileSchema } from "../../store/slices/auth/validation";
import { useDropzone } from "react-dropzone";
import {
  Avatar,
  Button,
  Card,
  Spinner,
  Tabs,
  TextInput,
  Toast,
  Tooltip,
} from "flowbite-react";
import { Navbar } from "../../components";
import {
  BsFileEarmarkImage,
  BsFillInfoCircleFill,
  BsPen,
} from "react-icons/bs";
import { HiCheckCircle, HiXCircle, HiXMark } from "react-icons/hi2";
import { getUserArticles } from "../../store/slices/blogs/slices";
import { getLikedArticles } from "../../store/slices/blogs/LikedArticles/slices";
import Pagination from "./components/Pagination";
import RenderBlogCards from "./components/Blogs";
import RenderLikedBlogCards from "./components/userLikedBlog";

export default function MyBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const {
    filteredArticles,
    likedArticles,
    currentLikedPages,
    username,
    phone,
    email,
    imgProfile,
  } = useSelector((state) => {
    return {
      filteredArticles: state.blogs.articles,
      likedArticles: state.liked.likedArticles,
      currentLikedPages: state.liked.currentPage,
      username: state.auth.username,
      phone: state.auth.phone,
      email: state.auth.email,
      imgProfile: state.auth.imgProfile,
    };
  });

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

  const onLikedArticles = (type) => {
    dispatch(
      getLikedArticles({
        page: type === "prev" ? currentLikedPages - 1 : currentLikedPages + 1,
        listLimit: 5,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getLikedArticles({
        page: 1,
        listLimit: 5,
      })
    );
    dispatch(
      getUserArticles({
        id_cat: "",
        page: 1,
        sort: "asc",
      })
    );
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-screen p-5 lg:p-10">
        <div className="relative h-[300px] lg:h-[450px]">
          <div className="w-full h-40 lg:h-72 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-fuchsia-950 rounded-tl-[4rem] lg:rounded-tl-[7rem] rounded-b-md rounded-tr-md"></div>
          <div className="absolute top-[7.5rem] lg:top-56 left-7 w-28 h-28 lg:w-48 lg:h-48 rounded-full border-2 lg:border-4 border-slate-50 overflow-hidden shadow-md">
            <img
              className="h-full w-full object-cover"
              src={
                imgProfile
                  ? import.meta.env.VITE_APP_API_PROFILE_IMAGE_URL + imgProfile
                  : "/img/profile-dummy.png"
              }
              alt="Rounded avatar"
            ></img>
          </div>
          <div className="flex items-center justify-between ml-40 lg:ml-64">
            <div>
              <h1 className="my-1 lg:my-3 text-2xl lg:text-4xl text-slate-900 font-semibold">
                {username}
              </h1>
              <h1 className="my-1 lg:my-3 text-xs lg:text-lg text-slate-700 font-medium">
                {email}
              </h1>
            </div>
          </div>
        </div>
        <Tabs.Group aria-label="Tabs with icons" style="fullWidth">
          <Tabs.Item active title="Blogs">
            <div className="">
              <Button
                color="dark"
                onClick={() => {
                  navigate("/post-blog");
                }}
                className="mb-7"
              >
                <BsPen className="mr-1.5" /> Create new post
              </Button>
              {filteredArticles.length > 0 && (
                <div>
                  <div className="grid grid-cols-2 gap-5">
                    <RenderBlogCards blogs={filteredArticles} />
                  </div>
                </div>
              )}
            </div>
          </Tabs.Item>
          <Tabs.Item title="Likes">
            <div className="flex flex-col w-full h-1/2 mt-8 pb-2 ">
              <div className="card place-items-start flex-wrap gap-5 justify-between py-5">
                {likedArticles.length > 0 && (
                  <div className="grid grid-cols-2 gap-5">
                    <RenderLikedBlogCards likedArticles={likedArticles} handleSuccess={showSuccesToast} handleError={showErrorToast}/>
                  </div>
                )}
              </div>
              <Pagination
                onChangePagination={onLikedArticles}
                disabledPrev={currentLikedPages === 1}
                disabledNext={likedArticles.length == 0}
              />
            </div>
          </Tabs.Item>
        </Tabs.Group>
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
