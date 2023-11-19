import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  productDetailReducer,
  productReducer,
} from "../reducers/productReducer";
import { updateProfileReducer, userReducer } from "../reducers/userReducer";
import { cartReducer } from "../reducers/cartReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailReducer,
  user: userReducer,
  profile: updateProfileReducer,
  cart: cartReducer,
});

let initialState = {};

const middleware = [thunk];
// composeWithDevTools(applyMiddleware(middleware));

const store = configureStore({ reducer, preloadedState: initialState });

export default store;
