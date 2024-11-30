import React from "react";
import img from '../../assets/pngs/student.png';
const MissionSection = () => {
  return (
    <section className="max-w-screen-xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="md:w-1/2">
          <img src={img} alt="Handshake" className="rounded-md shadow" />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
          <p className="text-gray-600 mb-4">
            Our mission is to become Africa’s most trusted and comprehensive online platform for recruitment.
          </p>
          <button className="bg-black text-white px-6 py-2 rounded">Get Started Now</button>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
