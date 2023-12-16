import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import {
  getCart,
  removeFromCart,
  updateCart,
} from "../redux/actions/cartActions";
import Spinner from "./Spinner";
import { message } from "antd";
import { clearCartErrors, removeCartReset } from "../redux/reducers/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();

  const { cart, cartLoading, cartError, success } = useSelector(
    (state) => state.cart
  );

  const { loading: delLoading, success: isRemoved } = useSelector(
    (state) => state.delCart
  );

  useEffect(() => {
    dispatch(getCart());

    if (cartError) {
      message.error(cartError);
      dispatch(clearCartErrors());
      return;
    }

    if (isRemoved) {
      message.success("Item Removed from Cart");
      dispatch(getCart());
      dispatch(removeCartReset());
    }

    if (success) {
      message.success("Cart Loaded Sucessfully");
    }
  }, [dispatch, cartError, isRemoved]);

  // const [open, setOpen] = useState(true);
  // const [subtotal, setSubtotal] = useState(0);
  var subTotal = 0;

  return (
    <>
      {cartLoading || delLoading ? (
        <Spinner />
      ) : (
        <div className="mx-auto  pt-1 h-full  max-w-7xl px-4 sm:px-6 lg:px-8 bg-white  ">
          <h1 className="text-5xl font-bold tracking-tight pt-7 my-5 ">Cart</h1>
          {cart && cart?.length > 0 ? (
            <div>
              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cart &&
                      cart?.map((product) => {
                        subTotal += product.totalPrice;

                        return (
                          <li key={product._id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col my-5">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={product.href}>{product?.name}</a>
                                  </h3>
                                  <p className="ml-4">₹{product?.totalPrice}</p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-md">
                                <div className="text-gray-500">
                                  <label
                                    htmlFor="quantity"
                                    className="inline mr-2 text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Quantity: {"  "}
                                  </label>
                                  <select
                                    value={product?.qty}
                                    onChange={(e) => {
                                      dispatch(
                                        updateCart({
                                          productId: product?.product_id,
                                          qty: e.target.value,
                                        })
                                      );
                                    }}
                                  >
                                    {[...Array(product.stock)].map(
                                      (_, index) => (
                                        <option key={index} value={index + 1}>
                                          {index + 1}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={() => {
                                      dispatch(
                                        removeFromCart(product.product_id)
                                      );
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p className="text-xl text-orange-500 font-extrabold">
                    ₹ {subTotal}
                    {sessionStorage.setItem("subtotal", subTotal)}
                  </p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>
            </div>
          ) : (
            <h1 className="text-6xl text-center my-auto  font-bold text-violet-800">
              Cart Is Empty
            </h1>
          )}
        </div>
      )}
    </>
  );
}
