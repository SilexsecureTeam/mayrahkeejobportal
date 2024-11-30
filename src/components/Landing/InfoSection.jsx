import React from "react";

const InfoSection = ({ title, description, buttonText, imageSrc, reverse }) => {
  return (
    <section className="max-w-screen-xl mx-auto p-6">
      <div
        className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-6 items-center`}
      >
        <div className="md:w-1/2">
          <img src={imageSrc} alt={title} className="rounded-md shadow" />
        </div>
        <div className="md:w-1/2 flex flex-col">
          <h3 className="text-2xl font-semibold mb-4">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          {buttonText && (
            <button className="bg-black text-white px-6 py-2 rounded-full">{buttonText}</button>
          )}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
