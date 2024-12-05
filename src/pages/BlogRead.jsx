import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Landing/Navbar';
import Footer from '../components/Landing/Footer';
import { recentNews } from '../components/Landing/LandingData';
import SectionHeader from "../components/Landing/SectionHeader";
import { BASE_URL } from '../utils/base';
import axios from 'axios';
const BlogRead = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(false);

const calculateReadingTime = (text) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = text.split(/\s+/).length; // Count words
    const minutes = Math.ceil(words / wordsPerMinute); // Round up
    return minutes;
};
    useEffect(() => {
        setLoading(true)

        // Fetch blog details by ID
        axios.get(`${BASE_URL}/blog/posts/${id}`) // Replace with your API URL
            .then((response) => response.data)
            .then((info) => {

        // Add reading time to each blog
        const blogWithReadingTime = info?.data?.map((blog) => ({
            ...blog,
            readingTime: calculateReadingTime(blog.description || ""),
        }));
                setBlog(blogWithReadingTime);
                console.log(info?.data)
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching blog:', error)
                setLoading(false)
            });
    }, [recentNews, id]);

    return (
        loading ? <div className="flex justify-center items-center mt-10 h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
        </div>
            : <>
                <SectionHeader
                    title={blog?.title}
                    subtitle={blog?.description.slice(0, 150)}
                    img={blog?.main_image}
                    reads={blog?.readingTime}
                    time={new Date(blog?.created_at).toLocaleDateString()}
                />
                <div className='relative max-w-[1400px] w-full mx-auto'>
                    <Navbar />
                    <main className="relative mb-20 px-5 h-auto flex flex-col gap-5">
                        <div className="prose max-w-none leading-8">
                            <p>{blog?.description}</p>
                        </div>
                    </main>

                </div>
                <Footer />
            </>
    );
};

export default BlogRead;
