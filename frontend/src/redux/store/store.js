import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { productDetailReducer, reviewProduct } from "../reducers/productSlice";

import productReducers from "../reducers/productSlice";

import { updateProfileReducer, userReducer } from "../reducers/userReducer";
import { cartDeleteReducer, cartReducer } from "../reducers/cartReducer";
import {
  deleteOrderReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "../reducers/orderReducer";

const reducer = combineReducers({
  products: productReducers.reducer,
  productDetails: productDetailReducer,
  user: userReducer,
  profile: updateProfileReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  order: orderReducer,
  delOrder: deleteOrderReducer,
  delCart: cartDeleteReducer,
  orderDetails: orderDetailsReducer,
  review: reviewProduct,
});

let initialState = {};

const middleware = [thunk];
// composeWithDevTools(applyMiddleware(middleware));

const store = configureStore({ reducer, preloadedState: initialState });

export default store;
