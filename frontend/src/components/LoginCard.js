import React from "react";
import { Link } from "react-router-dom";

const LoginCard = () => {
  return (
    <div className="w-screen h-screen bg-gray-50 backdrop-blur-sm flex items-center justify-center flex-col gap-10">
      <h1 className="text-center text-gray-600 font-bold">
        Please SignIn to access this page
      </h1>
      <Link
        to="/login"
        className="text-center rounded text-white bg-violet-700 shadow-sm  p-3 px-5"
      >
        SignIn
      </Link>
    </div>
  );
};

export default LoginCard;
