import React, { useState } from "react";
import { IoIosArrowRoundForward, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";
import { FaGithub, FaTelegram, FaYoutube, FaTiktok } from "react-icons/fa";
import { IoCall, IoChatbubblesSharp } from "react-icons/io5";

// Animation Variant
export const FadeUp = (delay) => ({
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, duration: 0.5, delay, ease: "easeInOut" },
  },
});

// Hero Sections Data (Image + Video)
const heroSections = [
  {
    id: 1,
    title: "Welcome",
    subtitle: "Capital College of Business and Health Science",
    type: "image",
    src: "/assets/herro1.jpg", // ✅ Correct path
  },
  {
    id: 2,
    title: "Empower Your Future in",
    subtitle: "Business and Health Science",
    type: "video",
    src: "/assets/video11.mp4", // ✅ Correct path
  },
  {
    id: 3,
    title: "Learn, Grow, and Succeed with",
    subtitle: "Accounting High Education Programs",
    type: "image",
    src: "/assets/acconting.png", // ✅ Correct path
  },
  {
    id: 4,
    title: "Get Hands-On Training in",
    subtitle: "Our Advanced Labs and Facilities",
    type: "image",
    src: "/assets/studen.jpg", // ✅ Correct path
  },
];

// Testimonials Data
const testimonials = [
  {
    id: 1,
    name: "Serkalm Sisay",
    role: "at samivip",
    text: "Management Level 4 Highly Completed!!",
  },
  {
    id: 2,
    name: "Biniyam Molla",
    role: "at DevSolutions",
    text: "Accounting Bachelor's Degree has propelled us to the next level. Highly Completed!",
  },
];

// Programs Data
const programs = {
  degreePrograms: [
    { name: "Nursing", description: "Become a professional nurse with our advanced nursing program." },
    { name: "Medical Laboratory", description: "Learn the latest techniques in medical laboratory science." },
    { name: "Information Technology", description: "Master IT skills for the digital age." },
    { name: "Management", description: "Develop leadership and management expertise." },
    { name: "Accounting and Finance", description: "Grow your career in accounting and finance." },
  ],
  tvetPrograms: [
    { name: "Level IV Nurse", description: "Advanced training for nursing professionals." },
    { name: "Level IV Pharmacy", description: "Specialized training in pharmaceutical sciences." },
    { name: "Level IV Medical Lab", description: "Hands-on training in medical laboratory techniques." },
  ],
};

// New Post Section
const postSection = [
  {
    id: 1,
    title: "Our Latest Achievements",
    subtitle: "Witness the success we've achieved in different fields",
    type: "image",
    src: "/assets/hero1.jpeg", // ✅ Correct path
  },
  {
    id: 2,
    title: "Take a Tour of Our Campus",
    subtitle: "Explore the vibrant atmosphere and advanced facilities",
    type: "video",
    src: "/assets/video11.mp4", // ✅ Correct path
  },
];

const Hero = () => {
  const [openDegree, setOpenDegree] = useState(false);
  const [openTVET, setOpenTVET] = useState(false);

  return (
    <section className="bg-gradient-to-r from-blue-950 to-sky-950 text-white overflow-hidden relative font-sans">
      {/* Hero Sections */}
      {heroSections.map((section, index) => (
        <motion.div
          key={section.id}
          className="relative w-full h-screen flex items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          {/* Background (Image or Video) */}
          {section.type === "image" ? (
            <img
              src={section.src}
              alt="/assets/hero6.jpg"
              className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
            />
          ) : (
            <video
              src={section.src}
              autoPlay
              loop
              muted
              className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
            />
          )}

          {/* Content */}
          <div className="relative z-10 text-center max-w-4xl px-4">
            <motion.h1
              variants={FadeUp(0.6)}
              initial="initial"
              whileInView="animate"
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              {section.title}{" "}
              <span className="text-yellow-400">{section.subtitle}</span>
            </motion.h1>
            <motion.div
              variants={FadeUp(0.8)}
              initial="initial"
              whileInView="animate"
              className="mt-6"
            >
              <a
                href="./Signup"
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Apply now
                <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* Full-Screen Programs Section */}
      <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-sky-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            Our Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Degree Programs Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setOpenDegree(!openDegree)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-blue-950 mb-6">Degree Programs</h3>
                {openDegree ? (
                  <IoIosArrowUp className="text-blue-950 text-2xl" />
                ) : (
                  <IoIosArrowDown className="text-blue-950 text-2xl" />
                )}
              </div>
              {openDegree && (
                <ul className="space-y-4">
                  {programs.degreePrograms.map((program, index) => (
                    <li key={index} className="text-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{program.name}</span>
                        <div className="flex gap-4">
                          <a
                            href="tel:+25177778886"
                            className="text-green-600 hover:text-green-700"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <IoCall className="text-xl" />
                          </a>
                          <a
                            href="sms:+25177778886"
                            className="text-blue-600 hover:text-blue-700"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <IoChatbubblesSharp className="text-xl" />
                          </a>
                          <a
                            href="./Signup"
                            className="text-yellow-600 hover:text-yellow-700"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <IoIosArrowRoundForward className="text-xl" />
                          </a>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{program.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            {/* TVET Programs Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setOpenTVET(!openTVET)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-blue-950 mb-6">TVET Programs</h3>
                {openTVET ? (
                  <IoIosArrowUp className="text-blue-950 text-2xl" />
                ) : (
                  <IoIosArrowDown className="text-blue-950 text-2xl" />
                )}
              </div>
              {openTVET && (
                <ul className="space-y-4">
                  {programs.tvetPrograms.map((program, index) => (
                    <li key={index} className="text-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{program.name}</span>
                        <div className="flex gap-4">
                          <a
                            href="tel:+25177778886"
                            className="text-green-600 hover:text-green-700"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <IoCall className="text-xl" />
                          </a>
                          <a
                            href="sms:+25177778886"
                            className="text-blue-600 hover:text-blue-700"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <IoChatbubblesSharp className="text-xl" />
                          </a>
                          <a
                            href="./Signup"
                            className="text-yellow-600 hover:text-yellow-700"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <IoIosArrowRoundForward className="text-xl" />
                          </a>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{program.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Post Section (New Section with Image/Video) */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl text-center font-bold mb-10 text-white">Latest Updates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {postSection.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-96 flex items-center justify-center rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                {section.type === "image" ? (
                  <img
                    src={section.src}
                    alt="Post Background"
                    className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
                  />
                ) : (
                  <video
                    src={section.src}
                    autoPlay
                    loop
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
                  />
                )}
                <div className="relative z-10 text-center text-white">
                  <h3 className="text-2xl font-semibold">{section.title}</h3>
                  <p className="text-lg mt-2">{section.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;