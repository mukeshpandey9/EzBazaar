import React from "react";

const AdminDashBoard = () => {
  return (
    <>
      <div className="container mt-20 md:mt-2 md:pl-40">
        <h1 className="text-center text-5xl text-violet-600">Dashboard</h1>
        <div className="text-center mt-20">
          <h1> Total Revenue </h1>
          <h1>$2000</h1>
        </div>

        <div className="flex items-center justify-center mt-10 sm:gap-16 gap-6">
          <div className="circle flex flex-col items-center justify-center w-24 h-24  rounded-full bg-violet-500 text-center text-white font-semibold">
            <h1>Products</h1>
            <p>10</p>
          </div>
          <div className="circle flex flex-col items-center justify-center w-24 h-24  rounded-full bg-violet-500 text-center text-white font-semibold">
            <h1>Orders</h1>
            <p>1</p>
          </div>
          <div className="circle flex flex-col items-center justify-center w-24 h-24  rounded-full bg-violet-500 text-center text-white font-semibold">
            <h1>Users</h1>
            <p>10</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
