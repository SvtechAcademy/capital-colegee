import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const Banner2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [isDescriptionVisible, setDescriptionVisible] = useState({});
  const [showBahirDarCity, setShowBahirDarCity] = useState(false);
  const [bgColor, setBgColor] = useState("bg-gray-900");

  const toggleDescription = (index) => {
    setDescriptionVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.name || !formData.message) {
      setStatusMessage("Please fill out all fields.");
      return;
    }

    const mailtoLink = `mailto:svtechacademy@gmail.com?subject=Contact%20Message&body=${encodeURIComponent(formData.message)}`;
    window.location.href = mailtoLink;

    setFormData({ name: "", email: "", message: "" });
    setStatusMessage("Message sent successfully!");
  };

  const contactInfo = [
    {
      title: "Email",
      description: "Send us an email for inquiries or support. We are always here to assist you with your questions and requests.",
      link: "mailto:svtechacademy@gmail.com",
      icon: <AiOutlineMail size={30} />,
    },
    {
      title: "Phone",
      description: "Call us for immediate support. Our team is available to help you over the phone with urgent inquiries.",
      link: "tel:+251912345678",
      icon: <AiOutlinePhone size={30} />,
    },
    {
      title: "Website",
      description: "Visit our website to learn more about Capital College programs and services. Stay up to date with the latest updates.",
      link: "https://capital-colege.web.app",
      icon: <MdLocationOn size={30} />,
    },
    {
      title: "Facebook",
      description: "On Facebook, we share updates about the college, student achievements, events, and news. Join us for a deeper connection with the college.",
      link: "https://www.facebook.com/capitalcollege",
      icon: <FaFacebookF size={30} />,
    },
    {
      title: "Instagram",
      description: "Check out our Instagram for pictures, behind-the-scenes content, and insights into student life at Capital College.",
      link: "https://www.instagram.com/capitalcollege",
      icon: <FaInstagram size={30} />,
    },
    {
      title: "YouTube",
      description: "Subscribe to our YouTube channel for tutorials, student success stories, and educational content.",
      link: "https://www.youtube.com/@CapitalCollege",
      icon: <FaYoutube size={30} />,
    },
    {
      title: "TikTok",
      description: "Follow us on TikTok for fun and interactive educational content, events, and campus life.",
      link: "https://www.tiktok.com/@capitalcollege",
      icon: <FaTiktok size={30} />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setBgColor("bg-sky-900");
      } else {
        setBgColor("bg-gray-900");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={`${bgColor} text-white py-24`}>
      {/* First Full-Screen Section */}
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(/assets/hero.jpg)` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="flex items-center justify-center h-full text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-5xl font-extrabold leading-tight text-white"
            >
              Unlock Your Future at Capital College
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4 }}
              className="text-xl md:text-2xl text-white"
            >
              Join our programs and start your journey in IT and Web Development today!
            </motion.p>
            <motion.a
              href="https://capital-colege.web.app"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6 }}
              className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition duration-300"
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Contact and Location Section */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8 }}
        className="text-3xl font-bold text-center mb-12"
      >
        Connect with Us
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {contactInfo.map((info, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-blue-950 p-6 rounded-lg shadow-lg transition duration-300 cursor-pointer relative"
          >
            <button
              className="absolute top-4 left-4 text-white"
              onClick={() => toggleDescription(index)}
            >
              {isDescriptionVisible[index] ? (
                <AiOutlineUp size={24} />
              ) : (
                <AiOutlineDown size={24} />
              )}
            </button>

            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className="text-4xl">{info.icon}</span>
            </div>
            <motion.h3
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8 }}
              className="text-xl font-semibold mb-2"
            >
              {info.title}
            </motion.h3>

            {isDescriptionVisible[index] && (
              <div className="text-sm mt-4">
                <p>{info.description}</p>
                {info.link && (
                  <a
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline mt-4 block"
                  >
                    Go to {info.title}
                  </a>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Contact Form Section */}
      <div className="container py-12 md:py-24">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="text-3xl font-bold text-center mb-8"
        >
          Contact Capital College
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-6">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="bg-indigo-900 p-8 rounded-lg shadow-xl space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-semibold text-white">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows="5"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>

          {statusMessage && (
            <div className="mt-6 text-center text-lg font-semibold text-green-500">
              {statusMessage}
            </div>
          )}
        </div>
      </div>

      {/* Full Section for Location */}
      <section className="bg-blue-950 text-white py-24">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.2 }}
            className="text-3xl font-bold mb-6"
          >
            Location & Hours
          </motion.h2>

          <button
            onClick={() => setShowBahirDarCity(!showBahirDarCity)}
            className="bg-red-600 text-white px-6 py-3 rounded-full mb-6 hover:bg-red-700 transition duration-300"
          >
            {showBahirDarCity ? "Hide Bahir Dar Info" : "Show Bahir Dar Info"}
          </button>

          {showBahirDarCity && (
            <div className="bg-sky-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Welcome to Bahir Dar City</h3>
              <p className="text-lg">
                Bahir Dar is the capital city of the Amhara region in Ethiopia. Known for its stunning views of Lake Tana and the Blue Nile Falls, it is a vibrant city rich in history, culture, and education. Capital College is proud to be part of this amazing city.
              </p>
            </div>
          )}

          <div className="bg-green-0 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Location: Bahir Dar, Ethiopia</h3>
            <div className="text-lg space-y-4">
              <p><strong>Address:</strong> Capital College, Main Street, Bahir Dar, Ethiopia</p>
              <p><strong>Open Days:</strong> Monday to Saturday</p>
              <p><strong>Hours:</strong> 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Banner2;
