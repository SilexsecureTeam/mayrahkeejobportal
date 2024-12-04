import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Landing/Navbar';
import Footer from '../components/Landing/Footer';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { ResourceContext } from "../context/ResourceContext";

const BlogList = () => {
    const { setGetAllBlogPosts, getAllBlogPosts } = useContext(ResourceContext);
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [selected, setSelected] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const defaultBlogs = [
        {
            id: 1,
            title: "Default Blog 1",
            description: "This is a default blog description.",
            main_image: "https://via.placeholder.com/150",
            created_at: new Date().toISOString(),
            reads: 5,
        },
        {
            id: 2,
            title: "Default Blog 2",
            description: "This is another default blog description.",
            main_image: "https://via.placeholder.com/150",
            created_at: new Date().toISOString(),
            reads: 7,
        },
    ];

    // Trigger API request for blogs
    useEffect(() => {
        setGetAllBlogPosts((prev) => ({
            ...prev,
            isDataNeeded: true,
        }));
    }, []);

    // Set blogs from API response or fallback to default blogs
    useEffect(() => {
        if (getAllBlogPosts?.data) {
            setBlogs(getAllBlogPosts?.data);
        } else {
            setBlogs(defaultBlogs); // Use fallback data
        }
    }, [getAllBlogPosts]);

    // Filter blogs based on category and search query
    useEffect(() => {
        let result = selected === "All" ? blogs : blogs?.filter(blog => blog?.blog_category_id === selected?.toLowerCase());
        if (searchQuery.trim() !== "") {
            result = result.filter(blog =>
                blog?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog?.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredBlogs(result);
    }, [selected, searchQuery, blogs]);

    return (
        <>
            <div className="relative max-w-[1400px] w-full mx-auto">
                <Navbar />
                <main className="relative my-24 px-5 h-auto flex flex-col gap-5">
                    <div className="flex flex-col md:flex-row md:gap-x-10 mt-3 md:items-end md:overflow-x-auto">
                        {/* Search Input */}
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
                            {/* Add jobDetails mapping here */}
                        </div>
                    </div>
                    {/* Blogs */}
                    {filteredBlogs?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10">
                            {filteredBlogs.map((blog) => (
                                <article
                                    onClick={() => {
                                        scrollTo(0, 0);
                                        navigate(`/news/${blog?.id}`);
                                    }}
                                    key={blog?.id}
                                    className="cursor-pointer bg-white rounded-lg shadow overflow-hidden"
                                >
                                    <img src={blog?.main_image} alt={blog?.title} className="w-full h-48 object-cover" />
                                    <div className="p-2 flex-1 w-[90%] md:w-full flex flex-col justify-center">
                                        <small className="mt-2 text-gray-400 flex items-center">
                                            <span className="mr-2 w-2 h-2 rounded-full bg-gray-400"></span>
                                            {new Date(blog?.created_at).toLocaleDateString()}
                                        </small>
                                        <h4 className="font-bold text-xl md:my-2 lg:my-3">{blog?.title}</h4>
                                        <p className="text-sm text-gray-500 mb-1 md:mb-3">
                                            {blog?.description?.slice(0, 100)}...
                                        </p>
                                        <article className="flex items-center justify-between gap-1 md:gap-3">
                                            <small className="mt-2 text-gray-400 flex items-center">
                                                <span className="mr-2 w-2 h-2 rounded-full bg-gray-400"></span>
                                                {blog?.reads} min read.
                                            </small>
                                            <p className="text-green-600 text-xs font-medium">
                                                Read More {">>"}
                                            </p>
                                        </article>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center mt-10 text-gray-500 text-lg">
                            No blogs found for the selected category or search query.
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default BlogList;
