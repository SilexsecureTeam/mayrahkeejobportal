import { useState } from "react";
import telephone from '../assets/smartphone.jpg'
import email from '../assets/email.jpg'
import location from '../assets/image-address.jpg'
const HelpCenter = () => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="font-sans">
      {/* Map Section */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 opacity-75">
            <span className="text-xl font-semibold">Loading...</span>
          </div>
        )}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.902209623298!2d7.492578774728237!3d9.066242988074365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0aacaa3e08c1%3A0xd8f86cb7f35f8c5a!2sNICON%20Plaza%2C%20Abuja!5e0!3m2!1sen!2sng!4v1699588764189!5m2!1sen!2sng"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Location Map"
          className="w-full"
          onLoad={handleLoad}
        ></iframe>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-100 py-10 px-6 text-center grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <div className="text-blue-500 text-3xl my-2"><img src={location} width="50" /></div>
          <h3 className="font-semibold text-black">Address</h3>
          <p className="text-gray-500 font-bold">6th Floor, NICON Plaza 242 Muhammadu Buhari Way, Central Business District, Abuja.</p>
        </div>
        <div>
          <div className="text-blue-500 text-3xl my-2"><img src={telephone} width="50" /></div>
          <h3 className="font-semibold text-black">Call Us</h3>
          <p className="text-gray-500 font-bold">+234(0)80 788 74748</p>
        </div>
        <div>
          <div className="text-blue-500 text-3xl my-2"><img src={email} width="50" /></div>
          <h3 className="font-semibold text-gray-700">Email</h3>
          <p className="text-gray-500 font-bold">support@mayrahkeeafrica.com</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-10 px-6 bg-white w-[95%] border rounded sm:max-w-lg mx-auto shadow-md">
        <h3 className="text-xl font-semibold mb-6">Leave A Message</h3>
        <form className="space-y-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <input
              type="text"
              placeholder="Name"
              className="bg-green-50 w-full md:w-1/2 p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-green-50 w-full md:w-1/2 p-2 border rounded"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="bg-green-50 w-full p-2 border rounded"
          />
          <textarea
            placeholder="Comment"
            rows="4"
            className="bg-green-50 w-full p-2 border rounded"
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 text-white py-3 px-8 rounded hover:bg-green-700"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Recruiting Section */}
      <div className="w-[95%] mx-auto p-8 bg-blue-100 mt-6 border rounded">
        <h3 className="text-xl text-gray-800 font-semibold mb-2">Recruiting?</h3>
        <p className="text-gray-600 mb-4">Advertise your jobs to millions of monthly users and search 15.8 million CVs in our database.</p>
        <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
          Start Recruiting Now
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-6 mt-6">
        <div className="max-w-4xl px-4 flex flex-col md:flex-row justify-between gap-2">
          <div>
            <h4 className="font-bold text-lg mb-2">Mayrahkee</h4>
            <p>Call us: +234(0)80 788 74748</p>
<p>6th Floor, NICON Plaza 242 Muhammadu Buhari Way,Central Business District, Abuja.</p>
<a href="mailto:support@mayrahkeeafrica.com" className="text-inherit no-underline">support@mayrahkeeafrica.com</a>
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
<li>
                <a href="/faq" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
<li>
                <a href="/faq" className="hover:underline">
                  Blog
                </a>
              </li>
<li>
                <a href="/faq" className="hover:underline">
                  Contact Us
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
