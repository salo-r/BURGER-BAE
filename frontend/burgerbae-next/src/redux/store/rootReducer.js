import { combineReducers } from "@reduxjs/toolkit";
import { reducer as authReducer } from "../slices/auth";
import { reducer as ProductReducer }from "../slices/Product"
// import { reducer as cartReducer } from "../slices/cart";
import cartReducer from '../slices/cart';
import paymentReducer from '../slices/payment';

export const rootReducer = combineReducers({
  auth: authReducer,
  product: ProductReducer,
  cart: cartReducer,
  payment: paymentReducer,
});
