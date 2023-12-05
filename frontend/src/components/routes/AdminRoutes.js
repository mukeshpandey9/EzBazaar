import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadUser } from "../../redux/actions/userAction";

const AdminRoutes = ({ children }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  if (user && user.role) {
    if (user.role === "admin") {
      return children;
    } else {
      message.warning("You are Not Allowed!");
      return <Navigate to="/" />;
    }
  }
};

export default AdminRoutes;
