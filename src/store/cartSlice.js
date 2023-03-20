import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existItemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existItemIndex === -1) {
        return [...state, { ...action.payload, qty: 1 }];
      }
      state[existItemIndex].qty += 1;
    },
    decreaseQty: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (state[index].qty > 1) {
        state[index].qty = state[index].qty - 1;
      } else {
        state.splice(index, 1);
      }
    },
    removeItem: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

export const { addToCart, decreaseQty, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
