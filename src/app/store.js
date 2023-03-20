import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../store/userSlice';
import productSlice from '../store/productSlice';
import cartSlice from '../store/cartSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    cart: cartSlice,
  },
});
