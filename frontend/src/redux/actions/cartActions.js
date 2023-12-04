import API from "../../utils/API";
import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  CLEAR_ERRORS,
  GET_CART_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_FAIL,
  REMOVE_CART_REQUEST,
  REMOVE_CART_SUCCESS,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAIL,
} from "../constants/addToCartConstants";

// Add TO CArt

export const addToCart = (productId, qty) => async (dispatch) => {
  try {
    //
    console.log("Add to Cart ACtion");
    dispatch({
      type: ADD_TO_CART_REQUEST,
    });

    const config = {
      headers: { "Content-type": "application/json" },
    };

    await API.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/cart/add`,
      { productId, qty },
      config
    );

    dispatch({ type: ADD_TO_CART_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Cart Items

export const getCart = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CART_REQUEST,
    });

    const { data } = await API.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/cart`
    );

    if (data) {
      dispatch({ type: GET_CART_SUCCESS, payload: data?.cartItem });
    }
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Remove items From Cart

export const removeFromCart = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_CART_REQUEST,
    });

    await API.delete(
      `${process.env.REACT_APP_BASE_URL}/api/v1/cart/remove/${productId}`
    );

    dispatch({ type: REMOVE_CART_SUCCESS });
  } catch (error) {
    dispatch({
      type: REMOVE_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Cart

export const updateCart = (productId, qty) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CART_REQUEST,
    });

    const config = {
      headers: { "Content-type": "application/json" },
    };
    console.log(productId, "  ", qty);
    const { data } = await API.put(
      `${process.env.REACT_APP_BASE_URL}/api/v1/cart/update`,
      { productId, qty },
      config
    );

    if (data) {
      dispatch({ type: UPDATE_CART_SUCCESS, payload: data?.updatedCartItem });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearCart = () => async (dispatch) => {
  try {
    await API.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/cart/clear`);
  } catch (error) {
    console.log("Error in clearing Cart: ", error);
  }
};

//   Clearing errors

export const clearCartErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
