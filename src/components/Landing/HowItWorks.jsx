import React from "react";
import student from '../../assets/pngs/student.png'
const HowItWorks = () => {
  return (
    <div className="py-10 px-6">
   
        How MayrahkeeAfrica Works For You?
      </h2>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <img
          src={student}
          alt="How it works"
          className="w-full h-auto rounded-lg shadow"
        />
        <div>
   <h2 className="text-center text-2xl font-bold mb-8">
          <ul className="space-y-4">
            <li>
              <h3 className="font-bold">1. Sign Up & Log In</h3>
              <p className="text-sm text-gray-600">
                Create an account or log in to your existing profile to access
                personalized course recommendations...
              </p>
            </li>
            <li>
              <h3 className="font-bold">2. Browse & Enroll in Courses</h3>
              <p className="text-sm text-gray-600">
                Explore various courses by topic or skill level...
              </p>
            </li>
            <li>
              <h3 className="font-bold">
                3. Engage in Live Classes & Access Materials
              </h3>
              <p className="text-sm text-gray-600">
                Join interactive classes led by instructors...
              </p>
            </li>
          </ul>
          <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
