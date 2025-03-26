import React from "react";
import { useNavigate } from "react-router-dom";

const PharmacyLevel4 = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-[url('/assets/pharmacy-hero.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Level  IV Pharmacy Program</h1>
            <p className="text-xl mb-8">
              Master pharmaceutical sciences and patient care in our advanced program
            </p>
            <button
              onClick={handleSignup}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* Program Highlights */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Program Highlights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-green-600 text-4xl mb-4">💊</div>
            <h3 className="text-xl font-semibold mb-3">Advanced Pharmacology</h3>
            <p className="text-gray-700">
              In-depth study of drug actions, interactions, and therapeutic applications
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-green-600 text-4xl mb-4">🧪</div>
            <h3 className="text-xl font-semibold mb-3">Clinical Pharmacy</h3>
            <p className="text-gray-700">
              Hands-on training in medication therapy management and patient care
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-green-600 text-4xl mb-4">🏛️</div>
            <h3 className="text-xl font-semibold mb-3">Pharmacy Operations</h3>
            <p className="text-gray-700">
              Master dispensing systems, inventory control, and pharmacy law
            </p>
          </div>
        </div>

        {/* Program Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-green-800">Core Modules</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 rounded-full p-1 mr-3">✔</span>
                <span>Advanced Pharmaceutical Chemistry</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 rounded-full p-1 mr-3">✔</span>
                <span>Clinical Pharmacokinetics</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 rounded-full p-1 mr-3">✔</span>
                <span>Pharmacotherapy & Disease Management</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 rounded-full p-1 mr-3">✔</span>
                <span>Pharmacy Law & Ethics</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 rounded-full p-1 mr-3">✔</span>
                <span>Research Methods in Pharmacy</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-green-800">Career Pathways</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                <h4 className="font-semibold">Community Pharmacy</h4>
                <p className="text-sm text-gray-600">Retail pharmacy management and patient care</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                <h4 className="font-semibold">Hospital Pharmacy</h4>
                <p className="text-sm text-gray-600">Clinical pharmacy and medication therapy management</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50">
                <h4 className="font-semibold">Pharmaceutical Industry</h4>
                <p className="text-sm text-gray-600">Drug development, quality control, and sales</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50">
                <h4 className="font-semibold">Regulatory Affairs</h4>
                <p className="text-sm text-gray-600">Drug safety and compliance roles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lab Facilities Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Pharmacy Lab Facilities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="/assets/pharmacy-lab.jpg" 
                alt="Pharmacy lab equipment"
                className="rounded-lg shadow-md w-full"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">State-of-the-Art Training</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Simulated community pharmacy with POS systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Hospital pharmacy simulation lab</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Sterile compounding clean room</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Pharmaceutical chemistry laboratory</span>
                </li>
              </ul>
              
              <button
                onClick={handleSignup}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
              >
                Apply for Lab Access
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-green-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Begin Your Pharmacy Career</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our Level 4 program prepares you for rewarding opportunities in the pharmaceutical field
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleSignup}
              className="bg-white text-green-700 px-8 py-3 rounded-lg hover:bg-green-100 transition-all font-semibold"
            >
              Enroll Now
            </button>
            <button
              onClick={handleSignup}
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-all font-semibold"
            >
              Request Program Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyLevel4;