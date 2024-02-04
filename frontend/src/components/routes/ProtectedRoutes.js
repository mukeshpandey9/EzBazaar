import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/actions/userAction";
import LoginCard from "../LoginCard";
import { getCart } from "../../redux/actions/cartActions";

const ProtectedRoutes = ({ children }) => {
  const { isAuthanticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getCart());
  }, []);

  if (isAuthanticated) {
    return children;
  } else {
    return <LoginCard />;
  }
};

export default ProtectedRoutes;
