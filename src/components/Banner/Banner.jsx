import React from "react";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-[url('/assets/herro1.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl mb-8">
              Learn more about our Accounting program and the team behind it.
            </p>
          </div>
        </div>
      </div>

      {/* Mission, Vision, and Values Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Mission, Vision, and Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Mission</h3>
            <p className="text-gray-700">
              To provide high-quality education in accounting, equipping students with the knowledge
              and skills needed to excel in the financial world.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Vision</h3>
            <p className="text-gray-700">
              To be a leading institution in accounting education, producing graduates who are
              ethical, competent, and globally competitive.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Values</h3>
            <p className="text-gray-700">
              Integrity, Excellence, Innovation, and Commitment to lifelong learning.
            </p>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Degree Programs */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Degree Programs</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Nursing</li>
                <li>Medical Laboratory</li>
                <li>Information Technology</li>
                <li>Management</li>
                <li>Accounting and Finance</li>
              </ul>
            </div>

            {/* TVET Programs */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-4">TVET Programs</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Level IV Nurse</li>
                <li>Level IV Pharmacy</li>
                <li>Level IV Medical Lab</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img
              src="/images/team-member-1.jpg"
              alt="Team Member 1"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">John Doe</h3>
            <p className="text-gray-700 mb-2">Head of Accounting Department</p>
            <p className="text-gray-600">
              With over 15 years of experience in accounting and finance, John is dedicated to
              providing students with the best education.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img
              src="/images/team-member-2.jpg"
              alt="Team Member 2"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
            <p className="text-gray-700 mb-2">Senior Lecturer</p>
            <p className="text-gray-600">
              Jane specializes in financial accounting and taxation, bringing real-world experience
              to the classroom.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img
              src="/images/team-member-3.jpg"
              alt="Team Member 3"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Michael Brown</h3>
            <p className="text-gray-700 mb-2">Auditing Expert</p>
            <p className="text-gray-600">
              Michael has extensive experience in auditing and risk management, helping students
              understand complex concepts.
            </p>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-blue-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Accounting Program</h2>
          <p className="text-xl text-white mb-8">
            Take the first step towards a successful career in accounting.
          </p>
          <button
            onClick={() => (window.location.href = "/signup")}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-all"
          >
            Sign Up Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;