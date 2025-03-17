import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { motion } from "framer-motion";

const Subscribe = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [colors, setColors] = useState({}); // Track background colors for all sections and cards

  // Handle the button click and redirect to YouTube
  const handleButtonClick = () => {
    setButtonClicked(!buttonClicked);
    window.location.href = "https://www.youtube.com/@Samivip1212"; // Redirect to YouTube
  };

  // Handle click to change background color for any section or card
  const handleClick = (id) => {
    setColors((prevColors) => ({
      ...prevColors,
      [id]: prevColors[id] === "bg-blue-950" ? "bg-sky-900" : "bg-sky-950", // Toggle between colors
    }));
  };

  return (
    <section className="relative">
      {/* Subscribe Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`py-24 md:py-48 text-center text-white ${
          colors["subscribe"] || "bg-gradient-to-r from-blue-500 to-sky-700" // Default or clicked background color
        } w-full transition-all duration-500`}
        onClick={() => handleClick("subscribe")} // Handle click for this section
      >
        {/* Blue-Black Background Card without Image */}
        <div className="bg-sky-900 max-w-screen-xl mx-auto p-8 rounded-lg shadow-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col justify-center z-10"
          >
            <div className="space-y-4 lg:max-w-[430px] mx-auto">
              <h1 className="text-4xl font-bold !leading-snug text-white">
                Join 450K+ Learners on a Journey to Business and Science College
              </h1>
              <p className="text-lg text-yellow-600 font-bold">
                Become part of a growing community of learners who are gaining
                Business and Science College to be this Global Technology.
              </p>

              <motion.button
                onClick={handleButtonClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mt-8 inline-flex items-center gap-4 group px-6 py-3 rounded-lg transition-all duration-300 ${
                  buttonClicked ? "bg-blue-950 hover:bg-black" : "bg-green-600 hover:bg-blue-700"
                }`}
              >
                <span className="text-white font-semibold">Subscribe Now</span>
                <FaBell className="group-hover:animate-bounce group-hover:text-lg duration-200 text-white" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Team Cards Section */}
      <div className="container py-12 text-center w-full max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Team Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`rounded-xl shadow-lg p-6 text-center hover:scale-105 transform transition duration-300 ease-in-out ${
              colors["card1"] || "bg-sky-900" // Default or clicked background color
            }`}
            onClick={() => handleClick("card1")} // Handle click for this card
          >
            <img
              src="/assets/managing-director.jpg"
              alt="Amdemichael Getahun"
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2 text-white">Ato Amdemichael Getahun</h3>
            <p className="text-white text-lg">Managing Director</p>
            <p className="mt-4 text-gray-200">
              Ato Amdemichael is an experienced business leader with a passion for innovation and growth. He has been instrumental in driving the success of our company by fostering a culture of collaboration and excellence.
            </p>
            <div className="mt-4 space-x-2">
              <a href="tel:25197778886" className="px-4 py-2 bg-blue-600 text-white rounded-full">Call</a>
              <a href="sms:25197778886" className="px-4 py-2 bg-green-600 text-white rounded-full">SMS</a>
            </div>
          </motion.div>

          {/* Team Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`rounded-xl shadow-lg p-6 text-center hover:scale-105 transform transition duration-300 ease-in-out ${
              colors["card2"] || "bg-sky-900" // Default or clicked background color
            }`}
            onClick={() => handleClick("card2")} // Handle click for this card
          >
            <img
              src="/assets/des-coordinator.jpg"
              alt="Desalegn Eshetie"
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2 text-white">Desalegn Eshetie</h3>
            <p className="text-white text-lg">Business Program Coordinator</p>
            <p className="mt-4 text-gray-200">
              Desalegn has over 10 years of experience in managing business programs. He ensures that our training programs are up-to-date with industry standards and that students gain the skills they need to succeed in their careers.
            </p>
            <div className="mt-4 space-x-2">
              <a href="tel:25197778886" className="px-4 py-2 bg-blue-600 text-white rounded-full">Call</a>
              <a href="sms:+25197778886" className="px-4 py-2 bg-green-600 text-white rounded-full">SMS</a>
            </div>
          </motion.div>

          {/* Team Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`rounded-xl shadow-lg p-6 text-center hover:scale-105 transform transition duration-300 ease-in-out ${
              colors["card3"] || "bg-sky-900" // Default or clicked background color
            }`}
            onClick={() => handleClick("card3")} // Handle click for this card
          >
            <img
              src="/assets/nurs-coordinator.jpg"
              alt="Nursing Program Coordinator"
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2 text-white">Nursing</h3>
            <p className="text-white text-lg">Nursing Program Coordinator</p>
            <p className="mt-4 text-gray-200">
              Our Nursing Program Coordinator brings a wealth of experience in healthcare training. They focus on creating a curriculum that blends theoretical knowledge with practical skills to prepare students for real-world challenges.
            </p>
            <div className="mt-4 space-x-2">
              <a href="tel:+251" className="px-4 py-2 bg-blue-600 text-white rounded-full">Call</a>
              <a href="sms:+251" className="px-4 py-2 bg-green-600 text-white rounded-full">SMS</a>
            </div>
          </motion.div>

          {/* Additional Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={`rounded-xl shadow-lg p-6 text-center hover:scale-105 transform transition duration-300 ease-in-out ${
              colors["card4"] || "bg-sky-900" // Default or clicked background color
            }`}
            onClick={() => handleClick("card4")} // Handle click for this card
          >
            <img
              src="/assets/it.jpg"
              alt="Abrham Tadesse"
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2 text-white">Abrham Tadesse</h3>
            <p className="text-white text-lg">IT Program Coordinator</p>
            <p className="mt-4 text-gray-200">
              Abrham is an experienced IT Program Coordinator, overseeing the management of the IT curriculum and supporting students in their journey to become IT professionals.
            </p>
            <div className="mt-4 space-x-2">
              <a href="tel:+25197778886" className="px-4 py-2 bg-blue-600 text-white rounded-full">Call</a>
              <a href="sms:+25197778886" className="px-4 py-2 bg-green-600 text-white rounded-full">SMS</a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-Screen Section 1 with Image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`relative py-24 md:py-48 text-center text-white max-w-screen-xl mx-auto overflow-hidden ${
          colors["section1"] || "bg-gradient-to-r from-blue-500 to-sky-700" // Default or clicked background color
        }`}
        onClick={() => handleClick("section1")} // Handle click for this section
      >
        {/* Background Image */}
        <motion.img
          src="/assets/hero1.jpeg" // Replace with your image path
          alt="Full-Screen Section 1 Background"
          className="absolute top-0 left-0 w-full h-full object-cover brightness-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-950/50 to-sky-950/50"></div>
        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-6">Learn, Grow, and Succeed with</h2>
          <p className="text-lg mb-8">Accounting High Education Programs</p>
        </div>
      </motion.div>

      {/* Full-Screen Section 2 with Image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`relative py-24 md:py-48 text-center text-white max-w-screen-xl mx-auto overflow-hidden ${
          colors["section2"] || "bg-gradient-to-b from-[#1e2a47] to-[#283148]" // Default or clicked background color
        }`}
        onClick={() => handleClick("section2")} // Handle click for this section
      >
        {/* Background Image */}
        <motion.img
          src="/assets/hero2.png" // Replace with your image path
          alt="Full-Screen Section 2 Background"
          className="absolute top-0 left-0 w-full h-full object-cover brightness-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1e2a47]/50 to-[#283148]/50"></div>
        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-6">Get Hands-On Training in</h2>
          <p className="text-lg mb-8">Our Advanced Labs and Facilities.</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Subscribe;