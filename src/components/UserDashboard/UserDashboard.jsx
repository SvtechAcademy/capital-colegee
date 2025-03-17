import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { FaPhone, FaSms, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEdit } from "react-icons/fa"; // Added icons for social media

const db = getFirestore();
const auth = getAuth();

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Get user data from Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            setUserData(userSnap.data());
            setNewData({
              name: userSnap.data().name,
              email: userSnap.data().email,
              phone: userSnap.data().phone || "",
              address: userSnap.data().address || ""
            });
          } else {
            setError("User data not found");
          }
        } else {
          setError("No user is logged in");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          name: newData.name,
          email: newData.email,
          phone: newData.phone,
          address: newData.address,
        });
        setUserData({ ...userData, ...newData });
        setIsEditing(false); // Exit edit mode
      } catch (err) {
        setError("Failed to save changes: " + err.message);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-dashboard flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-950 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Caital College </h1>
          <nav>
            <a href="/" className="text-white mx-4">Home</a>
            <a href="/" className="text-white mx-4">Dashboard</a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow p-6 max-w-screen-sm mx-auto">
        <h2 className="text-3xl font-bold text-blue-950 mb-6 text-center">User Dashboard</h2>
        
        {userData ? (
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-6">
            <h3 className="text-2xl font-semibold text-blue-950">User Information</h3>

            {/* Edit Button */}
            <button 
              onClick={() => setIsEditing(!isEditing)} 
              className="self-start p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <FaEdit />
              <span>{isEditing ? "Cancel" : "Edit"}</span>
            </button>

            {/* User Info Cards */}
            <div className="mt-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm">Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={newData.name}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={newData.email}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={newData.phone}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={newData.address}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <button 
                    onClick={handleSaveChanges} 
                    className="mt-4 p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div>
                  <p><strong>Name:</strong> {userData.name}</p>
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>Phone:</strong> {userData.phone || "Not provided"}</p>
                  <p><strong>Address:</strong> {userData.address || "Not provided"}</p>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-blue-950">Social Media</h3>
              {userData.socialLinks ? (
                <div className="flex space-x-4">
                  {userData.socialLinks.facebook && (
                    <a href={userData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                      <FaFacebook />
                    </a>
                  )}
                  {userData.socialLinks.twitter && (
                    <a href={userData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                      <FaTwitter />
                    </a>
                  )}
                  {userData.socialLinks.linkedin && (
                    <a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700">
                      <FaLinkedin />
                    </a>
                  )}
                  {userData.socialLinks.instagram && (
                    <a href={userData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600">
                      <FaInstagram />
                    </a>
                  )}
                </div>
              ) : (
                <p>No social links available.</p>
              )}
            </div>

            {/* Contact Call and SMS */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-x-6 sm:space-y-0">
              <a href="tel:+251913767842" className="w-full sm:w-auto p-4 bg-blue-600 text-white rounded-full text-center hover:bg-blue-700 flex justify-center items-center space-x-2">
                <FaPhone />
                <span>Call now</span>
              </a>
              <a href="sms:+251913767842" className="w-full sm:w-auto p-4 bg-blue-600 text-white rounded-full text-center hover:bg-blue-700 flex justify-center items-center space-x-2">
                <FaSms />
                <span>SMS send</span>
              </a>
            </div>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </main>

    </div>
  );
};

export default UserDashboard;
