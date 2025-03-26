import React, { useState } from "react";
import { auth, db, googleProvider, facebookProvider } from "../firebase/firebase-config.js";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FaGoogle, FaFacebook, FaPhone, FaSms, FaChevronDown, FaChevronUp, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "", gender: "", role: "user" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showContactCard, setShowContactCard] = useState(false); // State to toggle contact card
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const validateForm = () => {
    const { name, email, password, phone, gender } = formData;

    if (!isLogin && !name) {
      setError("Full Name is required.");
      return false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    if (!isLogin && !phone) {
      setError("Phone number is required.");
      return false;
    }

    if (!isLogin && !/^\+251\d{9}$/.test(phone)) {
      setError("Please enter a valid phone number with country code +251 (for Ethiopia).");
      return false;
    }

    return true;
  };

  const saveUserToFirestore = async (user, name, role, phone, gender) => {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      name: name || user.displayName || "Unknown",
      email: user.email,
      phone: phone,
      gender: gender,
      role: role,
      createdAt: new Date(),
    });
  };

  const handleEmailPasswordSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await saveUserToFirestore(userCredential.user, formData.name, formData.role, formData.phone, formData.gender);
      localStorage.setItem("role", formData.role); // Store role in localStorage
      setSuccess(true);
      // Redirect logic
      if (formData.role === "admin") {
        navigate("/AdminPanel");
      } else {
        navigate("/UserDashboard"); // All other roles (user, student, teacher, customer) go to UserDashboard
      }
    } catch (err) {
      setError(err.code === "network-request-failed" ? "Network error, please try again later." : "Form validation error, please check the inputs.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const userSnap = await getDoc(doc(db, "users", userCredential.user.uid));
      const userData = userSnap.data();
      localStorage.setItem("role", userData?.role || "user"); // Store role in localStorage
      if (userData?.role === "admin") {
        navigate("/AdminPanel");
      } else {
        navigate("/UserDashboard"); // All other roles (user, student, teacher, customer) go to UserDashboard
      }
    } catch (err) {
      setError(err.code === "auth/network-request-failed" ? "Network error, please try again later." : "Form validation error, please check the inputs.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setSocialLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserToFirestore(result.user, result.user.displayName, "user", formData.phone, formData.gender);
      localStorage.setItem("role", "user"); // Default role for social logins
      navigate("/UserDashboard");
    } catch (err) {
      setError(err.code === "auth/popup-closed-by-user" ? "Google login popup closed." : "Google login failed, please try again.");
    } finally {
      setSocialLoading(false);
    }
  };

  const handleFacebookAuth = async () => {
    try {
      setSocialLoading(true);
      const result = await signInWithPopup(auth, facebookProvider);
      await saveUserToFirestore(result.user, result.user.displayName, "user", formData.phone, formData.gender);
      localStorage.setItem("role", "user"); // Default role for social logins
      navigate("/UserDashboard");
    } catch (err) {
      setError("Facebook login failed, please try again.");
    } finally {
      setSocialLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ name: "", email: "", password: "", phone: "", gender: "", role: "user" });
  };

  return (
    <section
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/studen.jpg')" }} // Add your background image path here
    >
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-4xl font-bold text-blue-950 text-center mb-8">
          {isLogin ? "Login to Capital College" : "Sign Up to Capital College"}
        </h2>
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4 text-center">
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-500 text-white p-4 rounded-md mb-4 text-center">
            <p>Success! Redirecting...</p>
          </div>
        )}
        <form onSubmit={isLogin ? handleEmailPasswordLogin : handleEmailPasswordSignUp} className="space-y-6">
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number (e.g. +251...)"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-4 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex items-center space-x-6 mb-4">
                <label className="text-blue-950 font-semibold">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    className="mr-2"
                    required
                  />
                  Male
                </label>
                <label className="text-blue-950 font-semibold">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    className="mr-2"
                    required
                  />
                  Female
                </label>
              </div>

              <div className="mb-4">
                <label className="text-blue-950 font-semibold">Select Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleRoleChange}
                  required
                  className="w-full p-4 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
{/*                   <option value="user">User</option> */}
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
{/*                   <option value="customer">Customer</option> */}
{/*                   <option value="admin">Admin</option> */}
                </select>
              </div>
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-4 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-950"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              type="submit"
              className="w-full bg-blue-950 text-white p-4 rounded-lg hover:bg-blue-900 transition-all"
              disabled={loading}
            >
              {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              type="button"
              onClick={toggleForm}
              className="text-blue-950 hover:text-blue-900 transition-all"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </form>

        {/* Contact Us Toggle Button */}
        <div className="mt-6">
          <button
            onClick={() => setShowContactCard(!showContactCard)}
            className="w-full flex items-center justify-center space-x-2 text-blue-950 font-semibold hover:text-blue-900 transition-all"
          >
            <span>Contact Us</span>
            {showContactCard ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
          </button>
        </div>

        {/* Animated Contact Card Content */}
        <AnimatePresence>
          {showContactCard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              {/* Social Media Login/Signup Card */}
              <div className="bg-blue-950 p-6 rounded-lg text-white">
                <h3 className="text-xl font-semibold mb-4">Social Media Login/Signup</h3>
                <div className="flex justify-center space-x-6">
                  <button
                    onClick={handleGoogleAuth}
                    disabled={socialLoading}
                    className="flex flex-col items-center p-4 border-2 border-blue-200 rounded-lg cursor-pointer hover:bg-blue-900 transition-all"
                  >
                    <FaGoogle size={24} className="text-white" />
                    <span className="text-white font-semibold mt-2">Google</span>
                  </button>
                  <button
                    onClick={handleFacebookAuth}
                    disabled={socialLoading}
                    className="flex flex-col items-center p-4 border-2 border-blue-200 rounded-lg cursor-pointer hover:bg-blue-900 transition-all"
                  >
                    <FaFacebook size={24} className="text-white" />
                    <span className="text-white font-semibold mt-2">Facebook</span>
                  </button>
                </div>
              </div>

              {/* Call/SMS Actions Card */}
              <div className="bg-blue-950 p-6 rounded-lg text-white">
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <div className="flex justify-center space-x-6">
                  <a
                    href="tel:+25177778886"
                    className="flex items-center space-x-2 text-white hover:text-blue-200 transition-all"
                  >
                    <FaPhone size={20} />
                    <span>Call Us</span>
                  </a>
                  <a
                    href="sms:+25177778886"
                    className="flex items-center space-x-2 text-white hover:text-blue-200 transition-all"
                  >
                    <FaSms size={20} />
                    <span>SMS Us</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SignUp;
