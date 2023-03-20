import { apiClient } from '../apiClient';

export const ProductService = {
  getProducts: async (categoryId) => {
    const res = await apiClient
      .get(`/api/category/${categoryId + 1}/products`)
      .catch((err) => err);
    return res;
  },
  getProductDetail: async (id) => {
    const res = await apiClient.get(`/api/product/${id}`).catch((err) => err);
    return res;
  },
};
