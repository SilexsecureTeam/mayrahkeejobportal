// Footer.jsx
import React from "react";
import logo from '../../assets/pngs/mayrakee-icon.png'
import {TiSocialFacebookCircular, TiSocialInstagram} from 'react-icons/ti'
import {RiLinkedinBoxLine} from 'react-icons/ri'
const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4">
        {/* Logo and Company Info */}
        <div className="mb-6 md:mb-0">
          <img src={logo} alt="logo" className="w-32 md:w-48 my-2" />
          <a className="text-sm my-2" href="mailto:support@mayraykeeafrica.com">support@mayraykeeafrica.com</a>
          <a className="text-sm my-2" href="tel:+23480788748">+234(0)80 788 748</a>
          <p className="text-sm my-2">6th Flor NICON Plaza 242 Muhammadu Buhari Way, Central Business District, Abuja</p>
        </div>

        {/* Links Section */}
        <div className="md:ml-auto flex flex-col md:flex-row gap-8 text-sm">
          <div>
            <h2 className="font-semibold mb-2">Company</h2>
            <ul>
              <li className="mb-1"><a href="#about" className="hover:underline">About Us</a></li>
              <li className="mb-1"><a href="#team" className="hover:underline">FAQ</a></li>
              <li className="mb-1"><a href="#contact" className="hover:underline">Contact Us</a></li>
              <li className="mb-1"><a href="#contact" className="hover:underline">Careers</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Legal</h2>
            <ul>
              <li className="mb-1"><a href="#terms" className="hover:underline">Terms & Conditions</a></li>
              <li className="mb-1"><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
              <li className="mb-1"><a href="#faq" className="hover:underline">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" mt-6 border-t border-white pt-4 flex flex-wrap justify-center md:justify-between px-4">
      <p className="text-center text-sm">© 2024 Mayankee. All Rights Reserved.</p>
        {/* Social Media Links */}
        <div className="mt-6 md:mt-0 flex gap-4 text-white">
          <a href="#facebook" className="hover:scale-110 transition">
            <TiSocialFacebookCircular size="20" />
          </a>
          <a href="#twitter" className="hover:scale-110 transition">
          <TiSocialInstagram size="20" />
          </a>
          <a href="#linkedin" className="hover:scale-110 transition">
          <RiLinkedinBoxLine size="20" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
