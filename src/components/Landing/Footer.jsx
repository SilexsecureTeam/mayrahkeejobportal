// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-6">
      <div className="container flex flex-col md:flex-row justify-between items-start md:items-center px-4">
        {/* Logo and Company Info */}
        <div className="mb-6 md:mb-0">
          <h1 className="text-xl font-bold mb-2">Mayankee</h1>
          <p className="text-sm">
            Address goes here. <br />
            Some description text can also go here.
          </p>
        </div>

        {/* Links Section */}
        <div className="bg-blackmd:ml-auto flex flex-col md:flex-row gap-8 text-sm">
          <div>
            <h2 className="font-semibold mb-2">Company</h2>
            <ul>
              <li className="mb-1"><a href="#about" className="hover:underline">About Us</a></li>
              <li className="mb-1"><a href="#team" className="hover:underline">Our Team</a></li>
              <li className="mb-1"><a href="#contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Support</h2>
            <ul>
              <li className="mb-1"><a href="#faq" className="hover:underline">FAQ</a></li>
              <li className="mb-1"><a href="#terms" className="hover:underline">Terms & Conditions</a></li>
              <li className="mb-1"><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-6 md:mt-0 flex gap-4">
          <a href="#facebook" className="hover:scale-110 transition">
            <i className="fab fa-facebook-f text-xl"></i>
          </a>
          <a href="#twitter" className="hover:scale-110 transition">
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a href="#linkedin" className="hover:scale-110 transition">
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
        </div>
      </div>
      <div className="text-center text-sm mt-6 border-t border-green-700 pt-4">
        © 2024 Mayankee. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
