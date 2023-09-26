import { useDispatch } from "react-redux";
import { likeArticle } from "../../../store/slices/blogs/slices";
import { convertToDate } from "../../../utils/Date";
import { Avatar, Card } from "flowbite-react";
import { BsHeart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const likeButton = () => {
    dispatch(likeArticle({ BlogId }));
  };
  const id = localStorage.getItem("token");
  return (
    <div onClick={() => navigate(`/blog/${BlogId}`, 'replace')} className="flex border h-[450px] lg:h-[600px] border-gray-200 cursor-pointer bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col rounded-xl">
      <div className="flex h-[350px] lg:h-[550px] overflow-hidden rounded-t-lg">
        <img
          alt=""
          src={import.meta.env.VITE_APP_API_BLOG_IMAGE_URL + thumbnail}
          className="w-full h-full object-cover hover:scale-105 transition-all ease-linear"
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
                  src={
                    authorImg
                      ? import.meta.env.VITE_APP_API_BLOG_IMAGE_URL + authorImg
                      : "/img/profile-dummy.png"
                  }
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
          {id && (
            <button
              className="btn cursor-pointer"
              disabled=""
              onClick={likeButton}
            >
              <BsHeart className=""></BsHeart>
            </button>
          )}
        </div>
      </div>
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
