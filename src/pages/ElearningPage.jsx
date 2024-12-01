import React from "react";
import Footer from '../components/Landing/Footer'
import Navbar from '../components/Landing/Navbar'
import { jobDetails, recentNews } from '../components/Landing/LandingData';
import LearningHeroSection from '../components/Landing/LearningHeroSection'
import LearningCourseGrid from '../components/Landing/LearningCourseGrid'

const ElearningPage = () => {
    return (
<>
        <div className='relative max-w-[1200px] w-full mx-auto'>
            <Navbar />
            <main className="relative my-20 px-5 h-auto flex flex-col gap-5">

                <LearningHeroSection list={jobDetails} />
                <LearningCourseGrid list={recentNews} />
               
            </main>
        </div>
 <Footer />
</>
    )
};

export default ElearningPage;
