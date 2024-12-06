import React from "react";
import Footer from '../components/Landing/Footer'
import Navbar from '../components/Landing/Navbar'
import { jobDetails, recentNews } from '../components/Landing/LandingData';
import LearningHeroSection from '../components/Landing/LearningHeroSection'
import LearningCourseGrid from '../components/Landing/LearningCourseGrid'
import HowItWorks from '../components/Landing/HowItWorks'
import InfoSection from '../components/Landing/InfoSection';
import Testimonial from '../components/Landing/Testimonial';
import visionImg from '../assets/pngs/about4.png'
const ElearningPage = () => {
    return (
        <>
            <LearningHeroSection list={jobDetails} />
            <div className='relative max-w-[1400px] w-full mx-auto'>
                <Navbar />
                <main className="relative px-5 h-auto flex flex-col gap-5">
                    <div className="my-2">
                        <LearningCourseGrid list={recentNews} />
                        <button className="rounded-full my-4 px-4 py-2 bg-black text-white w-60">
                            Show all Courses
                        </button>
                    </div>
                    <div className="my-3">
                        <h2 className="font-semibold text-2xl">Learners are also viewing</h2>
                        <LearningCourseGrid list={recentNews} />
                    </div>
                    <Testimonial />
<HowItWorks />

                    <InfoSection
                        title="Join our community of ambitious professionals today and unlock the doors to your dream career"
                        description="Our vision is to be recognized as Africa’s foremost recruitment partner and employer of choice. We aim to set new benchmarks for innovation, ethical practices, and leadership in the industry."
                        buttonText="Get Started Now"
                        imageSrc={visionImg}
                        reverse={true}
                    />

                </main>
            </div>
            <Footer />
        </>
    )
};

export default ElearningPage;
