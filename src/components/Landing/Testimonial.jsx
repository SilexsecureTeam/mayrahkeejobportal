import React, { useState } from "react";
import grid from "../../assets/pngs/grid.png";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import {testimonialsData} from "./LandingData"; // Import the JSON file

const Testimonial = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fadeDirection, setFadeDirection] = useState("fade-in"); 

    const handlePrev = () => {
        setFadeDirection("fade-out");
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
            );
            setFadeDirection("fade-in");
        }, 300); // Match the fade duration
    };

    const handleNext = () => {
        setFadeDirection("fade-out");
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
            );
            setFadeDirection("fade-in");
        }, 300); // Match the fade duration
    };

    const currentTestimonial = testimonialsData[currentIndex];

    return (
        <section className="w-full p-6">
            <div
                className="sticky top-28 flex flex-col md:flex-row gap-6 md:items-center md:justify-around py-2"
                style={{
                    backgroundImage: `linear-gradient(rgba(250,250,250,.5), rgba(250,250,250,.5)), url(${grid})`,
                    backgroundPosition: "center bottom",
                    backgroundSize: "100% 70%",
                    backgroundRepeat: "no-repeat",
                    backgroundBlendMode: "difference",
                }}
            >
                {/* Left Section (Static Content) */}
                <div className="max-w-[350px] md:pr-5">
                    <h3 className="text-xl font-medium">From our</h3>
                    <h3 className="text-3xl font-bold mb-4">community</h3>
                    <p className="text-gray-600 mb-4 max-w-80">"Here's what other subscribers have to say about Mayraykee Africa</p>
                    <div className="flex gap-2 items-center">
                        <button
                            onClick={handlePrev}
                            className="flex items-center justify-center p-2 border border-gray-500 rounded-md hover:shadow-md hover:z-3 transition-all duration-300"
                        >
                            <FaArrowLeftLong size="20" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="flex items-center justify-center p-2 border border-gray-500 rounded-md hover:shadow-md hover:z-3 transition-all duration-300"
                        >
                            <FaArrowRightLong size="20" />
                        </button>
                    </div>
                </div>

                {/* Right Section (Dynamic Content) */}
                <div
                    className={`sticky top-0 max-w-[350px] flex flex-col gap-2 transition-opacity duration-300 ${fadeDirection}`}
                >
                    <p className="text-xl font-medium">
                        <span
                            style={{ fontFamily: "Georgia" }}
                            className="text-[40px] font-extrabold text-green-600"
                        >
                            &#8220;
                        </span>
                        {currentTestimonial.description}
                    </p>
                    <article className="flex gap-2">
                        <img
                            className="w-10 h-10 rounded-full object-cover"
                            src={currentTestimonial.imageSrc}
                            alt={currentTestimonial.name}
                        />
                        <section>
                            <h6 className="font-semibold">{currentTestimonial.name}</h6>
                            <p className="text-xs text-gray-500">{currentTestimonial.role}</p>
                        </section>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
