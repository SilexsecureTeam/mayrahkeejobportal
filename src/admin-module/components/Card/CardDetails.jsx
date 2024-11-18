import React from "react";
import { Card } from "primereact/card";
import { FaLinkedin, FaGlobe, FaFileAlt } from "react-icons/fa";

const CardDetails = ({ title, description, details, socialMedia }) => {
  return (
    <Card className="shadow-lg">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-gray-800 text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        {details.map((detail, index) => (
          <div key={index} className="text-gray-800 mb-4">
            <strong>{detail.label}:</strong> {detail.value}
          </div>
        ))}
        {socialMedia.map((media, index) => (
          <div key={index} className="text-gray-800 mb-4">
            <strong>{media.label}:</strong>{" "}
            <a href={media.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 ">
              {media.icon}
            </a>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CardDetails;