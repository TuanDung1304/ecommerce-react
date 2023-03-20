import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
