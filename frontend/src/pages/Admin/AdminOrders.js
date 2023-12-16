import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SideBar from "../../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import Spinner from "../../components/Spinner";
import { deleteOrder, getAdminOrders } from "../../redux/actions/orderActions";
import ConfirmModel from "../../components/ConfirmModel";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  clearDeleteOrderError,
  resetDeleteOrder,
} from "../../redux/reducers/orderSlice";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, error, loading, success } = useSelector(
    (state) => state.order
  );

  const {
    success: isDeleted,
    error: deleteError,
    loading: orderLoading,
  } = useSelector((state) => state.delOrder);

  const handleDelete = (id) => {
    dispatch(deleteOrder(id));

    // setOpenModal(false);
  };

  useEffect(() => {
    if (success) {
      message.success("Orders Fetched");
    }

    if (error || deleteError) {
      message.error(error);
      dispatch(clearDeleteOrderError());
    }
    if (isDeleted) {
      message.success("Order Deleted");
      dispatch(getAdminOrders());

      dispatch(resetDeleteOrder());
    }
    dispatch(getAdminOrders());
  }, [dispatch, error, isDeleted]);

  // const [openModal, setOpenModal] = useState(true);

  return (
    <>
      {loading || orderLoading ? (
        <Spinner />
      ) : (
        <>
          {/* <Modal
            className="z-50"
            show={openModal}
            size="md"
            onClose={() => setOpenModal(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDelete}>
                    {"Yes, I'm sure"}
                  </Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal> */}
          <SideBar />
          <div className="container md:pl-64 py-20 mx-auto bg-white">
            <h1 className="text-4xl text-violet-700 text-center font-semibold ">
              All Orders{" "}
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
                    <div className="flex pb-3 flex-col border-b border-violet-400 md:flex-row justify-between">
                      <div className="flex flex-col md:flex-row gap-2 md:gap-10 ">
                        <div className="my-2">
                          <h3 className="text-violet-500">Order Id</h3>
                          <p className="text-gray-500 text-sm">{order?._id}</p>
                        </div>
                        <div className="my-2">
                          <h3 className="text-violet-500">Date Placed</h3>
                          <p className="text-gray-500 text-sm">
                            {order?.createdAt}
                          </p>
                        </div>
                        <div className="my-2">
                          <h3 className="text-violet-500">Total Amount</h3>
                          <p className="text-gray-500 text-sm">
                            {order?.totalPrice}{" "}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/admin/order/${order?._id}`}
                        className="border mt-3 md:mt-0 hover:bg-violet-100 bg-violet-200 border-violet-500 rounded-md p-2 text-violet-800 px-4 h-10"
                      >
                        View Order
                      </Link>
                    </div>

                    {/* Order Items/Products */}

                    {order?.orderItems.map((orderItem) => {
                      return (
                        <div className="items py-4 border-b border-gray-200">
                          <div className=" mt-3  gap-10">
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

                    <button
                      className="text-red-600 mx-5 font-semibold font-sans"
                      onClick={() => handleDelete(order?._id)}
                    >
                      Delete Order
                    </button>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default AdminOrders;
