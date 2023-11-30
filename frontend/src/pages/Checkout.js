import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../components/Cart";
import StepperComp from "../components/StepperComp";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { Step, Stepper } from "react-form-stepper";
import { clearErrors, createOrder } from "../redux/actions/orderActions";
import { clearCart } from "../redux/actions/cartActions";
const adresses = [
  {
    name: "Jhon Doe",
    street: "11th Main",
    city: "Delhi",
    pincode: 111023,
    state: "Delhi",
    phone: 85835245,
  },
  {
    name: "Jhon Wick",
    street: "17th west",
    city: "Aagra",
    pincode: 521558,
    state: "U.P.",
    phone: 487438343,
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const { error, success } = useSelector((state) => state.order);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
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

    const shippingInfo = {
      address,
      city,
      state,
      country,
      pincode,
      phoneNo,
    };
    setActiveStep(1);
    sessionStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
    sessionStorage.setItem("name", name);
  };

  var shippingInfo = sessionStorage.getItem("shippingInfo");
  shippingInfo = JSON.parse(shippingInfo);

  const orderHandler = () => {
    if (!shippingInfo) {
      message.warning("Please Enter The Shipping Details");
      return;
    }

    if (cart) {
      const orderData = {
        shippingInfo,
        orderItems: cart,
        totalPrice: sessionStorage.getItem("subtotal"),
      };

      // console.log("Order:    ", orderData);

      dispatch(createOrder(orderData));

      sessionStorage.clear();
    }
  };

  useEffect(() => {
    if (error) {
      message.error("Error In Placing Order");
      dispatch(clearErrors());
      return;
    }

    if (success) {
      navigate("/success");
      message.success("Order SuccessFully Placed");
      dispatch(clearCart());
    }
  }, [dispatch, success, message]);

  return (
    <>
      <div className="mx-auto pb-16 h-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          {/* Form */}
          <div className={` lg:col-span-3   mt-5`}>
            {!shippingInfo && <StepperComp activeStep={activeStep} />}
            {!shippingInfo && (
              <>
                <form
                  className={`bg-white p-8  ${
                    shippingInfo ? "hidden" : "block"
                  }`}
                >
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
                            phone address
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
                              onChange={(e) => setAddress(e.target.value)}
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
                        onClick={addressHandler}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add address
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
            {/* Addresss Information */}

            {shippingInfo && (
              <>
                <StepperComp activeStep={activeStep} />
                <div
                  className={`border-b border-gray-900/10 pb-12 bg-white p-10 ${
                    shippingInfo ? "block" : "hidden"
                  }`}
                >
                  <h2 className="text-2xl font-bold leading-7 text-gray-900">
                    Shipping Info
                  </h2>

                  <div className="summary py-5">
                    <h2 className="text-gray-900 my-2 font-semibold">
                      Name:{" "}
                      <span className="text-gray-500">
                        {sessionStorage.getItem("name")}
                      </span>
                    </h2>
                    <h2 className="text-gray-900 my-2 font-semibold">
                      City :{" "}
                      <span className="text-gray-500">
                        {`${shippingInfo?.city}`}
                      </span>
                    </h2>
                    <h2 className="text-gray-900 my-2 font-semibold">
                      State :{" "}
                      <span className="text-gray-500">
                        {shippingInfo.state}
                      </span>
                    </h2>
                    <h2 className="text-gray-900 my-2 font-semibold">
                      Country :{" "}
                      <span className="text-gray-500">
                        {shippingInfo.country}
                      </span>
                    </h2>
                    <h2 className="text-gray-900 my-2 font-semibold">
                      Address :{" "}
                      <span className="text-gray-500">
                        {shippingInfo.address}
                      </span>
                    </h2>
                    <h2 className="text-gray-900 my-2 font-semibold">
                      Pincode :{" "}
                      <span className="text-gray-500">
                        {shippingInfo.pincode}
                      </span>
                    </h2>
                    <h2 className="text-gray-900 my-2 font-semibold">
                      Phone No :{" "}
                      <span className="text-gray-500">
                        {shippingInfo.phoneNo}
                      </span>
                    </h2>
                  </div>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose One
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payments"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            name="payments"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Cart */}
          <div className="lg:col-span-2 h-full ">
            <div className="mx-auto lg:mt-24 pb-12 mt-5 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white  ">
              <Cart />

              <div className="border-t border-gray-200 px-4 sm:px-6">
                <div className="mt-5">
                  <button
                    onClick={orderHandler}
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
