import React, { useState, useEffect } from "react";
import { IoMdMenu, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaChevronDown, FaChevronUp, FaHome, FaUser, FaUsers, FaEnvelope, FaSignInAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

// Data
const NavbarMenu = [
  { id: 1, title: "Home", path: "/", icon: <FaHome /> },
  { id: 2, title: "Services", path: "/services", icon: <FaUser /> },
  { id: 3, title: "AboutUs", path: "/about", icon: <FaUsers /> },
  { id: 4, title: "OurTeam", path: "/team", icon: <FaUsers /> },
  { id: 5, title: "ContactUs", path: "/contact", icon: <FaEnvelope /> },
];

const DegreePrograms = [
  { id: 1, title: "Nursing", description: "Become a professional nurse with our advanced nursing program.", path: "/Nursing" },
  { id: 2, title: "Medical Laboratory", description: "Learn the latest techniques in medical laboratory science.", path: "/medicallab" },
  { id: 3, title: "Information Technology", description: "Master IT skills for the digital age.", path: "/It" },
  { id: 4, title: "Management", description: "Develop leadership and management expertise.", path: "/management" },
  { id: 5, title: "Accounting and Finance", description: "Grow your career in accounting and finance.", path: "/accounting" },
];

const TVETPrograms = [
  { id: 1, title: "Level IV Nurse", description: "Advanced training for nursing professionals.", path: "/Nursingn" },
  { id: 2, title: "Level IV Pharmacy", description: "Specialized training in pharmaceutical sciences.", path: "/pharmacy" },
  { id: 3, title: "Level IV Medical Lab", description: "Hands-on training in medical laboratory techniques.", path: "/medicallab" },
];

// Navbar Component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDegreeOpen, setIsDegreeOpen] = useState(false);
  const [isTVETOpen, setIsTVETOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeDropdowns = () => {
    setIsDegreeOpen(false);
    setIsTVETOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
    closeDropdowns();
  };

  const toggleDegreePrograms = () => {
    setIsDegreeOpen((prev) => !prev);
    setIsTVETOpen(false);
  };

  const toggleTVETPrograms = () => {
    setIsTVETOpen((prev) => !prev);
    setIsDegreeOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  useEffect(() => {
    if (location.pathname === "/signup") {
      setIsMenuOpen(false);
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-btn") &&
        !event.target.closest(".dropdown-menu") &&
        !event.target.closest(".menu-btn")
      ) {
        closeDropdowns();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="relative z-20 bg-sky-950 mx-auto max-w-full">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[100%] md:max-w-[80%] lg:max-w-[100%] py-2 flex justify-between items-center bg-sky-900 rounded-[2px] border-4 border-red-950 mx-auto"
      >
        <div className="flex items-center gap-1 cursor-pointer" onClick={handleLogoClick}>
          <img src="/assets/img.jpg" alt="College" className="h-10 w-auto sm:h-13 md:h-14" />
          <h2 className="font-bold text-lg text-white pl-1 sm:text-xl md:text-2xl">Capital College</h2>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          <ul className="flex items-center gap-1">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <NavLink to={menu.path} className="py-1 px-2 text-white font-semibold hover:text-blue-300 flex items-center gap-1">
                  {menu.icon} {menu.title}
                </NavLink>
              </li>
            ))}

            {/* Degree Programs Dropdown */}
            <li className="relative">
              <button
                className="dropdown-btn py-1 px-2 text-white font-semibold flex items-center gap-1 hover:text-blue-300"
                onClick={toggleDegreePrograms}
              >
                Degree Program {isDegreeOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <AnimatePresence>
                {isDegreeOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="dropdown-menu absolute left-0 mt-2 w-64 bg-sky-900 shadow-lg rounded-lg text-white font-bold z-50" // Added z-50
                  >
                    {DegreePrograms.map((item) => (
                      <li key={item.id}>
                        <NavLink
                          to={item.path}
                          className="block px-4 py-3 hover:bg-sky-950 transition-colors"
                          onClick={closeDropdowns}
                        >
                          <h4 className="font-bold text-lg">{item.title}</h4>
                          <p className="text-sm text-gray-900">{item.description}</p>
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* TVET Programs Dropdown */}
            <li className="relative">
              <button
                className="dropdown-btn py-1 px-2 text-white font-semibold flex items-center gap-1 hover:text-blue-300"
                onClick={toggleTVETPrograms}
              >
                TVET Program {isTVETOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <AnimatePresence>
                {isTVETOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="dropdown-menu absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg text-black z-50" // Added z-50
                  >
                    {TVETPrograms.map((item) => (
                      <li key={item.id}>
                        <NavLink
                          to={item.path}
                          className="block px-4 py-3 hover:bg-gray-100 transition-colors"
                          onClick={closeDropdowns}
                        >
                          <h4 className="font-bold text-lg">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* Sign Up Button in Desktop */}
            {location.pathname !== "/signup" && (
              <button
                className="py-1 px-2 text-white bg-blue-700 rounded-sm font-semibold hover:bg-blue-500 transition-all flex items-center gap-1"
                onClick={() => navigate("/signup")}
              >
                <FaSignInAlt /> SignUp
              </button>
            )}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden menu-btn">
          <IoMdMenu className="text-2xl text-white cursor-pointer" onClick={handleMenuToggle} />
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu lg:hidden absolute top-16 left-0 w-full bg-blue-950 p-3 shadow-md z-50" // Adjusted top and z-index
          >
            <ul className="flex flex-col items-center gap-2">
              {NavbarMenu.map((menu) => (
                <li key={menu.id}>
                  <NavLink to={menu.path} className="py-2 px-2 text-white font-semibold hover:text-blue-300 flex items-center gap-1" onClick={handleMenuToggle}>
                    {menu.icon} {menu.title}
                  </NavLink>
                </li>
              ))}

              {/* Degree Programs Dropdown */}
              <li>
                <button className="dropdown-btn text-white font-semibold flex items-center gap-1" onClick={toggleDegreePrograms}>
                  Degree Program {isDegreeOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
                <AnimatePresence>
                  {isDegreeOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="dropdown-menu mt-2 w-full bg-white shadow-lg rounded-lg text-black z-50" // Added z-50
                    >
                      {DegreePrograms.map((item) => (
                        <li key={item.id}>
                          <NavLink
                            to={item.path}
                            className="block px-4 py-3 hover:bg-gray-100 transition-colors"
                            onClick={handleMenuToggle}
                          >
                            <h4 className="font-bold text-lg">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </NavLink>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* TVET Programs Dropdown */}
              <li>
                <button className="dropdown-btn text-white font-semibold flex items-center gap-1" onClick={toggleTVETPrograms}>
                  TVET Program {isTVETOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
                <AnimatePresence>
                  {isTVETOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="dropdown-menu mt-2 w-full bg-white shadow-lg rounded-lg text-black z-50" // Added z-50
                    >
                      {TVETPrograms.map((item) => (
                        <li key={item.id}>
                          <NavLink
                            to={item.path}
                            className="block px-4 py-3 hover:bg-gray-100 transition-colors"
                            onClick={handleMenuToggle}
                          >
                            <h4 className="font-bold text-lg">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </NavLink>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* Sign Up Button in Mobile */}
              {location.pathname !== "/signup" && (
                <button
                  className="py-2 px-4 text-white bg-blue-700 rounded-sm font-semibold hover:bg-blue-500 transition-all flex items-center gap-1"
                  onClick={() => navigate("/signup")}
                >
                  <FaSignInAlt /> SignUp
                </button>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;