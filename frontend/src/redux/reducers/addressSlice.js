import { createSlice } from "@reduxjs/toolkit";
import { createAddress, getAddress } from "../actions/addressAction";

export const addressReducer = createSlice({
  name: "address",
  initialState: {
    loading: false,
    success: false,
    address: {},
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.address = action.payload.address;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(getAddress.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.address = action.payload.address;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors } = addressReducer.actions;
