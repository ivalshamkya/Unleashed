import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { publishBlogSchema } from "../../store/slices/auth/validation.js";
import { getCategories } from "../../store/slices/blogs/Category/slices.js";
import { getArticles, postBlog } from "../../store/slices/blogs/slices.js";
import {
  Button,
  FileInput,
  Label,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import RenderCategoryBlogs from "./components/categoryBlogs.jsx";
import { BsFileEarmarkImage } from "react-icons/bs";

const initialValuesPublishBlog = {
  title: "",
  content: "",
  country: "",
  CategoryId: "",
  url: "",
  picture: "",
  keywords: "",
};

function PublishBlog() {
  const [openModal, setOpenModal] = useState("");
  const props = { openModal, setOpenModal };
  const [file, setFile] = useState(null);
  const [valueCategory, setValue] = useState({ id: "", name: "" });

  const formikRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => {
    return {
      categories: state.category.categories,
    };
  });

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleChange = (event) => {
    setValue({
      id: event.target.selectedOptions[0].className,
      name: event.target.value,
    });
  };

  const formData = new FormData();

  const onConfirmPublish = () => {
    if (formikRef.current) {
      const values = formikRef.current.values;
      delete values.picture;
      formData.append("data", JSON.stringify(values));
      formData.append("file", file);

      dispatch(postBlog(formData));
    }
    // navigate("/myblog");
    dispatch(
      getArticles({
        id_cat: "",
        page: 1,
        sort: "desc",
      })
    );
  };

  const onDrop = (acceptedFiles, FileRejection) => {
    console.log('dropped')
    FileRejection.length == 0
      ? setFile(acceptedFiles[0])
      : setFile(FileRejection[0].errors[0]);
  };
  

  const { getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { "image/*": [".jpg", ".jpeg", ".webp", ".png"] },
    maxSize: 1000000,
    noKeyboard: true,
    noClick: true,
  });

  const removeImage = () => {
    setFile(null);
    open()
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValuesPublishBlog}
      validationSchema={publishBlogSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => {
        return (
          <div className="w-screen h-screen bg-slate-950 font-albra flex flex-col justify-center items-center">
            <Form className="w-[450px] lg:w-[550px] grid grid-cols-2 gap-4 px-7 py-7 bg-white rounded-md shadow-lg">
              <div className="mb-7 col-span-2">
                <h1 className="text-4xl text-blue-950 mb-2">Create new post</h1>
                <h3 className="text-sm font-resolve"></h3>
              </div>
              <div>
                <div className="mb-2">
                  <Label htmlFor="title" value="Title" />
                  <Field name="title">
                    {({ field }) => (
                      <TextInput
                        {...field}
                        className="tracking-wider"
                        color="dark"
                        placeholder="Title.."
                        id="title"
                        type="text"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="title"
                    component="span"
                    className="text-sm text-red-600"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2">
                  <Label htmlFor="country" value="Country" />
                  <Field name="country">
                    {({ field }) => (
                      <TextInput
                        {...field}
                        className="tracking-wider"
                        color="dark"
                        placeholder="Country.."
                        id="country"
                        type="text"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="span"
                    className="text-sm text-red-600"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <div className="mb-2">
                  <Label htmlFor="category" value="Category" />
                </div>
                <Field name="CategoryId">
                  {({ field }) => (
                    <Select {...field} color={"dark"} required>
                      <option defaultValue="Select Category">
                        Select Category
                      </option>
                      <RenderCategoryBlogs categories={categories} />
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="category"
                  component="span"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="col-span-2">
                <div className="mb-2">
                  <Label htmlFor="keywords" value="Keywords" />
                  <Field name="keywords">
                    {({ field }) => (
                      <Textarea
                        {...field}
                        className="tracking-wider"
                        color="dark"
                        placeholder="Keywords.."
                        id="keywords"
                        type="text"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="keywords"
                    component="span"
                    className="text-sm text-red-600"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <div className="mb-2">
                  <Label htmlFor="content" value="Content" />
                  <Field name="content">
                    {({ field }) => (
                      <Textarea
                        {...field}
                        className="tracking-wider"
                        color="dark"
                        placeholder="Content.."
                        id="content"
                        type="text"
                        rows={5}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="content"
                    component="span"
                    className="text-sm text-red-600"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <Label htmlFor="picture">Picture</Label>
                <Field name="picture"
                >
                  {({ field }) => (
                    <div onClick={!file ? open : removeImage} className="group border-2 border-dashed border-slate-400 rounded-lg py-10 hover:border-slate-700 cursor-pointer transition-all ease-in">
                    <input {...getInputProps({ name: "image" })}/>
                    <div className="flex flex-col justify-center items-center">
                      <BsFileEarmarkImage className="text-slate-400 text-5xl group-hover:text-slate-700 transition-all ease-in" />
                      <p className="text-slate-500 text-center text-lg mt-2 font-albra group-hover:text-slate-700 transition-all ease-in">
                        {file?.name ? file.name : 'Drop a file or click to select'}
                      </p>
                    </div>
                  </div>
                  )}
                </Field>
                <ErrorMessage
                    name="picture"
                    component="span"
                    className="text-sm text-red-600"
                  />
              </div>

              <Button
                color="dark"
                onClick={() => {
                  // onButtonPublishBlog();
                  props.setOpenModal("pop-up");
                }}
              >
                Save Changes
              </Button>
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
                      Are you sure you want to post this blog?
                    </h3>
                    <div className="flex justify-center gap-4">
                      <Button
                        color="success"
                        onClick={() => {
                          props.setOpenModal(undefined);
                          onConfirmPublish();
                        }}
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
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}


export default PublishBlog;
