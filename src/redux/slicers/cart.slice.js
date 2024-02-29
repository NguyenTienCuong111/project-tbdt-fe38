import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: JSON.parse(localStorage.getItem("cartList")) || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCartRequest: (state, action) => {
      const { productId, quantity } = action.payload;
      const existProductIndex = state.cartList.findIndex(
        (item) => item.productId === productId
      );
      if (existProductIndex !== -1) {
        state.cartList[existProductIndex].quantity =
          state.cartList[existProductIndex].quantity + quantity;
      } else {
        state.cartList.push(action.payload);
      }
      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },
    updateCartItemRequest: (state, action) => {
      const { productId, quantity } = action.payload;
      const existProductIndex = state.cartList.findIndex(
        (item) => item.productId === productId
      );
      if (existProductIndex !== -1) {
        state.cartList[existProductIndex].quantity = quantity;
      }
      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },
    deleteCartItemRequest: (state, action) => {
      const { productId } = action.payload;
      state.cartList = state.cartList.filter(
        (item) => item.productId !== productId
      );
      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },
    clearCartRequest: (state) => {
      state.cartList = [];
      localStorage.removeItem("cartList");
    },
  },
});

export const {
  addToCartRequest,
  updateCartItemRequest,
  deleteCartItemRequest,
  clearCartRequest,
} = cartSlice.actions;

export default cartSlice.reducer;
