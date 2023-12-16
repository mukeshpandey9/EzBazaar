import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API";

// Get Product Details
export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/api/v1/product/${id}`);
      return data?.product;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Get All Products
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (
    { keyword = "", currentPage = 1, price = [0, 50000], category },
    { rejectWithValue }
  ) => {
    console.log("Inside the action");

    try {
      console.log("Inside the action Try");
      let url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      if (category) {
        url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
      }

      const { data } = await API.get(url);
      return data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error?.message);
    }
  }
);

// Get All Admin Products
export const getAdminProducts = createAsyncThunk(
  "products/getAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/api/v1/admin/products`);
      return data ?? {};
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);

// Create Product (Admin)
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "multipart/form-data" },
      };

      await API.post(`/api/v1/admin/product/new`, formData, config);
      return;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);

// Delete Product (Admin)
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/api/v1/admin/product/${id}`);

      if (data?.success === false) {
        return rejectWithValue(data?.message);
      }

      return;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Create Review
export const createReview = createAsyncThunk(
  "products/createReview",
  async ({ rating, comment, productId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await API.put(
        `/api/v1/review`,
        { rating, comment, productId },
        config
      );

      if (data?.success) {
        return;
      } else {
        return rejectWithValue(data?.message);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);

// These actions use createAsyncThunk to handle the API calls and dispatch actions to your Redux store based on success or failure.
// Adjust error handling and payload extraction as per your API response structure and error messages.
// Replace the paths and API methods with your actual API routes and methods.
