import React from "react";

const SectionHeader = ({ title, subtitle, img, reads="" , time="" }) => {
  return (
    <div className="bg-gray-100  mt-20 py-6 flex flex-col items-center">
      <section className="max-w-[900px] w-[90%] flex flex-col items-center">
        <h1 className="text-center text-2xl md:text-4xl font-bold tracking-wide">{title}</h1>
        {subtitle && <p className="text-center text-gray-600 mt-2 max-w-[700px]">{subtitle}</p>}
        {reads !== "" && time !== "" &&<article className="w-max flex items-center justify-between mx-auto">

          <small className="mt-2 text-green-500 flex items-center border-r border-r-gray-400 px-3">
            <span className="mr-2 w-2 h-2 rounded-full bg-green-500"></span>
            {time && time}
          </small>
          <small className="mt-2 text-green-500 flex items-center px-3">
            <span className="mr-2 w-2 h-2 rounded-full bg-green-500"></span>
            {reads || 0} min read.
          </small>
        </article>}
      </section>
      {<figure className="w-full h-80 my-4">
        <img src={`${img ? img : "https://via.placeholder.com/150/000000/FFFFFF?text=Image+Not+Found"}`} alt="image" className="mb-4 w-full h-full object-cover" />
      </figure>}
    </div>
  );
};

export default SectionHeader;
