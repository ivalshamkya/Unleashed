import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { unlikeArticle } from "../../../store/slices/blogs/slices";

function UserLike({ title, content, category, BlogId, handleError, handleSuccess }) {
  const dispatch = useDispatch();
  const likeButton = () => {
    dispatch(unlikeArticle({ BlogId })).then((result) => {
      handleSuccess(result.payload)
    }).catch((err) => {
      handleError(err)
    });
  };
  return (
    <div className="flex border h-[300px] border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col rounded-xl">
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
          <div className="flex space-x-2 items-center"></div>
          <div className="card-actions justify-end">
            <div className="tooltip" data-tip="Please login first">
              <button className="btn cursor-pointer" onClick={likeButton}>
                <BsHeartFill color="red" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RenderLikedBlogCards({ likedArticles = [], handleError, handleSuccess }) {
  return likedArticles.map((likedArticle, index) => {
    return (
      <UserLike
        key={index}
        title={likedArticle.Blog.title}
        content={likedArticle.Blog.content}
        category={likedArticle.Blog.Category?.name}
        BlogId={likedArticle.BlogId}
        handleError={handleError}
        handleSuccess={handleSuccess}
      />
    );
  });
}
