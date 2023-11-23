import axios from "axios";
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
} from "../constants/orderConstants";

export const createOrder =
  ({ shippingInfo, orderItems, totalPrice }) =>
  async (dispatch) => {
    try {
      //   console.log("Inside Order Data", orderData);
      dispatch({ type: NEW_ORDER_REQUEST });
      const config = { headers: { "Content-type": "application/json" } };

      const { data } = await axios.post(
        "/api/v1/order/new",
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

      dispatch({ type: NEW_ORDER_SUCCESS });
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

    const { data } = await axios.get("/api/v1/order/me");

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

    const { data } = await axios.post(`/api/v1/order/${orderId}`);

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

//   Clear Errors

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
