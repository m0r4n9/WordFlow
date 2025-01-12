import axios from 'axios';

const baseUrl = import.meta.env.VITE_IS_PRODUCTION
  ? import.meta.env.VITE_API_URL_PRODUCTION
  : (import.meta.env.VITE_API_URL_DEV ?? 'http://localhost:8080/api');

export const $api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
