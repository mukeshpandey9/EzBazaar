import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
} from "../constants/productContants";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,

        products: [],
      };

    case DELETE_PRODUCT_REQUEST:
      return {
        loading: true,

        success: false,
      };

    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.product,
        productsCount: action.payload.productCount,
        resultPerpage: action.payload.resultPerpage,
        filteredProductCount: action.payload.filteredProductCount,
      };

    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.product,
        productsCount: action.payload.productCount,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ALL_PRODUCT_FAIL:
    case ADMIN_PRODUCT_FAIL:
    case DELETE_PRODUCT_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const productDetailReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
