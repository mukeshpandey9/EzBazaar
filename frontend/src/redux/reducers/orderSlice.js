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

// export const orderReducer = (state = {}, action) => {
//   switch (action.type) {
//     case NEW_ORDER_REQUEST:
//     case GET_ORDER_REQUEST:
//     case ADMIN_ORDERS_REQUEST:
//       return {
//         loading: true,
//         success: false,
//         orders: [],
//       };

//     case NEW_ORDER_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//       };

//     case GET_ORDER_SUCCESS:
//       return {
//         loading: false,
//         orders: action.payload,
//         success: true,
//       };

//     case ADMIN_ORDERS_SUCCESS:
//       return {
//         loading: false,
//         orders: action.payload.orders,
//         totalAmount: action.payload.totalAmount,
//         success: true,
//       };

//     case NEW_ORDER_FAIL:
//     case GET_ORDER_FAIL:
//     case ADMIN_ORDERS_FAIL:
//       return {
//         loading: false,
//         success: false,
//         error: action.payload,
//       };
//     case CLEAR_ERRORS:
//       return {
//         loading: false,
//         error: null,
//       };

//     default:
//       return state;
//   }
// };

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

// export const orderDetailsReducer = (state = { order: {} }, action) => {
//   switch (action.type) {
//     case ORDER_DETAILS_REQUEST:
//       return {
//         loading: true,
//         success: false,
//         order: {},
//       };

//     case ORDER_DETAILS_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//         order: action.payload,
//       };

//     case ORDER_DETAILS_FAIL:
//       return {
//         loading: false,
//         success: false,
//         order: action.payload,
//       };

//     case CLEAR_ERRORS:
//       return {
//         loading: false,
//         error: null,
//       };

//     default:
//       return state;
//   }
// };

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

// export const deleteOrderReducer = (state = {}, action) => {
//   switch (action.type) {
//     case DELETE_ORDERS_REQUEST:
//       return {
//         loading: true,
//         success: false,
//       };

//     case DELETE_ORDERS_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//       };

//     case DELETE_ORDERS_FAIL:
//       return {
//         loading: false,
//         success: false,
//         error: action.payload,
//       };

//     case DELETE_ORDERS_RESET:
//       return {
//         ...state,
//         success: false,
//       };
//     case CLEAR_ERRORS:
//       return {
//         loading: false,
//         error: null,
//       };

//     default:
//       return state;
//   }
// };

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

// export const newOrderReducer = (
//   state = { loading: false, success: false },
//   action
// ) => {
//   switch (action.type) {
//     case NEW_ORDER_REQUEST:
//       return {
//         loading: true,
//         success: false,
//       };

//     case NEW_ORDER_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//       };

//     case NEW_ORDER_FAIL:
//       return {
//         loading: false,
//         success: false,
//         error: action.payload,
//       };
//     case CLEAR_ERRORS:
//       return {
//         loading: false,
//         error: null,
//       };

//     default:
//       return state;
//   }
// };
