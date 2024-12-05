import React from "react";
import {valuesData} from './landingData'
const OurValue = () => {
  return (
    <div className="py-10 px-6">
      <h2 className="text-center text-2xl font-bold mb-8">Our Values</h2>
      <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {valuesData?.map((value, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <img
              src={value?.image}
              alt={value.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{value?.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{value?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurValue;
