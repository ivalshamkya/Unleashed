import { Button, Footer, Modal, Select, Spinner } from "flowbite-react";
import { Navbar, SkeletonCard, SkeletonHorizontalCard } from "../../components";
import { Carousel } from "../../components/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getArticles } from "../../store/slices/blogs/slices";
import { getCategories } from "../../store/slices/blogs/Category/slices";
import { getFavBlogs } from "../../store/slices/blogs/FavBlogs/slices";
import Pagination from "./components/Pagination";
import RenderBlogCards from "./components/Blogs";
import { BsFilter, BsSortAlphaDown, BsSortAlphaUp } from "react-icons/bs";
import RenderTopBlogCards from "./components/TopBlogs";
import RenderCategoryBlogs from "./components/categoryBlogs";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [sort, setSort] = useState(true);
  const [openModal, setOpenModal] = useState("");
  const props = { openModal, setOpenModal };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLogoutLoading,
    loading,
    loadingTopBlogs,
    currentPage,
    totalPage,
    articles,
    username,
    categories,
    favorites,
  } = useSelector((state) => {
    return {
      isLogoutLoading: state.auth.isLogoutLoading,
      loading: state.blogs.isLoading,
      articles: state.blogs.articles,
      currentPage: state.blogs.currentPage,
      totalPage: state.blogs.totalPage,
      username: state.auth.username,
      categories: state.category.categories,
      favorites: state.favorites.favorites,
      topBlogs: state.favorites.top,
      loadingTopBlogs: state.favorites.isLoading,
    };
  });

  const [valueCategory, setValue] = useState({ id: "", name: "" });

  useEffect(() => {
    dispatch(
      getArticles({
        id_cat: "",
        page: 1,
        sort: sort ? "asc" : "desc",
        username: { username },
      })
    );
    dispatch(getCategories());
    dispatch(
      getFavBlogs({
        id_cat: "",
        page: 1,
        sort: sort ? "asc" : "desc",
      })
    );
  }, []);

  const onChangePagination = (type) => {
    dispatch(
      getArticles({
        id_cat: valueCategory.id ? valueCategory.id : "",
        page: type === "prev" ? currentPage - 1 : currentPage + 1,
        sort: sort ? "asc" : "desc",
      })
    );
  };

  const handleChange = (event) => {
    setValue({
      id: event.target.value,
      name: event.target.value,
    });

    dispatch(
      getArticles({
        id_cat: event.target.value,
        page: 1,
        sort: sort ? "asc" : "desc",
      })
    );

    dispatch(
      getFavBlogs({
        id_cat: event.target.value ? event.target.value : "",
        page: 1,
        sort: sort ? "asc" : "desc",
      })
    );
  };

  const sortingChange = (_sort) => {
    setSort(_sort);
    dispatch(
      getArticles({
        id_cat: "",
        page: 1,
        sort: _sort ? "asc" : "desc",
      })
    );
  };
  if (isLogoutLoading)
    return (
      <div className="h-screen w-screen flex flex-col align-middle">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  return (
    <div className="font-resolve">
      <Navbar />
      {!username && (
        <div className="flex flex-col justify-center items-center text-center space-y-5 mt-14">
          <h1 className="font-resolve text-xl">Unleashed.</h1>
          <h1 className="font-resolve text-4xl">
            Where ideas run wild and creativity knows no bounds
          </h1>
          <h1 className="font-resolve text-xl">
            The latest news, technologies, and many more
          </h1>
          <Button color="dark" onClick={() => navigate("/auth/signup")}>
            Create my own account
          </Button>
        </div>
      )}
      <div className="p-7 rounded-xl overflow-hidden">
        {favorites ? (
          <Carousel data={favorites} interval={5000} />
        ) : (
          <Spinner />
        )}
      </div>
      <div className="grid lg:grid-cols-3 gap-5 lg:gap-10 py-12 px-5">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4 lg:mb-5">
            <h1 className="text-xl lg:text-3xl">Recent blog posts</h1>
            <button
              className="rounded-full p-2 text-2xl border-2 border-slate-900 hover:bg-slate-900 hover:text-slate-50 transition-all ease-in duration-100"
              onClick={() => props.setOpenModal("form-elements")}
            >
              <BsFilter></BsFilter>
            </button>
            <Modal
              show={props.openModal === "form-elements"}
              size="md"
              popup
              onClose={() => props.setOpenModal(undefined)}
            >
              <Modal.Header className="border-b">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Filter
                </h3>
              </Modal.Header>
              <Modal.Body>
                <div className="flex flex-col space-y-5 px-7 mt-7">
                  <div className="flex flex-row w-full h-auto gap-5 justify-start">
                    <button
                      onClick={() => sortingChange(false)}
                      disabled={sort == false}
                      className="flex justify-center items-center pt-2 text-2xl p-2 text-slate-500 border-2 border-slate-500 rounded-lg hover:border-slate-800 hover:text-slate-800 disabled:border-blue-400 disabled:bg-blue-50 disabled:text-blue-400"
                    >
                      <BsSortAlphaDown />
                    </button>
                    <button
                      onClick={() => sortingChange(true)}
                      disabled={sort == true}
                      className="flex justify-center items-center pt-2 text-2xl p-2 text-slate-500 border-2 border-slate-500 rounded-lg hover:border-slate-800 hover:text-slate-800 disabled:border-blue-400 disabled:bg-blue-50 disabled:text-blue-400"
                    >
                      <BsSortAlphaUp />
                    </button>
                  </div>
                  <Select
                    value={
                      valueCategory?.name ? valueCategory.name : ""
                    }
                    color={"dark"}
                    onChange={handleChange}
                    required
                  >
                    <option value="">All Category</option>
                    <RenderCategoryBlogs categories={categories} />
                  </Select>
                </div>
              </Modal.Body>
            </Modal>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-4 lg:mb-7">
            {loading || articles.length == 0 ? (
              <SkeletonCard count={8}></SkeletonCard>
            ) : (
              <>
                <RenderBlogCards blogs={articles} />
                <Pagination
                  onChangePagination={onChangePagination}
                  disabledPrev={currentPage === 1}
                  disabledNext={currentPage >= totalPage}
                />
              </>
            )}
          </div>
        </div>

        <div className="">
          <div className="flex justify-between items-center mb-4 lg:mb-7">
            <h1 className="text-xl lg:text-3xl">Top posts</h1>
          </div>
          <div className="grid grid-cols-1 gap-7 mb-4 lg:mb-7">
            {loadingTopBlogs || favorites.length == 0 ? (
              <SkeletonHorizontalCard count={8}></SkeletonHorizontalCard>
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
