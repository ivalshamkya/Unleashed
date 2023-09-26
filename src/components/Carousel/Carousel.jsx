import { Spinner, Carousel as _Carousel } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function Carousel({ data = [], interval }) {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs(data.slice(0, 3));
  }, [data]);

  return (
    blogs.length > 0 && (
      <div className="h-[250px] lg:h-[500px] bg-black/50 rounded-xl">
        <_Carousel slideInterval={interval}>
          {blogs.map((blog, index) => (
            // <div className="relative" key={index}>
            //     <img src="https://www.kindacode.com/wp-content/uploads/2022/06/night-sky.jpeg" />
            // </div>
            <div
              key={index}
              className="relative self-end bg-gradient-to-r from-transparent via-black/30 to-transparent text-center"
              onClick={() => navigate(`/popular-article/${blog.id}`)}
            >
              <img
                src={
                  import.meta.env.VITE_APP_API_BLOG_IMAGE_URL + blog.imageURL
                }
                className="w-full h-full object-cover bg-no-repeat z-0 brightness-50"
                alt=""
              />
              <div className="absolute text-white top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h3 className="text-white text-base lg:text-2xl bg-black/50 p-1 rounded-lg">{blog.title}</h3>
                {/* <p className="text-lighter">{blog.content}</p> */}
              </div>
            </div>
          ))}
        </_Carousel>
      </div>
    )
  );
}
