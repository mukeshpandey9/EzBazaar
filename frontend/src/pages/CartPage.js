import React from "react";
import Cart from "../components/Cart";
import Header from "../components/header/Header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartPage = () => {
  const { cart } = useSelector((state) => state.cart);
  return (
    <>
      <div className="mt-[-20px]">
        <Header />
      </div>

      <div className="mx-auto pt-5 pb-12 mt-5 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white  ">
        <Cart />

        {cart && cart?.length > 0 ? (
          <div className=" px-4 sm:px-6">
            <div className="mt-0">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center pt-14 justify-center">
            <Link
              to="/products"
              className="text-center p-3 text-white w-full md:w-40 px-4 bg-violet-700 "
            >
              View Products
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
