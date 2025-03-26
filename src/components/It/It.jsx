import React from "react";
import { useNavigate } from "react-router-dom";

const ItPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-[url('/assets/it-hero.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Information Technology Program</h1>
            <p className="text-xl mb-8">
              Master cutting-edge technologies and build the digital solutions of tomorrow.
            </p>
            <button
              onClick={handleSignUp}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* Program Details Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">About Our IT Program</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Program Overview */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Program Overview</h3>
            <p className="text-gray-700">
              Our IT program provides comprehensive training in software development, networking, cybersecurity,
              and cloud computing. Gain hands-on experience with industry-standard tools and technologies.
            </p>
          </div>

          {/* Card 2: Duration and Eligibility */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Duration & Eligibility</h3>
            <p className="text-gray-700">
              <strong>Duration:</strong> 2-4 years (Flexible options available)
              <br />
              <strong>Eligibility:</strong> High school diploma with mathematics background or equivalent.
              No prior coding experience required.
            </p>
          </div>

          {/* Card 3: Career Opportunities */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Career Paths</h3>
            <p className="text-gray-700">
              Graduates can become Software Developers, Network Engineers, Cybersecurity Analysts,
              Cloud Architects, and more in high-demand tech fields.
            </p>
          </div>
        </div>

        {/* Specializations Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Specialization Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-3">Software Development</h3>
              <p className="text-gray-600">
                Master full-stack development with modern frameworks and agile methodologies.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
              <h3 className="text-xl font-semibold mb-3">Cybersecurity</h3>
              <p className="text-gray-600">
                Learn to protect systems and networks from digital attacks and threats.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold mb-3">Cloud Computing</h3>
              <p className="text-gray-600">
                Gain expertise in AWS, Azure, and GCP cloud platforms and services.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold mb-3">Data Science</h3>
              <p className="text-gray-600">
                Develop skills in big data analytics, machine learning, and AI applications.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-blue-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Launch Your Tech Career?</h2>
          <p className="text-xl text-white mb-8">
            Join our IT program and gain the skills that top tech companies are looking for.
          </p>
          <button
            onClick={handleSignUp}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-all"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItPage;