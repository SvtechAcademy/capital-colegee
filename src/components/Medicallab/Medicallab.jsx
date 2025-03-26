import React from "react";
import { useNavigate } from "react-router-dom";

const MedicalLab = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-[url('/assets/med-lab-hero.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Medical Laboratory Science Program</h1>
            <p className="text-xl mb-8">
              Master diagnostic techniques and contribute to life-saving healthcare.
            </p>
            <button
              onClick={handleSignUp}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Program Details Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">About Our Medical Lab Program</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Program Overview */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Program Overview</h3>
            <p className="text-gray-700">
              Our Medical Laboratory Science program trains students in diagnostic testing, clinical analysis,
              and laboratory management to support modern healthcare delivery.
            </p>
          </div>

          {/* Card 2: Duration and Eligibility */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Duration & Requirements</h3>
            <p className="text-gray-700">
              <strong>Duration:</strong> 3-4 years (Including clinical rotations)
              <br />
              <strong>Prerequisites:</strong> Strong background in biology and chemistry
            </p>
          </div>

          {/* Card 3: Career Opportunities */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Career Paths</h3>
            <p className="text-gray-700">
              Graduates can work as Medical Technologists, Lab Managers, Research Specialists,
              or pursue careers in public health and biotechnology.
            </p>
          </div>
        </div>

        {/* Specializations Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Program Specializations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-red-500">
              <h3 className="text-xl font-semibold mb-3">Clinical Chemistry</h3>
              <p className="text-gray-600">
                Master biochemical analysis of bodily fluids for disease diagnosis.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-3">Hematology</h3>
              <p className="text-gray-600">
                Specialize in blood analysis and blood-related disorders.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
              <h3 className="text-xl font-semibold mb-3">Microbiology</h3>
              <p className="text-gray-600">
                Study microorganisms and their role in human health and disease.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold mb-3">Immunology</h3>
              <p className="text-gray-600">
                Focus on immune system function and immunological testing.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-500">
              <h3 className="text-xl font-semibold mb-3">Molecular Diagnostics</h3>
              <p className="text-gray-600">
                Learn cutting-edge DNA and RNA analysis techniques.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-indigo-500">
              <h3 className="text-xl font-semibold mb-3">Histotechnology</h3>
              <p className="text-gray-600">
                Study tissue preparation and analysis for disease detection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lab Facilities Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">State-of-the-Art Lab Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src="/assets/lab-equipment.jpg" 
                alt="Modern lab equipment"
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
            <div className="flex flex-col justify-center">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Modern diagnostic equipment matching hospital standards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Simulated clinical lab environment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Biotechnology research facilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Digital microscopy and analysis systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>BSL-2 certified microbiology lab</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-blue-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Begin Your Career in Diagnostic Medicine</h2>
          <p className="text-xl text-white mb-8">
            Join our next cohort of future medical laboratory professionals.
          </p>
          <button
            onClick={handleSignUp}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-all"
          >
            Start Your Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalLab;