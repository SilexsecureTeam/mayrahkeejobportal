import React from "react";

const ContactInfo = () => {
  return (
    <div className="bg-gray-100 p-4 mt-8">
      <h2 className="text-lg font-bold">Contact Us</h2>
      <p>Email: <a href="mailto:support@mayrahkee.com" className="text-green-500">support@mayrahkee.com</a></p>
      <p>Phone: <a href="tel:+2348037837414" className="text-green-500">+2348037837414</a></p>
      <p>Address: 6th Floor, NICON Plaza, 242 Muhammadu Buhari Way, Central Business District, Abuja</p>
    </div>
  );
};

export default ContactInfo;
