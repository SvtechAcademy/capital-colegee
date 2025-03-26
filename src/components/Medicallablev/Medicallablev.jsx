import React from "react";
import { useNavigate } from "react-router-dom";

const MedicalLab = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-[url('/assets/medlab-hero.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Medical Laboratory Science Program</h1>
            <p className="text-xl mb-8">
              Master diagnostic techniques that form the foundation of modern healthcare
            </p>
            <button
              onClick={handleSignup}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-all"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* Program Highlights */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Program Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-red-600 text-4xl mb-4">🔬</div>
            <h3 className="text-xl font-semibold mb-3">Advanced Lab Techniques</h3>
            <p className="text-gray-700">
              Hands-on training with hematology analyzers, PCR machines, and microscopy
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-red-600 text-4xl mb-4">🩸</div>
            <h3 className="text-xl font-semibold mb-3">Clinical Rotations</h3>
            <p className="text-gray-700">
              600+ hours in hospital labs, reference labs, and research facilities
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-red-600 text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3">Certification Prep</h3>
            <p className="text-gray-700">
              Comprehensive preparation for ASCP and AMT certification exams
            </p>
          </div>
        </div>

        {/* Program Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-red-800">Core Curriculum</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-red-100 text-red-800 rounded-full p-1 mr-3">✔</span>
                <span>Clinical Chemistry & Urinalysis</span>
              </li>
              <li className="flex items-start">
                <span className="bg-red-100 text-red-800 rounded-full p-1 mr-3">✔</span>
                <span>Hematology & Coagulation</span>
              </li>
              <li className="flex items-start">
                <span className="bg-red-100 text-red-800 rounded-full p-1 mr-3">✔</span>
                <span>Medical Microbiology</span>
              </li>
              <li className="flex items-start">
                <span className="bg-red-100 text-red-800 rounded-full p-1 mr-3">✔</span>
                <span>Immunohematology (Blood Banking)</span>
              </li>
              <li className="flex items-start">
                <span className="bg-red-100 text-red-800 rounded-full p-1 mr-3">✔</span>
                <span>Molecular Diagnostics</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-red-800">Career Outcomes</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50">
                <h4 className="font-semibold">Medical Technologist</h4>
                <p className="text-sm text-gray-600">Hospital labs, reference labs, clinics</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                <h4 className="font-semibold">Specialty Technician</h4>
                <p className="text-sm text-gray-600">Hematology, microbiology, blood bank</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50">
                <h4 className="font-semibold">Lab Supervisor</h4>
                <p className="text-sm text-gray-600">Department leadership roles</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                <h4 className="font-semibold">Research Associate</h4>
                <p className="text-sm text-gray-600">Biotech and pharmaceutical research</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lab Specializations */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Laboratory Specializations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border-t-4 border-red-500 pt-4">
              <h3 className="text-xl font-semibold mb-3">Clinical Chemistry</h3>
              <p className="text-gray-600">
                Master biochemical analysis of blood, urine, and other body fluids
              </p>
            </div>
            <div className="border-t-4 border-blue-500 pt-4">
              <h3 className="text-xl font-semibold mb-3">Hematology</h3>
              <p className="text-gray-600">
                Blood cell analysis, coagulation studies, and hemoglobin testing
              </p>
            </div>
            <div className="border-t-4 border-green-500 pt-4">
              <h3 className="text-xl font-semibold mb-3">Microbiology</h3>
              <p className="text-gray-600">
                Bacterial cultures, antimicrobial susceptibility testing, and parasitology
              </p>
            </div>
            <div className="border-t-4 border-purple-500 pt-4">
              <h3 className="text-xl font-semibold mb-3">Blood Banking</h3>
              <p className="text-gray-600">
                Blood typing, crossmatching, and transfusion medicine
              </p>
            </div>
            <div className="border-t-4 border-yellow-500 pt-4">
              <h3 className="text-xl font-semibold mb-3">Histotechnology</h3>
              <p className="text-gray-600">
                Tissue processing, staining, and microscopic analysis
              </p>
            </div>
            <div className="border-t-4 border-indigo-500 pt-4">
              <h3 className="text-xl font-semibold mb-3">Molecular Biology</h3>
              <p className="text-gray-600">
                DNA/RNA analysis, PCR techniques, and genetic testing
              </p>
            </div>
          </div>
        </div>

        {/* Facilities Section */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Our Laboratory Facilities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="" 
                alt="Chemistry lab"
                className="rounded-lg shadow-md"
              />
              <img 
                src="/assets/microscope-lab.jpg" 
                alt="Microscope lab"
                className="rounded-lg shadow-md"
              />
              <img 
                src="" 
                alt="Blood bank"
                className="rounded-lg shadow-md"
              />
              <img 
                src="" 
                alt="Molecular lab"
                className="rounded-lg shadow-md"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Industry-Standard Equipment</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Automated chemistry and hematology analyzers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Digital microscopy and cell imaging systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>PCR and electrophoresis equipment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Blood bank refrigerators and testing equipment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>BSL-2 certified microbiology lab</span>
                </li>
              </ul>
              
              <button
                onClick={handleSignup}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all"
              >
                Schedule Lab Tour
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-red-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Launch Your Diagnostic Career</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Medical laboratory professionals are in high demand nationwide
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleSignup}
              className="bg-white text-red-700 px-8 py-3 rounded-lg hover:bg-red-100 transition-all font-semibold"
            >
              Apply Now
            </button>
            <button
              onClick={handleSignup}
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-all font-semibold"
            >
              Download Curriculum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalLab;