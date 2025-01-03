import React, { useEffect, useState, useContext } from "react";
import Header from "./Header";
import UploadSlider from "./UploadSlider";
import PageAttributes from "./PageAttributes";
import TextEditor from "./TextEditor";
import SectionHeader from "../../../components/Landing/SectionHeader";
import { axiosClient } from "../../../services/axios-client";
import { AuthContext } from "../../../context/AuthContex";
import { onSuccess } from "../../../utils/notifications/OnSuccess";
import { onFailure } from "../../../utils/notifications/OnFailure";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { IMAGE_URL } from "../../../utils/base";

const CreateBlog = () => {
  const { authDetails } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false); // Loader state
  const [showPreview, setShowPreview] = useState(false); // Toggle preview
  const client = axiosClient(authDetails?.token, true);
  const [editBlog, setEditBlog] = useState(false);
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    blog_category_id: null,
    blog_sub_category_id: null,
    main_image: "",
    secondary_image: "",
    feature_post: 0,
  });
  const [image, setImage] = useState("https://via.placeholder.com/800x400");

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  useEffect(() => {
    setBlog((prev) => ({
      ...prev,
      readingTime: calculateReadingTime(blog.description || ""),
    }));
  }, [blog.description]);

  useEffect(() => {
    if (location.state?.data) {
      setBlog(location.state?.data);
      setEditBlog(true);
    }
  }, [location.state]);

  useEffect(() => {
    setImage(
      blog?.main_image
        ? `${IMAGE_URL}/${blog?.main_image}`
        : "https://via.placeholder.com/800x400"
    );
  }, [blog]);

  const handlePost = async () => {
    setLoading(true);
    try {
      let apiFunc;

      if (editBlog) {
        const filteredBlog = Object.keys(blog).reduce((acc, key) => {
          if (
            ![
              "created_at",
              "updated_at",
              "feature_post",
              "id",
              "readingTime",
              "category",
              "subcategory",
              "main_image",
              "secondary_image",
            ].includes(key)
          ) {
            acc[key] = blog[key];
          }
          return acc;
        }, {});

        apiFunc = client.put(`/blog/posts/${blog.id}`, filteredBlog, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        const formData = new FormData();
        Object.keys(blog).forEach((key) => {
          if (blog[key] !== "readingTime") {
            formData.append(key, blog[key]);
          }
        });

        apiFunc = client.post(`/blog/posts`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      await apiFunc;
      onSuccess({
        message: editBlog ? "Blog Update" : "New Blog",
        success: editBlog ? "Blog Updated Successfully" : "Blog Posted Successfully",
      });
      navigate("/admin/blogs");
    } catch (error) {
      onFailure({
        message: editBlog ? "Edit Post Error" : "Post Error",
        error: `An error occurred while ${editBlog ? "updating" : "posting"} the blog.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBlog((prevDetails) => ({
        ...prevDetails,
        main_image: file,
      }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {showPreview ? (
      <div className="flex justify-around items-center">
          <button
            onClick={() => setShowPreview(false)}
            className="mt-4 bg-gray-600 text-white p-2 rounded hover:bg-gray-800"
          >
            Hide Preview
          </button>
          <button
            onClick={handlePost}
            className={`mt-4 ml-2 font-semibold text-sm p-2 text-white rounded-md flex items-center ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-800"
              }`}
            disabled={loading}
          >
            {editBlog ? "Edit Blog" : "Publish"} {loading && <FaSpinner className="animate-spin ml-2" />}
          </button>
          </div>
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg">
          <SectionHeader
            title={blog.title || "Blog Heading"}
            subtitle={blog?.description?.slice(0, 150) || "Subtitle"}
            img={image}
            reads={blog.readingTime}
            time={new Date().toLocaleDateString()}
          />
          <div className="prose max-w-none leading-8 mt-4">
            <p dangerouslySetInnerHTML={{ __html: blog?.description || "Blog content" }} />
          </div>
          
          
        </div>
      ) : (
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg">
          <Header />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            <div className="lg:col-span-2">
              <UploadSlider image={image} handleImageChange={handleImageChange} />
            </div>
            <PageAttributes setBlog={setBlog} blog={blog} />
          </div>
          <TextEditor setBlog={setBlog} blog={blog} />
          <div className="flex justify-around items-center">
          <button
            onClick={() => setShowPreview(true)}
            className="mt-6 bg-gray-200 p-2 rounded hover:bg-blue-800"
          >
            Preview
          </button>
            <button
            onClick={handlePost}
            className={`mt-4 ml-2 font-semibold text-sm p-2 text-white rounded-md flex items-center ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-800"
              }`}
            disabled={loading}
          >
            {editBlog ? "Edit Blog" : "Publish"} {loading && <FaSpinner className="animate-spin ml-2" />}
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBlog;
