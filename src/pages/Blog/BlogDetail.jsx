import { Footer, Spinner } from "flowbite-react";
import { Navbar, SkeletonCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getArticlesById } from "../../store/slices/blogs/slices";
import { getCategories } from "../../store/slices/blogs/Category/slices";
import { getFavBlogs } from "../../store/slices/blogs/FavBlogs/slices";
import RenderTopBlogCards from "./components/TopBlogs";
import { useParams } from "react-router-dom";
import { convertToDate } from "../../utils/Date";

export default function BlogDetail() {
  const [sort, setSort] = useState(true);
  const [openModal, setOpenModal] = useState("");
  const props = { openModal, setOpenModal };
  const dispatch = useDispatch();
  const BlogId = useParams();
  const {
    isLogoutLoading,
    loading,
    loadingTopBlogs,
    articles,
    favorites,
  } = useSelector((state) => {
    return {
      isLogoutLoading: state.auth.isLogoutLoading,
      loading: state.blogs.isLoading,
      articles: state.blogs.articles,
      favorites: state.favorites.favorites,
      loadingTopBlogs: state.favorites.isLoading,
    };
  });

  useEffect(() => {
    dispatch(
      getArticlesById({
        id_cat: "",
        page: 1,
        sort: sort ? "asc" : "desc",
        BlogId: BlogId.id
      })
    );
    dispatch(getCategories());
    dispatch(
      getFavBlogs({
        id_cat: "",
        page: 1,
        sort: sort ? "asc" : "desc",
        size: 5
      })
    );
  }, []);

  if (isLogoutLoading)
    return (
      <div className="h-screen w-screen flex flex-col align-middle">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  return (
    <div className="font-resolve">
      <Navbar />
      <div className="grid lg:grid-cols-3 gap-5 lg:gap-10 py-12 px-5">
        <div className="lg:col-span-2">
          {articles.length != 0 ? (
          <div className="flex border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col rounded-xl">
            <div className="flex h-[350px] lg:h-[550px] overflow-hidden rounded-t-lg">
              <img
                alt=""
                src={import.meta.env.VITE_APP_API_BLOG_IMAGE_URL + articles.imageURL}
                className="w-full h-full object-cover hover:scale-105 transition-all ease-linear"
              />
            </div>
            <div className="flex h-full flex-col justify-center gap-4 p-6">
              <div className="w-fit bg-blue-100 text-blue-800 text-xs mr-2 px-3 py-1 rounded-full">
                {articles.Category?.name}
              </div>
              <a href="#">
                <h5 className="text-sm lg:text-2xl font-medium tracking-tight text-slate-950">
                  <p>{articles.title}</p>
                </h5>
              </a>
              <div className="mb-5 mt-2 flex items-center">
                <span className="text-xs lg:text-sm font-medium text-slate-900">
                  <p>{articles.content}</p>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                  <div className="flex justify-center items-center space-x-4 rounded">
                    <div className="relative">
                      <img
                        alt=""
                        src={
                          articles.authorImg
                            ? import.meta.env.VITE_APP_API_BLOG_IMAGE_URL +
                            articles.authorImg
                            : "/img/profile-dummy.png"
                        }
                        className="rounded-full w-10 h-10"
                        data-testid="flowbite-avatar-img"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs lg:text-sm text-slate-950 font-albra">
                      {articles.author}
                    </span>
                    <span className="text-xs lg:text-sm text-slate-500 font-albra">
                      {convertToDate(articles.createdAt)}
                    </span>
                  </div>
                </div>
                {/* <button
                  className="btn cursor-pointer"
                  disabled=""
                  onClick={likeButton}
                >
                  <BsHeart className=""></BsHeart>
                </button> */}
              </div>
            </div>
          </div>
          ) : (
            <SkeletonCard></SkeletonCard>
          )
        }
        </div>

        <div className="">
          <div className="flex justify-between items-center mb-4 lg:mb-7">
            <h1 className="text-xl lg:text-3xl">Top posts</h1>
          </div>
          <div className="grid grid-cols-1 gap-7 mb-4 lg:mb-7">
            {loadingTopBlogs ? (
              <div className="h-screen w-screen flex flex-col align-middle">
                <Spinner></Spinner>
              </div>
            ) : (
              <RenderTopBlogCards blogs={favorites} />
            )}
          </div>
        </div>
      </div>
      <Footer
        container
        className="rounded-t-md rounded-b-none bg-gradient-to-br from-slate-700 to-slate-950"
      >
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <h1 className="text-3xl text-slate-50">Unleashed.</h1>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title
                  title="about"
                  className="text-slate-100 tracking-wider"
                />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                    className="text-slate-100 tracking-wider"
                  >
                    About Us
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title
                  title="Follow us"
                  className="text-slate-100 tracking-wider"
                />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                    className="text-slate-100 tracking-wider"
                  >
                    Facebook
                  </Footer.Link>
                  <Footer.Link
                    href="#"
                    className="text-slate-100 tracking-wider"
                  >
                    Instagram
                  </Footer.Link>
                  <Footer.Link
                    href="#"
                    className="text-slate-100 tracking-wider"
                  >
                    Twitter
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title
                  title="Legal"
                  className="text-slate-100 tracking-wider"
                />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                    className="text-slate-100 tracking-wider"
                  >
                    Privacy Policy
                  </Footer.Link>
                  <Footer.Link
                    href="#"
                    className="text-slate-100 tracking-wider"
                  >
                    Terms & Conditions
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright
              by="Unleashed."
              href="#"
              year={2023}
              className="text-slate-100"
            />
          </div>
        </div>
      </Footer>
    </div>
  );
}
