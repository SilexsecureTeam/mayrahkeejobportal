import React, { useState } from "react";

const LocationSection = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-10 bg-white">
      {/* Map Section */}
      <div className="w-full lg:w-1/2 relative">
        {/* Loading Spinner */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
          </div>
        )}
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.939146802545!2d7.487049974913218!3d9.055269691671814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0bc4e816b571%3A0x2bd9bd048ba63e73!2sNICON%20Plaza!5e0!3m2!1sen!2sng!4v1696351330005!5m2!1sen!2sng"
          className="w-full h-64 lg:h-[400px] rounded-lg shadow-lg"
          onLoad={() => setMapLoaded(true)}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-1/2 mt-6 lg:mt-0 lg:pl-10 text-center lg:text-left">
        <h3 className="text-green-600 font-semibold text-lg uppercase">Our Location</h3>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">
          Connecting Near and Far
        </h2>
        <div className="mt-4">
          <h4 className="text-xl font-bold text-gray-800">Head Quarters</h4>
          <p className="text-gray-600 mt-2">
            6th Floor, NICON Plaza, 242 Muhammadu Buhari Way,
            <br />
            Central Business District, Abuja.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
