import React from "react";

const ContentList = ({ items }) => {
  return (
    <ul className="list-disc pl-6 space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-gray-700">{item}</li>
      ))}
    </ul>
  );
};

export default ContentList;
