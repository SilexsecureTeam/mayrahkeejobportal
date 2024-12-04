
import React, { useEffect, useState, useContext } from 'react';
import { recentNews, jobDetails } from '../components/Landing/LandingData';
import Navbar from '../components/Landing/Navbar';
import Footer from '../components/Landing/Footer';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Import the search icon from React Icons

import { ResourceContext } from "../context/ResourceContext";
const BlogList = () => {
    const {setGetAllBlogPosts, getAllBlogPosts}= useContext(ResourceContext);
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [selected, setSelected] = useState();
    const [searchQuery, setSearchQuery] = useState("");
const [filteredBlogs, setFilteredBlogs] = useState([]);


useEffect(() => {
    setGetAllBlogPosts((prev) => ({
      ...prev,
      isDataNeeded: true,
    }));
  }, []);

useEffect(() => {
    if(getAllBlogPosts?.data){
      setBlogs(getAllBlogPosts?.data);
      setSelected("All");
    }
  }, [getAllBlogPosts]);


    
useEffect(() => {
    let result = selected === "All" ? blogs : blogs?.filter(blog => blog?.blog_category_id === selected?.toLowerCase());
    if (searchQuery.trim() !== "") {
        result = result.filter(blog =>
            blog?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog?. description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    setFilteredBlogs(result);
}, [selected, searchQuery, blogs]);


    return (
        <>
            <div className='relative max-w-[1400px] w-full mx-auto'>
                <Navbar />
                <main className="relative my-24 px-5 h-auto flex flex-col gap-5">
                    <div className="flex flex-col md:flex-row md:gap-x-10 mt-3 md:items-end md:overflow-x-auto">
                        {/* Search Input with Icon */}
                        <div className="relative w-full md:w-60">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-10 py-2 rounded-full h-10 border border-gray-500 text-sm"
                                placeholder="Search blogs"
                            />
                            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                        </div>
                        {/* Categories */}
                        <div className="flex md:gap-3 mt-6 border-b-[1px] border-b-gray-400 overflow-x-auto">
                            <button
                                onClick={() => setSelected("All")}
                                className={`capitalize text-sm px-4 py-2 ${
                                    selected === "All" ? "text-green-600 border-b-[2px] border-b-green-600" : "text-gray-700"
                                } font-bold rounded`}
                            >
                                All
                            </button>
                            {jobDetails?.map((course) => (
                                <button
                                    key={course?.id}
                                    onClick={() => setSelected(course?.title)}
                                    className={`capitalize text-sm px-4 py-2 ${
                                        selected === course?.title ? "text-green-600 border-b-[2px] border-b-green-600" : "text-gray-700"
                                    } font-bold rounded`}
                                >
                                    {course?.title}
                                </button>
                            ))}
                        </div>
                    </div>
                
                </main>
            </div>
            <Footer />
        </>
    );
};

export default BlogList;