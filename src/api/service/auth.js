import { apiClient, secureApi } from '../apiClient';

export const AuthService = {
  login: async (data) => {
    const res = await apiClient
      .post('/api/login', data)
      .catch((error) => error);
    return res;
  },
  register: async (data) => {
    const res = await apiClient
      .post('/api/register', data)
      .catch((error) => error);
    return res;
  },
  userProfile: async () => {
    const res = await secureApi.get('/api/users/info').catch((err) => err);
    return res;
  },
};
