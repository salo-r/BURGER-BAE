import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginOpen: false,
  isCartOpen: false,
  isSearchOpen: false,
};

export const UiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoginOpen: (state, action) => {
      state.isLoginOpen = action.payload;
    },
    setCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    setSearchOpen: (state, action) => {
      state.isSearchOpen = action.payload;
    },
  },
});

export const { setLoginOpen, setCartOpen, setSearchOpen } = UiSlice.actions;
export default UiSlice.reducer;
