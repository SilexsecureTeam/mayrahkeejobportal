import React, { useState } from "react";
import logo from "../../assets/svgs/main-logo.svg";
const LocationSection = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section className="mt-10 md:mt-20 flex flex-col md:flex-row items-start justify-between px-6 lg:px-20 py-10 bg-gray-100">
      {/* Map Section */}
      <div className="w-full md:w-[48%] relative rounded-2xl">
        {/* Loading Spinner */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
          </div>
        )}
        <div className="relative w-full h-64 lg:h-[400px] rounded-2xl shadow-lg overflow-hidden">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.939146802545!2d7.487049974913218!3d9.055269691671814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0bc4e816b571%3A0x2bd9bd048ba63e73!2sNICON%20Plaza!5e0!3m2!1sen!2sng!4v1696351330005!5m2!1sen!2sng"
            className="pointer-events-none absolute inset-0 w-full h-full"
            onLoad={() => setMapLoaded(true)}
            allowFullScreen
            loading="lazy"
          ></iframe>
          {/* Custom Popup (White Box) */}
          <div className="absolute bg-white shadow-lg rounded-2xl p-3 md:p-4 left-0 right-0 mx-auto top-8 w-72 md:w-[300px]">
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[15px] border-l-transparent border-r-transparent border-t-white"></div>
          <img src={logo} alt="logo" className="h-5 ml-[-2px]" />
            <h4 className="font-bold text-xs">Abuja, Nigeria</h4>
            <p className="text-xs font-medium text-gray-600 mt-1">
              Muhammadu Buhari Way
              Central Business District
            </p>
            <a
              href="https://www.google.com/maps?q=9.0556,7.4898"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-xs mt-2 inline-block"
            >
              Open Google Maps {">"}
            </a>
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="w-full md:w-[48%] mt-6 lg:mt-0 md:pl-10 py-10 text-left">
        <h3 className="text-green-600 font-semibold text-sm uppercase">Our Location</h3>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">
          Connecting Near and Far
        </h2>
        <div className="mt-4">
          <h4 className="text-xl font-bold text-gray-800">Head Quarters</h4>
          <p className="font-medium text-sm text-gray-600 mt-2">
            6th Floor, NICON Plaza, 242 Muhammadu Buhari Way,
            <br />
            Central Business District, Abuja.<br/>Nigeria.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
