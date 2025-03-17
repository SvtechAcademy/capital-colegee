import React from "react";
import { useNavigate } from "react-router-dom";

const ManagementCoursePage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-[url('/assets/studen.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Management Program</h1>
            <p className="text-xl mb-8">
              Develop leadership and management skills to excel in the business world.
            </p>
            <button
              onClick={handleSignUp}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>

      {/* Course Details Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">About the Management Program</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Program Overview */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Program Overview</h3>
            <p className="text-gray-700">
              Our Management program is designed to equip students with the skills needed to lead and
              manage organizations effectively. The program combines theoretical knowledge with
              practical applications.
            </p>
          </div>

          {/* Card 2: Duration and Eligibility */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Duration & Eligibility</h3>
            <p className="text-gray-700">
              <strong>Duration:</strong> 3 years (Full-time)
              <br />
              <strong>Eligibility:</strong> High school diploma or equivalent with a strong interest
              in business and management.
            </p>
          </div>

          {/* Card 3: Career Opportunities */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Career Opportunities</h3>
            <p className="text-gray-700">
              Graduates can pursue careers as Business Analysts, Project Managers, Marketing Managers,
              and more in various industries.
            </p>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-blue-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Management Journey?</h2>
          <p className="text-xl text-white mb-8">
            Register now and take the first step towards a successful career in management.
          </p>
          <button
            onClick={handleSignUp}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-all"
          >
            Sign Up Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagementCoursePage;