import { CartApi } from "@/mocks/cartApi";
import { productApi } from "@/mocks/ProductApi";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  items: [],
  relatedItems: [],
  qty: 0,
  totalMrp: 0,
  totalDiscount: 0,
  GrandTotal: 0,
  
};
const CartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    getCartList: (state, action) => {
      // console.log("data", action.payload.data);

      state.items = action.payload.data || [];
        console.log("data", action.payload);

    }
    ,
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      const itemIndex = state.items.findIndex((item) =>
        size ? item.id === id && item.size === size : item.id === id,
      );

      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
        // Recalculate totals
        state.totalCost = state.items.reduce(
          (sum, item) => sum + item.totalPrice,
          0,
        );
        state.totalMrp = state.items.reduce(
          (sum, item) => sum + item.priceBeforeDiscount * item.quantity,
          0,
        );
        state.totalDiscount = state.items.reduce(
          (sum, item) => sum + item.discount,
          0,
        );
      }
    },
    updateCart: (state, action) => {
      const { id, data } = action.payload;
      const item = state.items.data.find(i => i._id === id);

      if (item) {
        item.products[0].qty = data["qty"];
      }
    },
    AddrelatedItems: (state, action) => {
      state.relatedItems = action.payload;
    },

    emptyCart:(state)=>{
      state.items = [];
      state.relatedItems = [];
      state.qty = 0;
      state.totalMrp = 0;
      state.totalDiscount = 0;
      state.GrandTotal = 0;
    }
  }
});

export const cartList = () => async (dispatch) => {
  try {
    console.log(" currently you are in cartList thunk of cart slice");
    const response = await CartApi.cartList();
    console.log("Cart list response:", response);

   if (response?.status === "SUCCESS") {
        await dispatch(CartSlice.actions.getCartList(response));
      } else {
        console.log("response status of cart api is not success.......");
       await dispatch(CartSlice.actions.getCartList(response));
      }
  } catch (err) {
    console.log(err);
  }
}


export const updateCartThunk = (id, data) => async (dispatch) => {
  try {
    const response = await CartApi.updateCart(id, data);
    if (response.status === "SUCCESS") {
      dispatch(CartSlice.actions.updateCart({ id, data }));
    } else {
      console.log("response status of cart api is not success.......");
    }
  } catch (err) {
    console.log("error in updating cart item", err);
  }
};

export const removeFromCartThunk = (productData) => async (dispatch) => {
  try {
    const response = await CartApi.removeFromCart(
      productData.id,
      productData.size,
    );

    if (response.status === "SUCCESS") {
      dispatch(
        CartSlice.actions.removeFromCart({
          id: productData.id,
          size: productData.size,
        }),
      );
    }
  } catch (err) {
    console.log("error removing from cart", err);
  }
};

export const emptyCartThunk = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const cartItems = state.cart.items?.data || [];
    
    for (const item of cartItems) {
      await CartApi.removeFromCart(item._id || item.id);
    }
    
    dispatch(CartSlice.actions.emptyCart());
  } catch (err) {
    console.log("error emptying cart from backend", err);
  }
};

export const fetchRelatedItems = () => async (dispatch, getState) => {
  try {
    console.log("you are in fetchRelatedItems thunk........");

    const state = getState();
    const cartItems = state.cart.items || [];

    console.log("cartItems in fetchRelatedItems ", cartItems);

    if (!cartItems?.data?.length) return;

    // ✅ Step 1: unique categories
    const categories = [
      ...new Set(
        cartItems?.data?.map(item => item.products[0].productId.category)
      )
    ];

    console.log("categories", categories);

    let finalRelatedItems = [];

    // ✅ Step 2: loop categories
    for (let category of categories) {

      const res = await productApi.getProductList(1, 6, { category });

      console.log("res", res);
      if (res?.status !== "SUCCESS") continue;

      const products = res?.data?.data || [];
      console.log("products", products);
      // ✅ Step 3: remove items already in cart
      const filtered = products.filter(product =>
        !cartItems?.data?.some(cartItem =>
          cartItem.products[0].productId._id === product.id
        )
      );
      console.log("filtered", filtered);

      // ✅ Step 4: pick 2 items
      const limited = filtered.slice(0, 2);

      finalRelatedItems.push(...limited);
    }

    // ✅ Step 5: store
    dispatch(CartSlice.actions.AddrelatedItems(finalRelatedItems));

  } catch (err) {
    console.log("Error fetching related items", err);
  }
};

export const { emptyCart, removeFromCart, updateCart , getCartList, AddrelatedItems} =
  CartSlice.actions;
export default CartSlice.reducer;
