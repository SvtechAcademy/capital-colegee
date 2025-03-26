import React from "react";
import { useNavigate } from "react-router-dom";

const NursingLevel4 = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-[url('/assets/nursing-hero.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Level  IV Nursing Program</h1>
            <p className="text-xl mb-8">
              Advanced clinical training for the next generation of healthcare leaders
            </p>
            <button
              onClick={handleSignup}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all"
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
            <div className="text-blue-600 text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-3">Advanced Curriculum</h3>
            <p className="text-gray-700">
              Comprehensive training in complex patient care, pharmacology, and evidence-based practice
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-600 text-4xl mb-4">🏥</div>
            <h3 className="text-xl font-semibold mb-3">Clinical Placements</h3>
            <p className="text-gray-700">
              500+ hours in specialized hospital units and community healthcare settings
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-600 text-4xl mb-4">👩‍⚕️</div>
            <h3 className="text-xl font-semibold mb-3">Expert Faculty</h3>
            <p className="text-gray-700">
              Learn from practicing nurses with specialty certifications and teaching credentials
            </p>
          </div>
        </div>

        {/* Program Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-blue-800">Core Modules</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">✔</span>
                <span>Advanced Medical-Surgical Nursing</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">✔</span>
                <span>Complex Patient Care Management</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">✔</span>
                <span>Pharmacology for Advanced Practice</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">✔</span>
                <span>Nursing Leadership & Ethics</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">✔</span>
                <span>Evidence-Based Practice & Research</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-blue-800">Career Pathways</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                <h4 className="font-semibold">Hospital Nursing</h4>
                <p className="text-sm text-gray-600">ICU, ER, OR, and specialty unit positions</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                <h4 className="font-semibold">Community Health</h4>
                <p className="text-sm text-gray-600">Public health, home care, and clinic roles</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50">
                <h4 className="font-semibold">Nursing Education</h4>
                <p className="text-sm text-gray-600">Clinical instructor or educator pathways</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50">
                <h4 className="font-semibold">Specialty Certification</h4>
                <p className="text-sm text-gray-600">Preparation for CCRN, CNOR, or other credentials</p>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Training Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Clinical Training Experience</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="/assets/nursing-clinical.jpg" 
                alt="Nursing students in clinical setting"
                className="rounded-lg shadow-md w-full"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Hands-On Learning</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Supervised rotations in multiple specialty areas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Simulation lab with high-fidelity manikins</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Electronic health records training</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Interprofessional healthcare team experience</span>
                </li>
              </ul>
              
              <button
                onClick={handleSignup}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                Apply for Clinical Placement
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-blue-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Nursing Journey Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Limited seats available for our next intake. Secure your spot now.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleSignup}
              className="bg-white text-blue-700 px-8 py-3 rounded-lg hover:bg-blue-100 transition-all font-semibold"
            >
              Enroll Now
            </button>
            <button
              onClick={handleSignup}
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all font-semibold"
            >
              Apply Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NursingLevel4;