import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, likeArticle } from "../../../store/slices/blogs/slices";
import { convertToDate } from "../../../utils/Date";
import { Avatar, Button, Card, Modal } from "flowbite-react";
import { BsHeart, BsTrash } from "react-icons/bs";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

function BlogCard({
  title,
  content,
  thumbnail,
  BlogId,
  author,
  authorImg,
  createdAt,
  category,
}) {
  const [openModal, setOpenModal] = useState('');
  const props = { openModal, setOpenModal };

  const dispatch = useDispatch();

  const removeBlog = () => {
    dispatch(deleteBlog({ BlogId }));
  };

  const id = localStorage.getItem("token");

  return (
    <div className="flex border h-[450px] lg:h-[600px] border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col rounded-xl">
      <div className="flex h-[350px] lg:h-[550px] overflow-hidden">
        <img
          alt=""
          src={import.meta.env.VITE_APP_API_BLOG_IMAGE_URL + thumbnail}
          className="rounded-t-lg w-full h-full object-cover"
        />
      </div>
      <div className="flex h-full flex-col justify-center gap-4 p-6">
        <div className="w-fit bg-blue-100 text-blue-800 text-xs mr-2 px-3 py-1 rounded-full">
          {category}
        </div>
        <a href="#">
          <h5 className="text-sm lg:text-2xl font-medium tracking-tight text-slate-950">
            <p>{title}</p>
          </h5>
        </a>
        <div className="mb-5 mt-2 flex items-center">
          <span className="text-xs lg:text-sm font-medium text-slate-900">
            <p>{content}</p>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2 items-center">
            <div className="flex justify-center items-center space-x-4 rounded">
              <div className="relative">
                <img
                  alt=""
                  src={authorImg ? import.meta.env.VITE_APP_API_BLOG_IMAGE_URL + authorImg : '/img/profile-dummy.png'}
                  className="rounded-full w-10 h-10"
                  data-testid="flowbite-avatar-img"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs lg:text-sm text-slate-950 font-albra">
                {author}
              </span>
              <span className="text-xs lg:text-sm text-slate-500 font-albra">
                {convertToDate(createdAt)}
              </span>
            </div>
          </div>
          <div className="card-actions justify-end">
            <div className="tooltip" data-tip="Please login first">
              <button
                className="btn cursor-pointer p-2 text-xl rounded-lg bg-red-50 hover:bg-red-600 hover:text-slate-50"
                onClick={() => props.setOpenModal("pop-up")}
              >
                <BsTrash className=""></BsTrash>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={props.openModal === "pop-up"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => { props.setOpenModal(undefined); removeBlog() }}
              >
                Yes, I`m sure
              </Button>
              <Button
                color="gray"
                onClick={() => props.setOpenModal(undefined)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default function RenderBlogCards({ blogs = [] }) {
  return blogs.map((blog) => {
    return (
      <BlogCard
        key={blog.id}
        title={blog.title}
        content={blog.content}
        thumbnail={blog.imageURL}
        BlogId={blog.id}
        author={blog.User.username}
        authorImg={blog.User.imgProfile}
        createdAt={blog.createdAt}
        category={blog?.Category?.name}
      />
    );
  });
}
