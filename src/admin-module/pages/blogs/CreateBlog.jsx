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
  const client = axiosClient(authDetails?.token, true);
  const [editBlog, setEditBlog] = useState(false);
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    blog_category_id: null,
    blog_sub_category_id: null,
    main_image: "", //nullable
    secondary_image: "", //nullable
    feature_post: 0, //nullable 1,0
  });
  const [image, setImage] = useState("https://via.placeholder.com/800x400");


  // Function to calculate reading time
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = text.split(/\s+/).length; // Count words
    return Math.ceil(words / wordsPerMinute); // Round up to the nearest minute
  };

  useEffect(() => {
    setBlog((prev) => ({
      ...prev,
      readingTime: calculateReadingTime(blog.description || ""),
    }));
  }, [blog.description]);

  useEffect(() => {
    console.log(location.state?.data)
    if (location.state?.data) {
      setBlog(location.state?.data)
      setEditBlog(true);
    }
  }, [location.state])
  useEffect(() => {
    setImage(blog?.main_image ? `${IMAGE_URL}/${blog?.main_image}` : "https://via.placeholder.com/800x400")
    // console.log(blog)
  }, [blog])

  const handlePost = async () => {
    setLoading(true);
    try {
      let apiFunc;

      if (editBlog) {
        // Filter keys for editing
        const filteredBlog = Object.keys(blog).reduce((acc, key) => {
          if (!["created_at", "updated_at", "feature_post", "id", "readingTime", "category", "subcategory", "main_image", "secondary_image"].includes(key)) {
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
        // Prepare FormData for posting
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

      const response = await apiFunc;
      console.log(response, "done");
      onSuccess({
        message: editBlog ? "Blog Update" : "New Blog",
        success: editBlog ? "Blog Updated Successfully" : "Blog Posted Successfully",
      });
      navigate("/admin/blogs");
    } catch (error) {
      console.error(error);
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
        setImage(e.target.result); // Update the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <UploadSlider image={image} handleImageChange={handleImageChange} />
            {/* Add image upload input */}

          </div>
          <PageAttributes setBlog={setBlog} blog={blog} />
        </div>
        <TextEditor setBlog={setBlog} blog={blog} />
        {/* Live Preview */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg min-h-20">
          <div className="flex justify-between gap-2">
            <strong className="text-xl">Preview:</strong>
            <button
              onClick={handlePost}
              className={`cursor-pointer font-semibold text-sm p-2 text-white rounded-md w-40 flex justify-center items-center gap-2 ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-800"
                }`}
              disabled={loading} // Disable button when loading
            >
              {editBlog ? "Edit Blog" : "Publish"} <span>{loading && <FaSpinner className="animate-spin" />}</span>
            </button>
          </div>
          <SectionHeader
            title={blog.title || "Blog Heading"}
            subtitle={blog?.description?.slice(0, 150) || "subtitle"}
            img={image}
            reads={blog.title && blog?.readingTime}
            time={blog.title && new Date().toLocaleDateString()}
          />
          <div className="relative max-w-[1400px] w-full mx-auto">
            <main className="relative mb-20 px-5 h-auto flex flex-col gap-5">
              <div className="prose max-w-none leading-8">
                <p dangerouslySetInnerHTML={{ __html: blog?.description || "Blog content" }}></p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
