import api from './api';

/**
 * Chama Service
 * Handles chama registration and settings
 */

// Register new chama (from landing page signup)
export const registerChama = async (chamaData) => {
  try {
    const response = await api.post('/chamas/register', chamaData);
    return response;
  } catch (error) {
    console.error('Error registering chama:', error);
    throw error;
  }
};

// Get chama details
export const getChamaDetails = async (chamaId) => {
  try {
    const response = await api.get(`/chamas/${chamaId}`);
    return response;
  } catch (error) {
    console.error('Error fetching chama details:', error);
    throw error;
  }
};

// Update chama settings
export const updateChamaSettings = async (chamaId, settings) => {
  try {
    const response = await api.put(`/chamas/${chamaId}/settings`, settings);
    return response;
  } catch (error) {
    console.error('Error updating chama settings:', error);
    throw error;
  }
};

// Get chama statistics
export const getChamaStats = async (chamaId) => {
  try {
    const response = await api.get(`/chamas/${chamaId}/stats`);
    return response;
  } catch (error) {
    console.error('Error fetching chama stats:', error);
    throw error;
  }
};

// Contact form submission
export const submitContactForm = async (contactData) => {
  try {
    const response = await api.post('/contact', contactData);
    return response;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

// Get all chamas (for admin overview)
export const getAllChamas = async () => {
  try {
    const response = await api.get('/chamas');
    return response;
  } catch (error) {
    console.error('Error fetching all chamas:', error);
    throw error;
  }
};

// Get chama members count
export const getChamaMembers = async (chamaId) => {
  try {
    const response = await api.get(`/chamas/${chamaId}/members`);
    return response;
  } catch (error) {
    console.error('Error fetching chama members:', error);
    throw error;
  }
};

// Test API connection
export const testApiConnection = async () => {
  try {
    const response = await api.get('/health');
    return response;
  } catch (error) {
    console.error('Error testing API connection:', error);
    throw error;
  }
};

export default {
  registerChama,
  getChamaDetails,
  updateChamaSettings,
  getChamaStats,
  submitContactForm,
  testApiConnection,
  getAllChamas,
  getChamaMembers,
};
