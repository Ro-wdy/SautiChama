import api from './api';

/**
 * Transaction Service
 * Handles all transaction-related API calls
 */

// Get all transactions
export const getAllTransactions = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/transactions?${queryParams}` : '/transactions';
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

// Get single transaction by ID
export const getTransactionById = async (transactionId) => {
  try {
    const response = await api.get(`/transactions/${transactionId}`);
    return response;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
};

// Create new transaction
export const createTransaction = async (transactionData) => {
  try {
    const response = await api.post('/transactions', transactionData);
    return response;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

// Update transaction status
export const updateTransactionStatus = async (transactionId, status, approverId) => {
  try {
    const response = await api.patch(`/transactions/${transactionId}/status`, { 
      status, 
      approverId 
    });
    return response;
  } catch (error) {
    console.error('Error updating transaction status:', error);
    throw error;
  }
};

// Approve transaction
export const approveTransaction = async (transactionId, approverId) => {
  try {
    const response = await api.post(`/transactions/${transactionId}/approve`, { 
      approverId 
    });
    return response;
  } catch (error) {
    console.error('Error approving transaction:', error);
    throw error;
  }
};

// Reject transaction
export const rejectTransaction = async (transactionId, approverId, reason) => {
  try {
    const response = await api.post(`/transactions/${transactionId}/reject`, { 
      approverId,
      reason 
    });
    return response;
  } catch (error) {
    console.error('Error rejecting transaction:', error);
    throw error;
  }
};

// Get pending approvals
export const getPendingApprovals = async () => {
  try {
    const response = await api.get('/transactions?status=Pending');
    return response;
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    throw error;
  }
};

// Get transaction statistics
export const getTransactionStats = async (startDate, endDate) => {
  try {
    const response = await api.get(`/transactions/stats?startDate=${startDate}&endDate=${endDate}`);
    return response;
  } catch (error) {
    console.error('Error fetching transaction stats:', error);
    throw error;
  }
};

export default {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransactionStatus,
  approveTransaction,
  rejectTransaction,
  getPendingApprovals,
  getTransactionStats,
};
