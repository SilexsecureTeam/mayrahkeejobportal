import React, { useState } from "react";

const LocationSection = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section className="flex flex-col md:flex-row items-start justify-between px-6 lg:px-20 py-10 bg-white">
      {/* Map Section */}
      <div className="w-full md:w-1/2 relative">
        {/* Loading Spinner */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
          </div>
        )}
        <div className="relative w-full h-64 md:h-[400px] rounded-lg shadow-lg overflow-hidden">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.939146802545!2d7.487049974913218!3d9.055269691671814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0bc4e816b571%3A0x2bd9bd048ba63e73!2sNICON%20Plaza!5e0!3m2!1sen!2sng!4v1696351330005!5m2!1sen!2sng"
            className="absolute inset-0 w-full h-full"
            onLoad={() => setMapLoaded(true)}
            allowFullScreen
            loading="lazy"
          ></iframe>
          {/* Custom Pop-Up (Location Indicator) */}
          <div className="absolute bg-white shadow-xl rounded-lg p-2 md:p-3 left-8 bottom-8 lg:bottom-16 w-36 md:w-44">
            <div className="relative">
              <h4 className="font-bold text-gray-800 text-xs md:text-sm">NICON Plaza</h4>
              <p className="text-[10px] md:text-xs text-gray-600 mt-1">
                6th Floor, 242 Muhammadu Buhari Way,
              </p>
            </div>
            {/* Small Pointer below pop-up */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-3 h-3 bg-white rotate-45 shadow-lg"></div>
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 mt-6 lg:mt-0 md:pl-10 text-left">
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
