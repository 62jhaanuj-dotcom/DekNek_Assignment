import axios from 'axios';

const defaultApiUrl = import.meta.env.PROD
  ? 'https://deknek-assignment-i5zo.onrender.com/api/v1'
  : 'http://localhost:5000/api/v1';
const rawApiUrl = import.meta.env.VITE_API_URL || defaultApiUrl;

const normalizedApiUrl = rawApiUrl.replace(/\/$/, '');
const baseURL = normalizedApiUrl.endsWith('/api/v1')
  ? normalizedApiUrl
  : `${normalizedApiUrl}/api/v1`;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
