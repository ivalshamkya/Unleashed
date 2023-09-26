import { useDispatch } from "react-redux";
import { likeArticle } from "../../../store/slices/blogs/slices";
import { convertToDate } from "../../../utils/Date";
import { Avatar, Card } from "flowbite-react";
import { BsHeart } from "react-icons/bs";
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
  const likeButton = () => {
    console.log('clicked')
    dispatch(likeArticle({ BlogId }));
  };
  const id = localStorage.getItem("token");
  return (
    <Card
    imgSrc={import.meta.env.VITE_APP_API_BLOG_IMAGE_URL + thumbnail}
    className="rounded-xl"
    horizontal
    >
      <div className="w-fit bg-blue-100 text-blue-800 text-xs mr-2 px-2.5 py-0.5 rounded-full">
        {category}
      </div>
      <a href="#">
        <h5 className="text-sm lg:text-lg font-medium tracking-tight text-slate-950">
          <p>{title}</p>
        </h5>
      </a>
      <div className="mb-5 mt-2 flex items-center">
        <span className="text-xs font-medium text-slate-900">
          <p>{content}</p>
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2 items-center ">
            <span className="text-xs text-slate-950 font-albra">
              {author} • {convertToDate(createdAt)}
            </span>
        </div>
        <div className="card-actions justify-end">
          <div
            className="tooltip"
            data-tip={!id ? "Please login first" : "Like me please"}
          >
            <button className="btn cursor-pointer" disabled={!id} onClick={likeButton}>
              <BsHeart className=""></BsHeart>
            </button>
          </div>
        </div>
      </div>
    </Card>
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
