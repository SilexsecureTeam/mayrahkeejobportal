import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Landing/Navbar';
import Footer from '../components/Landing/Footer';
import { recentNews } from '../components/Landing/LandingData';
import SectionHeader from "../components/Landing/SectionHeader";
const BlogRead = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const isBlogAvailable = recentNews?.find(one => one?.id === parseInt(id))
        console.log(recentNews, blog)
        if (isBlogAvailable) {
            setBlog(isBlogAvailable)
        }

        // // Fetch blog details by ID
        // fetch(`https://api.example.com/blogs/${id}`) // Replace with your API URL
        //   .then((response) => response.json())
        //   .then((data) => setBlog(data))
        //   .catch((error) => console.error('Error fetching blog:', error));
    }, [recentNews, id]);

    return (
        <>
            <SectionHeader
                    title={blog?.title}
                    subtitle={blog?.desc.slice(0, 150)}
                    img={blog?.image}
                    reads={blog?.reads}
                    time={blog?.time_posted}
                />
            <div className='relative max-w-[1400px] w-full mx-auto'>
            <Navbar />
            <main className="relative mb-20 px-5 h-auto flex flex-col gap-5">
                <div className="prose max-w-none leading-8">
                    <p>{blog?.content}</p>
                </div>
            </main>

        </div>
        <Footer />
        </>
    );
};

export default BlogRead;
