import React from 'react';
import Navbar from '../components/Landing/Navbar';
import Footer from '../components/Landing/Footer';
const Services = () => {
  return (
    <>
            <div className="relative max-w-[1400px] w-full mx-auto">
                <Navbar />
                <main className="relative my-24 px-5 h-auto flex flex-col gap-5">
                   
    <div className="bg-gray-100 text-gray-800">
      {/* Recruitment Section */}
      <section className="py-10 px-5 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Recruitment</h2>
        <p className="text-lg mb-4">
          Our recruitment strategy and plans are properly defined and deployed to attract, hire, and onboard the right talents that complement our client’s (Employer) brand and culture proposition.
        </p>
        <p className="text-lg mb-4">
          At Mayrahkee Africa, we do not just find the best fit; we offer the full package. We are an end-to-end result-oriented service provider. We strive to harness the partnerships' full potential, increase capacity, productivity, growth, and sustainability through cost-effective strategies for all stakeholders in the value chain.
        </p>
        <h3 className="text-xl font-semibold mb-3">Our recruitment process includes:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Detailed job analysis to ensure we understand the specific needs of your business.</li>
          <li>Candidate sourcing through our extensive database, local job boards, and partnerships with universities.</li>
          <li>Comprehensive candidate screening, including background checks, skill assessments, and cultural fit evaluations.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-6 mb-3">Our Packages:</h3>
        <p className="text-lg mb-4">
          We offer our clients (Employers) five (5) distinct packages: Basic, Mayrahkee Classic, Mayrahkee Plus, Mayrahkee Premium, and Mayrahkee Exclusive.
        </p>
        <p className="text-lg">
          The Mayrahkee Premium package provides dedicated HR support services such as training in value education, organizational behavior, and basic administrative skills.
        </p>
      </section>

      {/* Capacity Building and Development Section */}
      <section className="py-10 px-5 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Capacity Building and Development</h2>
        <p className="text-lg mb-4">
          At Mayrahkee Africa, we are revolutionizing education through innovative e-learning solutions and hands-on physical training programs tailored to meet the needs of individuals, professionals, and organizations across Africa.
        </p>
        <p className="text-lg mb-4">
          Our E-learning offerings make knowledge accessible and flexible, while our physical learning programs deliver practical experiences for well-rounded skill development.
        </p>
        <h3 className="text-xl font-semibold mb-3">Our Services:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Online Courses and Training</li>
          <li>Virtual Learning Platforms</li>
          <li>Custom Course Development</li>
          <li>E-learning Consultation Services</li>
          <li>Corporate Training and Upskilling</li>
        </ul>
      </section>
    </div>
                  </main>
            </div>
            <Footer />
        </>
  );
};

export default Services;
