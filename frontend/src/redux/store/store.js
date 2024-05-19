import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { productDetailReducer, reviewProduct } from "../reducers/productSlice";

import productReducer from "../reducers/productSlice";

import {
  getAllUsersReducer,
  updateProfileReducer,
  userReducer,
} from "../reducers/userSlice";
import { cartDeleteReducer, cartReducer } from "../reducers/cartSlice";
import {
  deleteOrderReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "../reducers/orderSlice";
import { addressReducer } from "../reducers/addressSlice";

// const reducer = combineReducers({});

let initialState = {};

const middleware = [thunk];
// composeWithDevTools(applyMiddleware(middleware));

const store = configureStore({
  reducer: {
    products: productReducer.reducer,
    productDetails: productDetailReducer.reducer,
    user: userReducer.reducer,
    profile: updateProfileReducer.reducer,
    cart: cartReducer.reducer,
    newOrder: newOrderReducer.reducer,
    order: orderReducer.reducer,
    delOrder: deleteOrderReducer.reducer,
    delCart: cartDeleteReducer.reducer,
    orderDetails: orderDetailsReducer.reducer,
    review: reviewProduct.reducer,
    address: addressReducer.reducer,
    allUsers: getAllUsersReducer.reducer,
  },
  preloadedState: initialState,
});

export default store;
