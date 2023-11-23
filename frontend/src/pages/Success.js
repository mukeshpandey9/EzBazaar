import React from "react";
import success from "../assets/img/success1.svg";
import { Link } from "react-router-dom";
const Success = () => {
  return (
    <div className="flex items-center flex-col gap-10 justify-center h-screen w-screen">
      <img src={success} alt="" />
      <h1 className="text-4xl font-bold text-gary-700 text-center">
        Your Order is Placed!!
      </h1>
      <Link
        to="/orders"
        className="p-3 px-4 bg-violet-700 hover:bg-violet-600 rounded-lg text-white "
      >
        View Orders
      </Link>
    </div>
  );
};

export default Success;
