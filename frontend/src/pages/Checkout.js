import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../components/Cart";
import StepperComp from "../components/StepperComp";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { Step, Stepper } from "react-form-stepper";
import { createOrder } from "../redux/actions/orderActions";
import { clearCart } from "../redux/actions/cartActions";
import { clearNewOrderErrors } from "../redux/reducers/orderSlice";
import { createAddress, getAddress } from "../redux/actions/addressAction";
import Spinner from "../components/Spinner";
import { clearErrors } from "../redux/reducers/addressSlice";
import axios from "axios";
import API from "../utils/API";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const { error, success } = useSelector((state) => state.newOrder);
  const {
    loading,
    error: addressError,
    success: addressSuccess,
    address,
  } = useSelector((state) => state.address);

  const [name, setName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNo, setPhone] = useState("");

  const [activeStep, setActiveStep] = useState(0);

  const addressHandler = () => {
    if (!address || !city || !state || !country || !pincode || !phoneNo) {
      message.warning("All Fields Are Mendatory");
      return;
    }

    const addressData = {
      name,
      email: user?.email,
      address: userAddress,
      city,
      state,
      country,
      pincode,
      phoneNo,
    };
    setActiveStep(1);

    dispatch(createAddress(addressData));
  };

  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch, address.length]);

  const orderHandler = async (order) => {
    if (!address || !order) {
      message.warning("Please Enter The Shipping Details");
      return;
    }

    if (cart) {
      const {
        data: { payment_id },
      } = await API.get(`api/v1/payment/info/${order.id}`);

      const paymentInfo = {
        payment_id,
        status: "Paid",
      };
      const orderData = {
        shippingInfo: address,
        paymentInfo,
        orderItems: cart,
        totalPrice: sessionStorage.getItem("subtotal"),
      };

      sessionStorage.clear();
      dispatch(createOrder(orderData));
      dispatch(clearCart());
      // navigate(`/success/${paymentInfo.payment_id}`);

      if (success) {
        message.success("Order SuccessFully Placed");
        navigate(`/success`);
      }
    }
  };

  const checkoutHandler = async () => {
    if (Object.keys(address).length === 0) {
      message.warning("Please Fill the Shipping Details!");
      return;
    }

    const {
      data: { key },
    } = await API.get("api/v1/payment/getkey");
    const amount = sessionStorage.getItem("subtotal");

    const { data } = await API.post("api/v1/payment/checkout", { amount });
    // console.log(data.order);
    let order = data?.order;

    if (order) {
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Mukesh Pandey",
        description: "Paying to EzBazaar",
        image:
          "https://ez-bazaar.vercel.app/static/media/logo.bdc76d07cb317ca79dfc.png",
        order_id: order.id,

        handler: async function (response) {
          const {
            data: { success },
          } = await API.post("api/v1/payment/verification", response);
          if (success) {
            message.info("Payment Succeeded");
            orderHandler(order);
          }
        },

        prefill: {
          email: user.email,
        },
        notes: {
          address: "EzBazaar Corporate Office",
        },
        theme: {
          color: "#a647e6",
        },
      };
      const razor = new window.Razorpay(options);
      await razor.open();

      razor.on("payment.failed", function (response) {
        message.error("Payment Failed");
      });
    }
  };

  useEffect(() => {
    if (error) {
      message.error("Error In Placing Order");
      dispatch(clearNewOrderErrors());
      return;
    }

    if (success) {
      message.success("Order SuccessFully Placed");
      navigate(`/success`);
    }
  }, [dispatch, success, message]);

  useEffect(() => {
    if (error) {
      message.error(addressError);
      dispatch(clearErrors());
    }
  }, [dispatch, addressError]);

  return (
    <>
      <div className="mx-auto pb-16 h-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          {/* Form */}
          {loading ? (
            <Spinner />
          ) : (
            <div className={` lg:col-span-3   mt-5`}>
              {!address && <StepperComp activeStep={activeStep} />}
              {Object.keys(address).length === 0 ? (
                <>
                  <form className={`bg-white p-8`}>
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                          Addressal Information
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Use a permanent address where you can receive mail.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Name
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                type="text"
                                name="first-name"
                                onChange={(e) => setName(e.target.value)}
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                id="email"
                                name="email"
                                type="email"
                                value={user && user?.email}
                                disabled
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Mobile Number
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                id="phone"
                                name="phone"
                                type="number"
                                onChange={(e) => setPhone(e.target.value)}
                                autoComplete="false"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Country
                            </label>
                            <div className="mt-2">
                              <select
                                required
                                id="country"
                                name="country"
                                onChange={(e) => setCountry(e.target.value)}
                                autoComplete="country-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                              >
                                <option>India</option>
                                <option>Canada</option>
                                <option>Japan</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="street-address"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Street Address
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                type="text"
                                name="street-address"
                                id="street-address"
                                onChange={(e) => setUserAddress(e.target.value)}
                                autoComplete="street-address"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                type="text"
                                name="city"
                                id="city"
                                onChange={(e) => setCity(e.target.value)}
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              State / Province
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                type="text"
                                name="region"
                                id="region"
                                onChange={(e) => setState(e.target.value)}
                                autoComplete="address-level1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              ZIP / Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                required
                                type="text"
                                name="postal-code"
                                id="postal-code"
                                onChange={(e) => setPincode(e.target.value)}
                                autoComplete="postal-code"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="reset"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Reset
                        </button>
                        <button
                          type="button"
                          onClick={addressHandler}
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Add address
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <StepperComp activeStep={activeStep} />
                  <div
                    className={`border-b border-gray-900/10 pb-12 bg-white p-10 "
                    `}
                  >
                    <h2 className="text-2xl font-bold leading-7 text-gray-900">
                      Shipping Info
                    </h2>

                    <div className="summary py-5">
                      <h2 className="text-gray-900 my-2 font-semibold">
                        Name:{" "}
                        <span className="text-gray-500">{address?.name}</span>
                      </h2>
                      <h2 className="text-gray-900 my-2 font-semibold">
                        City :{" "}
                        <span className="text-gray-500">
                          {`${address?.city}`}
                        </span>
                      </h2>
                      <h2 className="text-gray-900 my-2 font-semibold">
                        State :{" "}
                        <span className="text-gray-500">{address.state}</span>
                      </h2>
                      <h2 className="text-gray-900 my-2 font-semibold">
                        Country :{" "}
                        <span className="text-gray-500">{address.country}</span>
                      </h2>
                      <h2 className="text-gray-900 my-2 font-semibold">
                        Address :{" "}
                        <span className="text-gray-500">{address.address}</span>
                      </h2>
                      <h2 className="text-gray-900 my-2 font-semibold">
                        Pincode :{" "}
                        <span className="text-gray-500">{address.pincode}</span>
                      </h2>
                      <h2 className="text-gray-900 my-2 font-semibold">
                        Phone No :{" "}
                        <span className="text-gray-500">{address.phoneNo}</span>
                      </h2>
                    </div>
                  </div>
                </>
              )}
              {/* Addresss Information */}
            </div>
          )}
          {/* Cart */}
          <div className="lg:col-span-2 h-full ">
            <div className="mx-auto lg:mt-24 pb-12 mt-5 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white  ">
              <Cart />

              <div className="border-t border-gray-200 px-4 sm:px-6">
                <div className="mt-5 flex justify-center">
                  <button
                    onClick={checkoutHandler}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Pay and Order
                  </button>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
