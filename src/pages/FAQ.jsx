import React, { useState } from "react";
import Navbar from '../components/Landing/Navbar'
import Footer from '../components/Landing/Footer'
import logo from '../assets/Mayrahkee_Africa_Logo_White.png'
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const questions = [
        "How does the product work?",
        "How does the product work?",
        "How does the product work?",
        "How does the product work?",
        "How does the product work?",
    ];

    return (
        <>
            <div className='relative max-w-[1200px] w-full mx-auto' >
                <Navbar />
                <div className="relative my-20 px-5 h-auto flex flex-col gap-3">

                    {/* Header */}
                    <header className="text-center py-10">
                        <small className="text-little text-green-600 font-medium">FAQ</small>
                        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
                        <p className="text-gray-600 mt-2">Have questions? We’re here to help.</p>
                    </header>

                    {/* Accordion Section */}
                    <div className="mx-auto w-full md:w-[500px]">
                        {questions?.map((question, index) => (
                            <div
                                key={index}
                                className="border-b py-4 cursor-pointer transition-all duration-400"
                                onClick={() => toggleAccordion(index)}
                            >
                                <div className="flex justify-between items-center gap-3">
                                    <p className="font-medium">{question}</p>
                                    <span className="w-5 h-5 font-medium rounded-full border border-black flex items-center justify-center leading-0">{openIndex === index ? "-" : "+"}</span>
                                </div>
                                {openIndex === index && (
                                    <p className="text-gray-600 mt-2">
                                        Figma ipsum component variant main layer. Variant pixel...
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Contact Section */}
                    <div className="bg-gray-50 mt-10 p-6 text-center">
                        <img src={logo} alt="image" className="w-14 my-2" />
                        <p className="font-semibold">Still have questions?</p>
                        <p>Can’t find some answers? Please chat with our friendly team.</p>
                        <button className="bg-black text-white py-2 px-6 mt-4 rounded-full">
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </>
    );
};

export default FAQ;
