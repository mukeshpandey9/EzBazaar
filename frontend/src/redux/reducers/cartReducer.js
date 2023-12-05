import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/addToCartConstants";

import {
  GET_CART_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_FAIL,
  REMOVE_CART_REQUEST,
  REMOVE_CART_SUCCESS,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAIL,
  REMOVE_CART_RESET,
} from "../constants/addToCartConstants";

// Add Items TO Cart

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
    case GET_CART_REQUEST:
    case UPDATE_CART_REQUEST:
      return {
        cartLoading: true,
        success: false,
      };

    case REMOVE_CART_REQUEST:
      return {
        cartLoading: true,
        success: false,
      };

    case ADD_TO_CART_SUCCESS:
    case REMOVE_CART_SUCCESS:
      return {
        cartLoading: false,
        success: true,
      };

    case GET_CART_SUCCESS:
    case UPDATE_CART_SUCCESS:
      return {
        cartLoading: false,
        success: true,
        cart: action.payload,
      };

    case ADD_TO_CART_FAIL:
    case GET_CART_FAIL:
    case REMOVE_CART_FAIL:
    case UPDATE_CART_FAIL:
      return {
        cartLoading: false,
        success: false,
        cartError: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        cartError: null,
      };

    default:
      return state;
  }
};

export const cartDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_CART_REQUEST:
      return {
        loading: true,
        success: false,
      };

    case REMOVE_CART_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case REMOVE_CART_FAIL:
      return {
        loading: false,
        success: false,
        cartError: action.payload,
      };

    case REMOVE_CART_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        cartError: null,
      };

    default:
      return state;
  }
};
