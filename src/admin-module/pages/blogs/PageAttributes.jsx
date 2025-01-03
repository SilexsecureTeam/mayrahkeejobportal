import React, { useState, useContext, useEffect } from "react";
import { ResourceContext } from "../../../context/ResourceContext";
import Selector from "../../../components/Selector";

const PageAttributes = ({ setBlog, blog }) => {
  const [selectedParent, setSelectedParent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [categories, setCategories] = useState(null);
  const [subcategories, setSubcategories] = useState(null);
  
  const {
    setGetAllBlogPosts,
    getAllBlogPosts,
    setGetAllBlogCategories,
    getAllBlogCategories
  } = useContext(ResourceContext);

  // Fetch blog posts and categories
  useEffect(() => {
    setGetAllBlogPosts((prev) => ({
      ...prev,
      isDataNeeded: true,
    }));
    setGetAllBlogCategories((prev) => ({
      ...prev,
      isDataNeeded: true,
    }));
  }, []);

  // Process fetched categories
  useEffect(() => {
    if (getAllBlogCategories?.data) {
        const fetchedCategories = getAllBlogCategories.data.data || [];
        setCategories(fetchedCategories);
        console.log(fetchedCategories)
    }
}, [getAllBlogCategories]);

  const handleParentChange = (e) => {
    setSelectedParent(e.target.value);
  };

  const handleFeaturedImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-semibold mb-4">Page Attributes</h3>

      {/* Category Dropdown */}
      <div className="mb-6">
        <label
          htmlFor="parent-category"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Category
        </label>
        <Selector
          data={categories}
          selected={categories?.find((category) => category.id === blog?.blog_category_id)}
          setSelected={(category) => {
            // Update job details only for the subsector
            setBlog((prevDetails) => ({
              ...prevDetails,
              blog_category_id: category?.id,
            }));
          }}
        />
      </div>

      {/* Subcategory Dropdown */}
      <div className="mb-6">
        <label
          htmlFor="parent-subcategory"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Subcategory
        </label>
        <Selector
          data={categories?.filter((category) => category.id === blog?.blog_category_id)
            ?.flatMap((category) => category.subcategories || [])}
          selected={categories?.filter((category) => category.id === blog?.blog_category_id)
            ?.flatMap((category) => category.subcategories || [])?.find((subcategory) => subcategory.id === blog?.blog_sub_category_id)}
          setSelected={(subcategory) => {
            // Update job details only for the subsector
            setBlog((prevDetails) => ({
              ...prevDetails,
              blog_sub_category_id: subcategory?.id,
            }));
          }}
        />
      </div>

      {/* Featured Image */}
      <div>
        <label
          htmlFor="featured-image"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Feature Image
        </label>
        <input
          type="file"
          id="featured-image"
          accept="image/*"
          onChange={handleFeaturedImageUpload}
          className="block w-full text-sm text-gray-600
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {featuredImage && (
          <div className="mt-4">
            <img
              src={featuredImage}
              alt="Featured Preview"
              className="w-full h-40 rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageAttributes;
