import React from "react";

const SectionHeader = ({ title, subtitle, img }) => {
  return (
    <div className="bg-gray-100 py-6">
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-center text-gray-600 mt-2">{subtitle}</p>}
      {img && <figure className="h-80 my-4">
        <img src={img} alt="image" className="rounded mb-4 w-full h-full object-cover" />
    </figure>}
    </div>
  );
};

export default SectionHeader;
