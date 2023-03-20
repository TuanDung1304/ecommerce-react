import { secureApi } from '../apiClient';

export const CartService = {
  addProduct: async (id, quantity) => {
    const res = await secureApi
      .post('/api/cart/add-cart', {
        product_id: id,
        quantity,
      })
      .catch((err) => err);
    return res;
  },
  getCartItems: async () => {
    const res = await secureApi.get('/api/cart').catch((err) => err);
    return res;
  },
  removeProduct: async (id) => {
    const res = await secureApi
      .delete(`/api/cart/remove/cart-item/${id}`)
      .catch((err) => err);
    return res;
  },
};
