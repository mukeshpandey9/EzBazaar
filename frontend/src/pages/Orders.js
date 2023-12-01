import React, { useEffect } from "react";
import Header from "../components/header/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getOrders } from "../redux/actions/orderActions";
import { message } from "antd";
import Spinner from "../components/Spinner";
const Orders = () => {
  const dispatch = useDispatch();
  const { orders, error, loading, success } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getOrders());

    if (error) {
      message.error(error);
      dispatch(clearErrors());
      return;
    }

    if (success) {
      message.success("Orders Loaded");
      return;
    }
  }, [dispatch, error, message]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <Header />
          <div className="container py-20 mx-auto bg-white">
            <h1 className="text-4xl text-violet-800 text-center font-semibold ">
              Your Orders{" "}
            </h1>
            {/* Orders */}

            {orders && orders.length < 0 && (
              <h1 className="text-center text-5xl">No Orders Found</h1>
            )}

            {orders &&
              orders.map((order) => {
                return (
                  <div className="w-[95vw] mt-10 mx-auto border bg-white border-violet-500 rounded-xl  md:w-[70vw] h-full p-6">
                    {/* Header */}
                    <div className="flex pb-3 md:pb-0 flex-col border-b border-violet-400 md:flex-row justify-between">
                      <div className="flex flex-col md:flex-row gap-2 md:gap-10 ">
                        <div className="my-2">
                          <h3 className="text-violet-600">Order Id</h3>
                          <p className="text-gray-500 text-sm">{order?._id}</p>
                        </div>
                        <div className="my-2">
                          <h3 className="text-violet-600">Date Placed</h3>
                          <p className="text-gray-500 text-sm">
                            {order?.createdAt}
                          </p>
                        </div>
                        <div className="my-2">
                          <h3 className="text-violet-600">Total Amount</h3>
                          <p className="text-gray-500 text-sm">
                            {order?.totalPrice}{" "}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/order/${order?._id}`}
                        className="border mt-3 md:mt-0 hover:bg-violet-100 bg-violet-200 border-violet-500 rounded-md p-2 text-violet-800 px-4 h-10"
                      >
                        View Order
                      </Link>
                    </div>

                    {/* Order Items/Products */}

                    {order?.orderItems.map((orderItem) => {
                      return (
                        <div className="items py-4 border-b border-gray-200">
                          <div className="flex flex-col mt-3  md:flex-row gap-10">
                            <div className="w-24 h-28">
                              <img
                                src="https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg"
                                alt=""
                                className="w-full"
                              />
                            </div>
                            <div className="flex gap-7 items-center">
                              <h1 className="text-xl text-gray-900">
                                {orderItem?.name}
                              </h1>
                              <p className="text-gray-500 my-2">
                                Quantity: {orderItem?.qty}
                              </p>
                              <p className="text-gray-500 ">
                                Price: {orderItem?.totalPrice}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <h1>Status: {order?.orderStatus}</h1>
                            <Link
                              to={`/product/${orderItem?.product_id}`}
                              className="text-violet-700 font-semibold font-sans"
                            >
                              View Product
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default Orders;
