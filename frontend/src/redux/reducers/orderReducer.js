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
  ADMIN_ORDERS_REQUEST,
  ADMIN_ORDERS_SUCCESS,
  ADMIN_ORDERS_FAIL,
  DELETE_ORDERS_REQUEST,
  DELETE_ORDERS_FAIL,
  DELETE_ORDERS_SUCCESS,
  DELETE_ORDERS_RESET,
} from "../constants/orderConstants";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_ORDER_REQUEST:
    case GET_ORDER_REQUEST:
    case ADMIN_ORDERS_REQUEST:
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

    case ADMIN_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
        success: true,
      };

    case NEW_ORDER_FAIL:
    case GET_ORDER_FAIL:
    case ADMIN_ORDERS_FAIL:
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

export const deleteOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ORDERS_REQUEST:
      return {
        loading: true,
        success: false,
      };

    case DELETE_ORDERS_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case DELETE_ORDERS_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    case DELETE_ORDERS_RESET:
      return {
        ...state,
        success: false,
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

export const newOrderReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case NEW_ORDER_REQUEST:
      return {
        loading: true,
        success: false,
      };

    case NEW_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case NEW_ORDER_FAIL:
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
