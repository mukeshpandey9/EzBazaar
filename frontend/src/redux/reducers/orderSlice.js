import { createSlice } from "@reduxjs/toolkit";
import {
  getOrderDetails,
  createOrder,
  deleteOrder,
  getAdminOrders,
  getOrders,
} from "../actions/orderActions";

export const orderReducer = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    success: false,
    orders: [],
    totalAmount: 0,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(getAdminOrders.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orders = action.payload.orders;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(getAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const orderDetailsReducer = createSlice({
  name: "orderDetails",
  initialState: {
    loading: false,
    success: false,
    order: {},
    error: null,
  },
  reducers: {
    clearOrderDetailsErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.order = {};
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const deleteOrderReducer = createSlice({
  name: "deleteOrder",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetDeleteOrder: (state) => {
      state.success = false;
    },
    clearDeleteOrderError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const newOrderReducer = createSlice({
  name: "newOrder",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearNewOrderErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetDeleteOrder, clearDeleteOrderError } =
  deleteOrderReducer.actions;

export const { clearOrderDetailsErrors } = orderDetailsReducer.actions;
export const { clearNewOrderErrors } = newOrderReducer.actions;
export const { clearErrors } = orderReducer.actions;
