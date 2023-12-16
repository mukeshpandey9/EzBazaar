import { createSlice } from "@reduxjs/toolkit";
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
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../actions/cartActions";

// Add Items TO Cart

export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cartLoading: false,
    success: false,
    cart: null,
    cartError: null,
  },
  reducers: {
    clearCartErrors(state) {
      state.cartError = null;
    },
    removeCartReset(state) {
      state.cartLoading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.cartLoading = true;
        state.success = false;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.cartLoading = false;
        state.success = true;
      })
      .addCase(getCart.pending, (state) => {
        state.cartLoading = true;
        state.success = false;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.success = true;
        state.cart = action.payload;
      })
      .addCase(updateCart.pending, (state) => {
        state.cartLoading = true;
        state.success = false;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.success = true;
        state.cart = action.payload;
      })
      .addMatcher(
        (action) =>
          [addToCart.rejected, getCart.rejected, updateCart.rejected].includes(
            action.type
          ),
        (state, action) => {
          state.cartLoading = false;
          state.success = false;
          state.cartError = action.payload;
        }
      );
  },
});

export const cartDeleteReducer = createSlice({
  name: "removeCartItem",
  initialState: {
    loading: false,
    success: false,
    cartError: null,
  },
  reducers: {
    clearCartErrors(state) {
      state.cartError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeFromCart.pending, getCart.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(removeFromCart.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.cartError = action.payload;
      });
  },
});

export const { clearCartErrors, removeCartReset } = cartReducer.actions;
