import React from "react";
import success from "../assets/img/success1.svg";
import { Link, useParams, useSearchParams } from "react-router-dom";
const Success = () => {
  const seachQuery = useSearchParams()[0];

  const { id } = useParams();
  return (
    <div className="flex items-center flex-col gap-4 justify-center h-screen w-screen">
      <img src={success} alt="" />
      <h1 className="text-4xl font-bold text-gary-700 text-center">
        Your Order is Placed!!
      </h1>
      <p className="text-center text-gary-600">
        Thank you for using{" "}
        <span className="text-violet-700 font-bold cursor-crosshair">
          EzBazaar
        </span>{" "}
      </p>
      <Link
        to="/orders"
        className="p-3 px-4 bg-violet-700 hover:bg-violet-600 rounded-lg text-white "
      >
        View Orders
      </Link>
      <p className="text-center font-bold text-gray-400">or</p>

      <Link to="/products" className="text-violet-700 ">
        Continue Shopping
      </Link>
    </div>
  );
};

export default Success;
