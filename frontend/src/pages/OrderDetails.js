import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../redux/actions/orderActions";
import { message } from "antd";
import Spinner from "../components/Spinner";

const OrderDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { order, success, error, loading } = useSelector(
    (state) => state.orderDetails
  );

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      message.error(error);
      dispatch(clearErrors());
      return;
    }

    if (success) {
      message.success("Order Details");
    }
  }, [dispatch, error, message]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {order && (
            <div className="container mx-auto max-w-7xl">
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex flex-col items-center">
                  <h1 className="text-3xl font-bold text-violet-800 mb-4">
                    Order Details
                  </h1>
                  <div className="flex flex-row justify-between mb-2">
                    <span className="text-gray-700">Order ID:</span>
                    <span className="text-violet-800">{id}</span>
                  </div>
                  <div className="flex flex-row justify-between mb-2">
                    <span className="text-gray-700">Order Date:</span>
                    <span className="text-violet-800">{order?.createdAt} </span>
                  </div>
                </div>
                <hr className="my-4 border-gray-200" />
                <div className="flex flex-row justify-between">
                  <span className="text-gray-700">Shipping Info :</span>
                  <div className="text-left">
                    <p className="text-violet-800">John Doe</p>
                    <p className="text-gray-700">
                      {order?.shippingInfo?.address}
                    </p>
                    <p className="text-gray-700">
                      {order?.shippingInfo?.phoneNo}
                    </p>
                  </div>
                </div>
                <hr className="my-4 border-gray-200" />
                <div className="flex flex-row justify-between">
                  <span className="text-gray-700">Payment Method:</span>
                  <span className="text-violet-800">Credit Card (Visa)</span>
                </div>
                <hr className="my-4 border-gray-200" />
                <div className="flex flex-row justify-between">
                  <span className="text-gray-700">Order Status:</span>
                  <span className="text-green-500">{order?.orderStatus} </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-md p-8 mt-8">
                <h2 className="text-2xl font-bold text-violet-800 mb-4">
                  Order Items
                </h2>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200 text-violet-800">
                      <th className="text-left p-2">Product</th>
                      <th className="text-center p-2">Quantity</th>
                      <th className="text-right p-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order &&
                      order?.orderItems?.map((orderItem) => {
                        return (
                          <tr>
                            <td className="text-left p-2">
                              <img
                                src="/nomad-tumbler.jpg"
                                alt="Nomad Tumbler"
                                className="h-10 w-10 mr-2"
                              />
                              {orderItem?.name}
                            </td>
                            <td className="text-center p-2">
                              {orderItem?.qty}{" "}
                            </td>
                            <td className="text-right p-2">
                              {orderItem?.totalPrice}{" "}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-200 text-violet-800">
                      <td className="text-right p-2" colspan="2">
                        Subtotal
                      </td>
                      <td className="text-right p-2">{order?.totalPrice}</td>
                    </tr>
                  </tfoot>
                </table>
                <div className="flex mt-10 flex-col md:flex-row gap-3 items-center justify-center">
                  <Link
                    to="/orders"
                    className="text-white bg-violet-600 p-2 px-3"
                  >
                    Return to Orders
                  </Link>
                  <span>or</span>
                  <Link to="/products" className="text-violet-700">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderDetails;
