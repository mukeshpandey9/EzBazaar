import {
  CLEAR_ERRORS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  NEW_ORDER_FAIL,
  NEW_ORDER_REQUEST,
  NEW_ORDER_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from "../constants/orderConstants";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_ORDER_REQUEST:
    case GET_ORDER_REQUEST:
      return {
        loading: true,
        success: false,
        orders: [],
      };

    case NEW_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case GET_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
        success: true,
      };

    case NEW_ORDER_FAIL:
    case GET_ORDER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
        success: false,
        order: {},
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        success: false,
        order: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
