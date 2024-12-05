import React, { useState, useEffect, useContext } from 'react';
import { ResourceContext } from "../../context/ResourceContext";
import { useNavigate } from 'react-router-dom';

const News = () => {
    const navigate = useNavigate();
    const [recent, setRecent] = useState(null);
    const [news, setNews] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const { setGetAllBlogPosts, getAllBlogPosts } = useContext(ResourceContext);

    // Fetch blog posts
    useEffect(() => {
        setGetAllBlogPosts((prev) => ({
            ...prev,
            isDataNeeded: true,
        }));
    }, []);

    // Process fetched blog posts
    useEffect(() => {
        if (getAllBlogPosts?.data) {
            const fetchedBlogs = getAllBlogPosts.data.data;
            setBlogs(fetchedBlogs);

            // Set the most recent post
            const sortedBlogs = fetchedBlogs?.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setRecent(sortedBlogs?.[0] || null);

            // Set other recent news
            setNews(sortedBlogs?.slice(1, 4) || []);
        }
    }, [getAllBlogPosts]);

    return (
        <div className="bg-[#47aa4910]">
            <div className="flex justify-between items-center px-3">
                <h2 className="text-sm font-semibold">LATEST NEWS</h2>
                <button
                    className="text-green-600 border-[1px] border-green-600 px-6 py-1 rounded-full font-bold text-sm"
                    onClick={() => {
                        scrollTo(0, 0);
                        navigate('/news');
                    }}
                >
                    Read All
                </button>
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-4 h-auto min-h-[550px] items-stretch">
                {/* Recent view */}
                {recent && (
                    <section
                        key={recent?.id}
                        className="w-full h-max md:w-1/2 flex-1 flex flex-col p-4"
                    >
                        <img
                            className="w-full h-[250px] md:h-[350px] object-cover rounded-md"
                            src={recent?.image || "https://via.placeholder.com/150"}
                            alt="Recent News"
                        />
                        <div className="p-2 ">
                            <small className="mt-2 text-gray-400 flex items-center">
                                <span className="mr-2 w-2 h-2 rounded-full bg-gray-400"></span>
                                {new Date(recent?.time_posted).toLocaleDateString()}
                            </small>
                            <h4 className="font-bold text-lg md:text-xl my-3">
                                {recent?.title}
                            </h4>
                            <p className="text-sm text-gray-500 mb-3">
                                {recent?.desc}
                            </p>
                            <article className="mt-2 flex justify-between gap-3">
                                <small className="mt-2 text-gray-400 flex items-center">
                                    <span className="mr-2 w-2 h-2 rounded-full bg-gray-400"></span>
                                    {recent?.reads} min read.
                                </small>
                                <p
                                    className="text-green-600 text-sm font-medium cursor-pointer"
                                    onClick={() => {
                                        scrollTo(0, 0);
                                        navigate(`/news/${recent?.id}`);
                                    }}
                                >
                                    Read More {">>"}
                                </p>
                            </article>
                        </div>
                    </section>
                )}

                {/* Other recent news */}
                <div className="w-full md:w-1/2 flex flex-col gap-2 overflow-y-auto max-h-[550px]">
                    {news.map((newsItem) => (
                        <section
                            key={newsItem?.id}
                            onClick={() => {
                                scrollTo(0, 0);
                                navigate(`/news/${newsItem?.id}`);
                            }}
                            className="flex justify-between items-stretch cursor-pointer"
                        >
                            <div className="w-28 min-h-28 md:w-32 md:h-auto lg:w-40 lg:h-auto flex-shrink-0">
                                <img
                                    className="w-full h-full object-cover rounded-md"
                                    src={newsItem?.image || "https://via.placeholder.com/150"}
                                    alt="News"
                                />
                            </div>

                            <div className="p-2 flex-1 w-[90%] md:w-full flex flex-col justify-center">
                                <small className="mt-2 text-gray-400 flex items-center">
                                    <span className="mr-2 w-2 h-2 rounded-full bg-gray-400"></span>
                                    {new Date(newsItem?.created_at).toLocaleDateString()}
                                </small>
                                <h4 className="font-bold text-sm md:my-2 lg:my-3">
                                    {newsItem?.title}
                                </h4>
                                <p className="text-sm text-gray-500 mb-1 md:mb-3">
                                    {newsItem?.desc?.slice(0, 100)}...
                                </p>
                                <article className="flex items-center justify-between gap-1 md:gap-3">
                                    <small className="mt-2 text-gray-400 flex items-center">
                                        <span className="mr-2 w-2 h-2 rounded-full bg-gray-400"></span>
                                        {newsItem?.reads} min read.
                                    </small>
                                    <p className="text-green-600 text-xs font-medium">
                                        Read More {">>"}
                                    </p>
                                </article>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
