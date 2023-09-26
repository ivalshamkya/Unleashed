import { useDispatch } from "react-redux";
import { likeArticle } from "../../../store/slices/blogs/slices";
import { convertToDate } from "../../../utils/Date";
import { Avatar, Card } from "flowbite-react";
import { BsHeart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
function TopBlogCard({
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
    <div onClick={() => navigate(`/blog/${BlogId}`)} className="flex flex-row items-center space-x-2 min-h-[200px] bg-white cursor-pointer border border-gray-200 rounded-lg overflow-hidden shadow hover:bg-gray-50">
      <div className="w-72 h-full bg-black">
        <img
          className="object-cover h-full"
          src={import.meta.env.VITE_APP_API_BLOG_IMAGE_URL + thumbnail}
          alt=""
        />
      </div>
      <div className="w-full h-full relative overflow-hidden flex flex-col justify-around p-1">
        <div className="w-fit bg-blue-100 text-blue-800 text-xs mr-2 px-2.5 py-0.5 rounded-full">
          {category}
        </div>
        <a href="#">
          <h5 className="text-sm lg:text-lg font-medium tracking-tight text-slate-950">
            <p className="text-ellipsis overflow-hidden">{title}</p>
          </h5>
        </a>
        <div className="mb-5 mt-2">
          <p className="text-xs font-medium text-slate-900 text-ellipsis">
            {content}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xs text-slate-950 font-albra">
            {author} • {convertToDate(createdAt)}
          </h1>
        </div>
        {id && (
          <button
            className="absolute right-4 bottom-3"
            disabled={!id}
            onClick={likeButton}
          >
            <BsHeart className=""></BsHeart>
          </button>
        )}
      </div>
    </div>
  );
}

export default function RenderTopBlogCards({ blogs = [] }) {
  return blogs.map((blog) => {
    return (
      <TopBlogCard
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
