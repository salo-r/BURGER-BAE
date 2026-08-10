import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paymentDetails: null,
}

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    storePaymentDetails : (state, action) => {
      
      state.paymentDetails = action.payload;
    },
    
clearPaymentDetails: (state) => {
  state.paymentDetails = null;
}
  }
})

export const { storePaymentDetails, clearPaymentDetails } = paymentSlice.actions;
export default paymentSlice.reducer;    