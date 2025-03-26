import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import About from "./components/Banner/Banner";
import OurTeam from "./components/Subscribe/Subscribe";
import Contact from "./components/Banner/Banner2";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Signup/Signup";
import Chatbot from "./components/Chatbot/Chatbot";
import Management from "./components/Management/Management";
import Accounting from "./components/Accounting/Accounting";
import Nursing from "./components/Nursing/Nursing";
import PhotoEdit from "./components/PhotoEdit/PhotoEdit";
import Grammar from "./components/Grammar/Grammar";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import Medicallab from "./components/Medicallab/Medicallab";
import It from "./components/It/It";
import Nursingn from "./components/Nursingn/Nursingn";
import Pharmacy from "./components/Pharmacy/Pharmacy"; // Import Pharmasy
import Medicallablev from "./components/Medicallablev/Medicallablev";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // Import the ProtectedRoute

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is rendered only once here */}

      {/* Main content that changes dynamically based on route */}
      <main className="overflow-x-hidden bg-white text-dark">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<OurTeam />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Chatbot" element={<Chatbot />} /> {/* Route for Chatbot */}
          <Route path="/Management" element={<Management />} />
          <Route path="/Accounting" element={<Accounting/>} />
          <Route path="/Nursing" element={<Nursing />} />
          <Route path="/PhotoEdit" element={<PhotoEdit />} />
          <Route path="/Grammar" element={<Grammar />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/Medicallab" element={<Medicallab />} />
          <Route path="/It" element={<It />} />
          <Route path="/Nursingn" element={<Nursingn />} />
          <Route path="/Pharmacy" element={<Pharmacy />} />
          <Route path="/Medicallablev" element={<Medicallablev />} />

          {/* Protected AdminPanel route */}
          <Route
            path="/adminpanel"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer /> {/* Footer is rendered only once here */}
    </Router>
  );
}

export default App;