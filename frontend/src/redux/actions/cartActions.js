import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API";
import { message } from "antd";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, qty }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await API.post(
        `/api/v1/cart/add`,
        { productId, qty },
        config
      );
      if (data && data.success === false) {
        return rejectWithValue(data?.message || "Error in Adding Item to Cart");
      }
      message.success("Item Added To Cart SuccessFully");
      return;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/api/v1/cart`);
      return data?.cartItem;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/api/v1/cart/remove/${productId}`);
      if (data && data.success === false) {
        return rejectWithValue(
          data?.message || "Error in Removing Item from Cart"
        );
      }
      message.success("Item Removed");
      return;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, qty }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/api/v1/cart/update`, { productId, qty });
      message.success("Cart Updated");
      return data?.updatedCartItem;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCartItems",
  async (_, { rejectWithValue }) => {
    try {
      await API.delete(`/api/v1/cart/clear`);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
      console.log("Error in clearing Cart: ", error);
    }
  }
);
