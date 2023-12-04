import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadUser } from "../../redux/actions/userAction";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
