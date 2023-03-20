import axios from 'axios';

// const BASE_URL = 'https://auth-vercel.vercel.app';
const BASE_URL = 'http://127.0.0.1:8000';

const axiosConfig = {
  headers: {
    // Accept: 'application/json',
    // 'Content-Type': 'application/json',
    // 'access-control-allow-origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    // 'Access-Control-Allow-Credentials': true,
    // 'Access-Control-Allow-Headers':
    //   'Origin, Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Allow-Headers, Access-Control-Request-Headers, Access-Control-Request-Method',
  },
  timeout: 2 * 60 * 1000,
};

/**
 * Authorizations
 */
const secureApi = axios.create({
  ...axiosConfig,
  baseURL: BASE_URL,
});

const onRequest = (config) => {
  const newConfig = { ...config };
  const token =
    'Bearer ' + JSON.parse(localStorage.getItem('token') || '').token;
  newConfig.headers.Authorization = token;
  return newConfig;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

secureApi.interceptors.request.use(onRequest, onRequestError);

/**
 * No Authorizations
 */
const apiClient = axios.create({
  ...axiosConfig,
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

export { apiClient, secureApi };
