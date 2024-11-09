import React from "react";

const HelpCenter = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-white p-4 flex justify-between items-center shadow-md">
        <img src="/path-to-logo.png" alt="Mayrahkee Logo" className="h-10" />
        <nav className="flex items-center space-x-4">
          <a href="/" className="text-gray-700 hover:text-green-600">
            Home
          </a>
          <a href="/about" className="text-gray-700 hover:text-green-600">
            About
          </a>
          <a href="/contact" className="text-gray-700 hover:text-green-600">
            Contact
          </a>
        </nav>
      </header>

      {/* Map Section */}
      <div className="relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=..."
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Location Map"
          className="w-full"
        ></iframe>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-100 py-10 px-6 text-center grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <div className="text-blue-500 text-3xl mb-2">📍</div>
          <h3 className="font-semibold text-gray-700">Address</h3>
          <p>6th Floor, NICON Plaza, Abuja</p>
        </div>
        <div>
          <div className="text-blue-500 text-3xl mb-2">📞</div>
          <h3 className="font-semibold text-gray-700">Call Us</h3>
          <p>+234(0)80 788 74748</p>
        </div>
        <div>
          <div className="text-blue-500 text-3xl mb-2">✉️</div>
          <h3 className="font-semibold text-gray-700">Email</h3>
          <p>support@mayrahkeeafrica.com</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-10 px-6 bg-white max-w-lg mx-auto shadow-md">
        <h3 className="text-xl font-semibold mb-6">Leave A Message</h3>
        <form className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Name"
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-1/2 p-2 border rounded"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Comment"
            rows="4"
            className="w-full p-2 border rounded"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Recruiting Section */}
      <div className="py-8 bg-blue-100 text-center mt-6">
        <h3 className="text-lg font-semibold mb-2">Recruiting?</h3>
        <p className="mb-4">Advertise your jobs to millions of monthly users...</p>
        <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
          Start Recruiting Now
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-6 mt-6">
        <div className="max-w-4xl mx-auto px-4 text-center md:text-left flex flex-col md:flex-row justify-between">
          <div>
            <h4 className="font-bold text-lg mb-2">Mayrahkee</h4>
            <p>Call us: +234(0)80 788 74748</p>
          </div>
          <div className="mt-4 md:mt-0">
            <h4 className="font-bold text-lg mb-2">About us</h4>
            <ul>
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpCenter;
