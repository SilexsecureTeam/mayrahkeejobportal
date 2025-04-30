import React, { useState } from "react";
import { FaImage } from "react-icons/fa"; // Make sure Heroicons is installed

const UploadSlider = ({ handleImageChange, image }) => {
  const [upload, setUpload] = useState("");

  const handleAttach = () => {
    if (upload) {
      setImage(upload);
      setUpload("");
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 px-2">
        Upload Slider
      </label>
      <small className="px-2 mb-2 text-sm text-gray-400 font-medium">
        File size should not exceed 1MB.
      </small>

      <div className="flex items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-600
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-green-50 file:text-green-700
            hover:file:bg-green-100"
        />
        <button
          onClick={handleAttach}
          className={`${
            upload ? "bg-green-600" : "bg-gray-400"
          } text-white px-4 py-2 rounded-md`}
          disabled={!upload}
        >
          {!upload ? "Attached" : "Attach"}
        </button>
      </div>

      {/* Preview container */}
      <div className="mt-4 bg-gray-200 h-60 rounded-lg flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt="Slider Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <FaImage className="w-16 h-16" />
            <span className="text-sm mt-2">No image selected</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSlider;
