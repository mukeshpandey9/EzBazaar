import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isAuthanticated } = useSelector((state) => state.user);

  if (!isAuthanticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
