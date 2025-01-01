import React from "react";

export default function ToggleSwitch({ isOn, onToggle }) {
  return (
    <div
      className={`relative w-14 h-8 rounded-full p-1 cursor-pointer transition-all duration-300 ${
        isOn ? "bg-green-500" : "bg-gray-400"
      }`}
      onClick={onToggle}
    >
      <div
        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
}