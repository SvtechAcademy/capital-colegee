import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "react-feather"; // Icons for expand/collapse

const ServicesPage = () => {
  const [selectedBg, setSelectedBg] = useState("/assets/hero6.jpg"); // Default background
  const [expandedCard, setExpandedCard] = useState(null); // Track expanded card

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const handleCardClick = (bgUrl, index) => {
    setSelectedBg(bgUrl); // Change background on click
    setExpandedCard(expandedCard === index ? null : index); // Toggle expand/collapse
  };

  const services = [
    {
      title: "Academic Programs",
      description:
        "We offer a variety of degree and TVET programs designed to meet the needs of students and industry demands.",
      items: ["Nursing", "Medical Laboratory", "Information Technology", "Management", "Accounting and Finance"],
      bgUrl: "/assets/hero2.png",
    },
    {
      title: "Student Support",
      description:
        "Our dedicated support team provides academic advising, counseling, and mentorship to help students succeed.",
      items: ["Academic Advising", "Career Counseling", "Mental Health Support"],
      bgUrl: "/assets/herro1.jpg",
    },
    {
      title: "Career Services",
      description:
        "We help students prepare for their careers through internships, job placements, and professional development workshops.",
      items: ["Internship Opportunities", "Job Placement Assistance", "Resume Building Workshops"],
      bgUrl: "/assets/heroo.png",
    },
    {
      title: "Library and Resources",
      description:
        "Access a wide range of academic resources, including books, journals, and online databases.",
      items: ["Extensive Book Collection", "Online Databases", "Study Spaces"],
      bgUrl: "/assets/herro1.jpg",
    },
    {
      title: "Extracurricular Activities",
      description:
        "Participate in clubs, sports, and cultural activities to enhance your college experience.",
      items: ["Student Clubs", "Sports Teams", "Cultural Events"],
      bgUrl: "/assets/heroo.png",
    },
    {
      title: "Alumni Network",
      description:
        "Stay connected with our alumni network for mentorship, networking, and career opportunities.",
      items: ["Mentorship Programs", "Networking Events", "Career Opportunities"],
      bgUrl: "/assets/hero2.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${selectedBg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center text-white"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl font-bold mb-4">
              Our Services
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl mb-8">
              Explore the wide range of services we offer to support your academic and professional journey.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.h2
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-3xl font-bold text-center mb-8"
        >
          What We Offer
        </motion.h2>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-sky-950 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-2 transition-transform cursor-pointer"
              onClick={() => handleCardClick(service.bgUrl, index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold mb-4 text-white">{service.title}</h3>
                {expandedCard === index ? (
                  <ChevronUp className="text-white" />
                ) : (
                  <ChevronDown className="text-white" />
                )}
              </div>
              {expandedCard === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white">{service.description}</p>
                  <ul className="list-disc list-inside mt-4 text-white">
                    {service.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Call-to-Action Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="bg-blue-600 py-12"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Us?</h2>
          <p className="text-xl text-white mb-8">
            Explore our programs and services to start your journey with us.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/signup")}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-all"
          >
            Sign Up Today
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ServicesPage;