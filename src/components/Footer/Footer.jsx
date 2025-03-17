import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-sky-950 text-white py-6 font-bold">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 text-center md:text-left">
        {/* Navigation Links */}
        <div>
          <h3 className="font-bold text-lg">Quick Links</h3>
          <ul>
            <li><NavLink to="/" className="hover:text-blue-300">Home</NavLink></li>
            <li><NavLink to="/services" className="hover:text-blue-300">Services</NavLink></li>
            <li><NavLink to="/about" className="hover:text-blue-300">About Us</NavLink></li>
            <li><NavLink to="/team" className="hover:text-blue-300">Our Team</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-blue-300">Contact Us</NavLink></li>
          </ul>
        </div>
        
        {/* AI Support Section */}
        <div>
          <h3 className="font-bold text-lg">AI Support</h3>
          <ul>
            <li><NavLink to="/Chatbot" className="hover:text-blue-300">Chatbot</NavLink></li>
            <li><NavLink to="/Managment" className="hover:text-blue-300">Management</NavLink></li>
            <li><NavLink to="/Accounting" className="hover:text-blue-300">Accounting</NavLink></li>
            <li><NavLink to="/Nurssing" className="hover:text-blue-300">Nursing</NavLink></li>
          </ul>
        </div>
        
        {/* Social Media */}
        <div>
          <h1 className="font-bold text-lg ">Follow Us</h1>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <a href="https://facebook.com/svtechacademy" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 text-sm">&copy; 2025 Capital College. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;