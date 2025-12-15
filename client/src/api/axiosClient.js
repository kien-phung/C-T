import axios from 'axios';

// Determine API URL based on current location (always use local backend)
const protocol = window.location.protocol;
const hostname = window.location.hostname;
let API_URL = `${protocol}//${hostname}:4040`;

// For production domains, try to use backend on same domain with /api path
if (hostname.includes('thanhtoanct.com') || hostname.includes('yourdomain.com')) {
  // Backend is proxied via same domain under /api path; keep baseURL at domain root
  // so that individual API calls like '/api/...'
  // do not become '/api/api/...'
  API_URL = `${protocol}//${hostname}`;
}

// Log API URL for debugging
console.log('🔗 API_URL:', API_URL);
console.log('📱 Environment:', import.meta.env.MODE);
console.log('🌍 Current URL:', window.location.href);

// Create axios instance
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds for mobile
  withCredentials: false, // Disable credentials to avoid CORS issues
});

// Request interceptor - Add auth token if exists
axiosClient.interceptors.request.use(
  (config) => {
    console.log('🚀 Request:', {
      method: config.method?.toUpperCase(),
      url: config.baseURL + config.url,
      headers: config.headers,
      data: config.data
    });
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 - Token expired or invalid
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url || '';
      const isLoginAttempt = requestUrl.includes('/api/admin/auth/login');
      const isOnLoginPage = window.location.pathname.includes('/admin/login');

      // Do NOT redirect on failed login attempts; let the page show inline error
      if (isLoginAttempt) {
        return Promise.reject(error);
      }

      // For other 401s, clear auth and redirect only if not already on login page
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminEmail');
      if (!isOnLoginPage) {
        window.location.href = '/admin/login';
      }
    }

    // Handle 403 - Forbidden
    if (error.response?.status === 403) {
      console.error('Access denied');
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
