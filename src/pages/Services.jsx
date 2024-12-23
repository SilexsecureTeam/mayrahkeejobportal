import React from 'react';
import Navbar from '../components/Landing/Navbar';
import Footer from '../components/Landing/Footer';
import Banner from '../components/Landing/Banner';
import InfoSection from '../components/Landing/InfoSection';
import recruitmentImg from '../assets/pngs/about3.png'; // Placeholder image
import trainingImg from '../assets/pngs/about4.png'; // Placeholder image

const Services = () => {
    window.scrollTo(0, 0);

    return (
        <>
            <div className="relative max-w-[1400px] w-full mx-auto">
                <Navbar />
                <main className="relative my-24 px-5 flex flex-col gap-10">
                    <Banner 
                        title="Our Services" 
                        desc="Delivering excellence in recruitment, capacity building, and innovative solutions." 
                    />
                    
                    {/* Recruitment Section */}
                    <InfoSection
                        title="Recruitment"
                        description={
                            <>
                                <p>
                                    Our recruitment strategy and plans are properly defined and deployed to attract, hire, and onboard the right talents that complement our client’s (Employer) brand and culture proposition.
                                </p>
                                <p>
                                    At Mayrahkee Africa, we do not just find the best fit; we offer the full package. We are an end-to-end result-oriented service provider. We strive to harness the partnerships' full potential, increase capacity, productivity, growth, and sustainability through cost-effective strategies for all stakeholders in the value chain.
                                </p>
                                <h3 className="text-xl font-semibold mt-4">Our recruitment process includes:</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Detailed job analysis to ensure we understand the specific needs of your business.</li>
                                    <li>Candidate sourcing through our extensive database, local job boards, and partnerships with universities.</li>
                                    <li>Comprehensive candidate screening, including background checks, skill assessments, and cultural fit evaluations.</li>
                                </ul>
                                <h3 className="text-xl font-semibold mt-4">Our Packages:</h3>
                                <p>
                                    We offer five distinct packages: Basic, Mayrahkee Classic, Mayrahkee Plus, Mayrahkee Premium, and Mayrahkee Exclusive.
                                </p>
                                <p>
                                    The Mayrahkee Premium package provides dedicated HR support services such as training in value education, organizational behavior, and basic administrative skills.
                                </p>
                            </>
                        }
                        buttonText="Learn More"
                        imageSrc={recruitmentImg}
                        reverse={false}
                    />

                    {/* Capacity Building Section */}
                    <InfoSection
                        title="Capacity Building and Development"
                        description={
                            <>
                                <p>
                                    At Mayrahkee Africa, we are revolutionizing education through innovative e-learning solutions and hands-on physical training programs tailored to meet the needs of individuals, professionals, and organizations across Africa.
                                </p>
                                <p>
                                    Our E-learning offerings make knowledge accessible and flexible, while our physical learning programs deliver practical experiences for well-rounded skill development.
                                </p>
                                <h3 className="text-xl font-semibold mt-4">Our Services:</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Online Courses and Training</li>
                                    <li>Virtual Learning Platforms</li>
                                    <li>Custom Course Development</li>
                                    <li>E-learning Consultation Services</li>
                                    <li>Corporate Training and Upskilling</li>
                                </ul>
                            </>
                        }
                        buttonText="Explore Programs"
                        imageSrc={trainingImg}
                        reverse={true}
                    />
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Services;
