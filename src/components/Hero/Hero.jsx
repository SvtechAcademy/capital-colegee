import React, { useState } from "react";
import { IoIosArrowRoundForward, IoIosArrowBack, IoIosArrowForward, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";
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

// Programs Data with Images, Videos, and Background Colors
const programsData = [
  {
    id: 1,
    title: " College of Business and Health Science",
    description: "Empower Your Future in Business and Health Science.",
    type: "image",
    src: "/assets/staf.png",
    bgColor: "bg-blue-900",
  },
  {
    id: 2,
    title: "College of Business and Health Science",
    description: "Become a professional nurse with our advanced nursing program.",
    type: "video",
    src: "/assets/Nursing skill lab.mp4",
    bgColor: "bg-blue-900",
  },
  {
    id: 3,
    title: "College of Business and Health Science",
    description: "Learn the latest techniques in medical laboratory science.",
    type: "video",
    src: "/assets/medical setup.mp4",
    bgColor: "bg-green-900",
  },
  {
    id: 4,
    title: "College of Business and Health Science",
    description: "Develop leadership and management expertise.",
    type: "image",
    src: "/assets/herro1.jpg",
    bgColor: "bg-purple-900",
  },
  {
    id: 5,
    title: "College of Business and Health Science",
    description: "Information Technolog  skills for the digital age.",
    type: "video",
    src: "/assets/IT Lab.mp4",
    bgColor: "bg-orange-900",
  },
  {
    id: 6,
    title: "College of Business and Health Science",
    description: "Grow your career in accounting and finance.",
    type: "image",
    src: "/assets/Oaccontin.jpg",
    bgColor: "bg-red-900",
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
    src: "/assets/hero1.jpeg",
  },
  {
    id: 2,
    title: "Take a Tour of Our Campus",
    subtitle: "Explore the vibrant atmosphere and advanced facilities",
    type: "video",
    src: "/assets/video11.mp4",
  },
];

const sectionsAbove = [
  {
    id: 1,
    title: " The Accounting & Finance High Education Programs is avilable for you.",
    description: "Discover why we are the best choice for your education.",
    type: "video",
    src: "/assets/video11.mp4",
    bgImage: "bg-[url('/assets/acou.jpg')] bg-cover bg-center",
  },
  {
    id: 2,
    title: "The information Technology High Education Programs is avilable for you",
    description: "We are committed to providing quality education and training.",
    bgColor: "bg-green-950",
    bgImage: "bg-[url('/assets/herocon.png')] bg-cover bg-center",
  },
  {
    id: 3,
    title: " The Medical Laboratory & Nursing High Education Programs is avilable for you",
    description: "To be a leading institution in education and innovation.",
    bgColor: "bg-purple-950",
    bgImage: "bg-[url('/assets/herro8.png')] bg-cover bg-center",
  },
  {
    id: 4,
    title: " The Management High Education Programs is avilable for you",
    description: "To be a leading institution in education and innovation.",
    bgColor: "bg-purple-950",
    bgImage: "bg-[url('/assets/herro1.jpg')] bg-cover bg-center",
  },
];

const sectionsBelow = [
  {
    id: 1,
    title: "Student Success Stories",
    description: "Hear from our students about their journey and achievements.",
    bgColor: "bg-orange-950",
    bgImage: "bg-[url('/assets/studen.jpg')] bg-cover bg-center",
  },
  
];

// Stats Data
const statsData = [
  {
    id: 1,
    title: "Current Students",
    value: "5,000+",
    description: "Enrolled in various programs.",
    icon: "👩‍🎓",
  },
  {
    id: 2,
    title: "Available Programs",
    value: "50+",
    description: "Degree and TVET programs.",
    icon: "📚",
  },
  {
    id: 3,
    title: "Satisfaction Rate",
    value: "95%",
    description: "Student satisfaction rate.",
    icon: "😊",
  },
  {
    id: 4,
    title: "Graduation Rate",
    value: "90%",
    description: "Successful graduates each year.",
    icon: "🎓",
  },
  {
    id: 5,
    title: "Faculty Members",
    value: "300+",
    description: "Experienced and qualified staff.",
    icon: "👨‍🏫",
  },
  {
    id: 6,
    title: "Alumni Network",
    value: "20,000+",
    description: "Strong global alumni community.",
    icon: "🌍",
  },
];

// Explore Programs Component
const ExplorePrograms = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % programsData.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? programsData.length - 1 : prevIndex - 1
    );
  };

  const currentProgram = programsData[currentIndex];

  return (
    <section
      className={`relative w-full h-screen flex items-center justify-center text-white overflow-hidden ${currentProgram.bgColor}`}
    >
      {currentProgram.type === "image" ? (
        <img
          src={currentProgram.src}
          alt={currentProgram.title}
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
        />
      ) : (
        <video
          src={currentProgram.src}
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
        />
      )}

      <div className="relative z-10 text-center max-w-4xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
         Well Come to Capital
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-4xl font-semibold text-yellow-400 mb-8"
        >
          {currentProgram.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white mb-8"
        >
          {currentProgram.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
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

      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 p-4 rounded-full hover:bg-opacity-30 transition-all duration-300"
      >
        <IoIosArrowBack className="text-2xl text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 p-4 rounded-full hover:bg-opacity-30 transition-all duration-300"
      >
        <IoIosArrowForward className="text-2xl text-white" />
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {programsData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-yellow-400" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

// Section Component
const Section = ({ title, description, bgColor, bgImage, delay }) => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className={`${bgColor} ${bgImage} text-white py-20 h-screen flex items-center justify-center`}
  >
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
      
      <p className="text-lg md:text-xl">{description}</p>
      <a
            href="./Accounting"
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            Apply now
            <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 transition-transform duration-300" />
          </a>
    </div>
  </motion.section>
);

// Stats Section Component
const StatsSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-950 to-sky-950 text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          College Statistics
        </h2>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 pb-6">
            {statsData.map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: stat.id * 0.1 }}
                viewport={{ once: true }}
                className="min-w-[250px] bg-white bg-opacity-10 p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
              >
                <span className="text-4xl mb-4">{stat.icon}</span>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-lg font-semibold mt-2">{stat.title}</p>
                <p className="text-sm text-gray-300 mt-2">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        
        
      </div>
    </footer>
  );
};

// Hero Component
const Hero = () => {
  const [openDegree, setOpenDegree] = useState(false);
  const [openTVET, setOpenTVET] = useState(false);

  return (
    <section className="bg-gradient-to-r from-blue-950 to-sky-950 text-white overflow-hidden relative font-sans">
      {/* Explore Our Programs Section */}
      <ExplorePrograms />

      {/* Sections Above "Our Programs" */}
      {sectionsAbove.map((section, index) => (
        <Section
          key={section.id}
          title={section.title}
          description={section.description}
          bgColor={section.bgColor}
          bgImage={section.bgImage}
          delay={index * 0.2}
        />
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

      {/* Sections Below "Our Programs" */}
      {sectionsBelow.map((section, index) => (
        <Section
          key={section.id}
          title={section.title}
          description={section.description}
          bgColor={section.bgColor}
          bgImage={section.bgImage}
          delay={index * 0.2}
        />
      ))}

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

      {/* Stats Section */}
      <StatsSection />

      {/* Footer */}
      <Footer />
    </section>
  );
};

export default Hero;