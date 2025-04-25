import axios from 'axios';
import { isAuthenticated } from './auth';

// Create an axios instance with custom config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:44361/api', // default fallback URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Check if user is authenticated
    if (isAuthenticated()) {
      const token = localStorage.getItem('authToken');
      // Add token to request headers
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
