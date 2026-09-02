import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
});

// Add a request interceptor to add the JWT token to requests
api.interceptors.request.use(
  (config) => {
    // We'll store the token in localStorage for simplicity in this assessment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('flowboard_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Add a response interceptor to handle 401s (e.g. logout if token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('flowboard_token');
      // window.location.href = '/login'; // Optional: auto redirect
    }
    return Promise.reject(error);
  }
);

export default api;
