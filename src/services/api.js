// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Helper function for making API requests
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

export default {
  get: (endpoint, options = {}) => apiRequest(endpoint, { method: 'GET', ...options }),
  post: (endpoint, data, options = {}) => apiRequest(endpoint, { 
    method: 'POST', 
    body: JSON.stringify(data),
    ...options 
  }),
  put: (endpoint, data, options = {}) => apiRequest(endpoint, { 
    method: 'PUT', 
    body: JSON.stringify(data),
    ...options 
  }),
  patch: (endpoint, data, options = {}) => apiRequest(endpoint, { 
    method: 'PATCH', 
    body: JSON.stringify(data),
    ...options 
  }),
  delete: (endpoint, options = {}) => apiRequest(endpoint, { method: 'DELETE', ...options }),
};
