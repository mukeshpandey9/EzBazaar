import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API";

export const createAddress = createAsyncThunk(
  "address/create",
  async (shippingInfo, { rejectWithValue }) => {
    try {
      console.log(shippingInfo);
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await API.post(
        `/api/v1/address/new`,
        shippingInfo,
        config
      );

      if (data && data?.success) {
        return data; // Return response data if needed
      }

      return rejectWithValue(data?.message);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get all oll of the user addresses

export const getAddress = createAsyncThunk(
  "address/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/api/v1/address/me`);

      if (data && data?.success) {
        return data; // Return response data if needed
      }

      return rejectWithValue(data?.message);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
