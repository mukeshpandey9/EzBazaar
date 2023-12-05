import { message } from "antd";
import API from "../../utils/API";
import {
  CLEAR_ERRORS,
  NEW_ORDER_FAIL,
  NEW_ORDER_REQUEST,
  NEW_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ADMIN_ORDERS_REQUEST,
  ADMIN_ORDERS_SUCCESS,
  ADMIN_ORDERS_FAIL,
  DELETE_ORDERS_REQUEST,
  DELETE_ORDERS_FAIL,
  DELETE_ORDERS_SUCCESS,
} from "../constants/orderConstants";
import { Navigate } from "react-router-dom";

export const createOrder =
  ({ shippingInfo, orderItems, totalPrice }) =>
  async (dispatch) => {
    try {
      //   console.log("Inside Order Data", orderData);
      dispatch({ type: NEW_ORDER_REQUEST });
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await API.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/order/new`,
        { shippingInfo, orderItems, totalPrice },
        config
      );

      if (data && data?.success === false) {
        dispatch({
          type: NEW_ORDER_FAIL,
          payload: data.message,
        });
        return;
      }

      if (data && data.success) {
        message.success("Order Success");
        dispatch({ type: NEW_ORDER_SUCCESS });
      }
    } catch (error) {
      console.log("Error in Creating Order: \n", error);
      dispatch({ type: NEW_ORDER_FAIL, payload: error.response.data.message });
    }
  };

// Get User Orders

export const getOrders = () => async (dispatch) => {
  try {
    //   console.log("Inside Order Data", orderData);
    dispatch({ type: GET_ORDER_REQUEST });

    const { data } = await API.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/order/me`
    );

    if (data && data?.success === false) {
      dispatch({
        type: GET_ORDER_FAIL,
        payload: data.message,
      });
      return;
    }

    dispatch({ type: GET_ORDER_SUCCESS, payload: data?.orders });
  } catch (error) {
    console.log("Error in Getting Order: \n", error);
    dispatch({ type: GET_ORDER_FAIL, payload: error.response.data.message });
  }
};

// Get SIngle Order / Order Details

export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    // console.log(orderId);

    const { data } = await API.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/order/${orderId}`
    );

    if (data && data?.success === false) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: data.message,
      });
      return;
    }

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data?.order });
  } catch (error) {
    console.log("Error in Getting Order Details: \n", error);
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get ALl Orders ___ ADMIN

export const getAdminOrders = () => async (dispatch) => {
  try {
    //   console.log("Inside Order Data", orderData);
    dispatch({ type: ADMIN_ORDERS_REQUEST });

    const { data } = await API.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/admin/orders`
    );

    if (data && data?.success === false) {
      dispatch({
        type: ADMIN_ORDERS_FAIL,
        payload: data.message,
      });
      return;
    }

    dispatch({ type: ADMIN_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error in Getting Order: \n", error);
    dispatch({ type: ADMIN_ORDERS_FAIL, payload: error.response.data.message });
  }
};

// Delete Order --- ADMIN

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ORDERS_REQUEST,
    });

    const { data } = await API.delete(`/api/v1/admin/order/${id}`);

    if (data && data.success === false) {
      message.error("Order Deleted Failed");
      dispatch({
        type: DELETE_ORDERS_FAIL,
        payload: data.message,
      });
    }

    if (data && data.success) {
      message.success("Order Deleted Sucsessfully");
      dispatch({
        type: DELETE_ORDERS_SUCCESS,
      });
    }
  } catch (error) {
    console.log(error);
    message.error(error.message);
    dispatch({
      type: DELETE_ORDERS_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

//   Clear Errors

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
