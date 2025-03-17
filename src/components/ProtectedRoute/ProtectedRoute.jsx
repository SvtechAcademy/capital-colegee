import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch the role from localStorage
    const role = localStorage.getItem("role");
    setUserRole(role);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading spinner
  }

  if (userRole === requiredRole) {
    return children; // Allow access if the user has the required role
  } else {
    return <Navigate to="/" replace />; // Redirect to home page if the user is not an admin
  }
};

export default ProtectedRoute;