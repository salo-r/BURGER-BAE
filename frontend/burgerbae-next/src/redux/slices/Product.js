import { productApi } from "../../mocks/ProductApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: {},
  paginator:{},
  isLoading: false,
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductList(state, action) {
      state.products = action.payload.data.data; 
      state.paginator = action.payload.data.paginator;
    },
    getProduct(state, action) {
      state.product = action.payload.data;
    },
     clearProductList(state) {
      state.products = [];   // empty it
    }
  },
});
export const { reducer } = ProductSlice;
export const { clearProductList } = ProductSlice.actions;

export const getProductList = (page, limit, filter) => async (dispatch) => {
  try {
    console.log("currently you are in getProductList thunk of product slice");
    const result = await productApi.getProductList(page, limit, filter);
    
    if (result) {
      await dispatch(ProductSlice.actions.getProductList(result));
    } else {
      await dispatch(ProductSlice.actions.getProductList(result));
    }
  } catch (err) {
    console.log(err);
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    const result = await productApi.getProduct(id);
    console.log("result:", result);
    if (result) {
      await dispatch(ProductSlice.actions.getProduct(result));
     } else {
      await dispatch(ProductSlice.actions.getProduct(result));
     }
   } catch (err) {
     console.log(err);
   }
}