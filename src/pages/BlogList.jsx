import React, { useEffect, useState } from 'react';
import { recentNews, jobDetails } from '../components/Landing/LandingData';
import Navbar from '../components/Landing/Navbar';
import Footer from '../components/Landing/Footer';
import { useNavigate } from 'react-router-dom'
const BlogList = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const[selected,setSelected]=useState(1);
    useEffect(() => {
        setBlogs(recentNews);
        // // Fetch data from an endpoint
        // fetch('https://api.example.com/blogs') // Replace with your API URL
        //   .then((response) => response.json())
        //   .then((data) => setBlogs(data))
        //   .catch((error) => console.error('Error fetching blogs:', error));
    }, []);

    return (

        <>
            <div className='relative max-w-[1400px] w-full mx-auto'>
                <Navbar />
                <main className="relative my-24 px-5 h-auto flex flex-col gap-5">
                <div className="flex flex-col md:flex-row md:gap-x-10 mt-3 md:items-end md:overflow-x-auto">
                    <input type="text" className="px-4 py-2 rounded-full h-10 border border-gray-500 text-sm min-w-60" placeholder="Search" />
                    <div className="flex md:gap-3 mt-6 border-b-[1px] border-b-gray-400 overflow-x-auto">
                        {
                            jobDetails?.map((course) => (
                                <button key={course?.id} onClick={() => setSelected(course?.id)} className={`capitalize text-sm px-4 py-2 ${selected === course?.id ? "text-green-600 border-b-[2px] border-b-green-600" : "text-gray-700"} font-bold rounded`}>
                                    {course?.title}
                                </button>
                            ))
                        }
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10">
                        {blogs.map((blog) => (
                            <article onClick={() => { scrollTo(0, 0); navigate(`/news/${blog?.id}`) }} key={blog?.id} className="cursor-pointer bg-white rounded-lg shadow overflow-hidden">
                                <img src={blog?.image} alt={blog?.title} className="w-full h-48 object-cover" />
                                <div className="p-2 flex-1 w-[90%] md:w-full flex flex-col justify-center">
                                    <small className="mt-2 text-gray-400 flex items-center">
                                        <span className="mr-2 w-2 h-2 rounded-full bg-gray-400"></span>
                                        {blog?.time_posted}
                                    </small>
                                    <h4 className="font-bold text-xl md:my-2 lg:my-3">
                                        {blog?.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 mb-1 md:mb-3">
                                        {blog?.desc.slice(0, 100)}...
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
                </main>
            </div>
            <Footer />
        </>
    );
};

export default BlogList;
