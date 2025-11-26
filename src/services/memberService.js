import api from './api';

/**
 * Member Service
 * Handles all member-related API calls
 */

// Get all members
export const getAllMembers = async () => {
  try {
    const response = await api.get('/members');
    return response;
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
};

// Get single member by ID
export const getMemberById = async (memberId) => {
  try {
    const response = await api.get(`/members/${memberId}`);
    return response;
  } catch (error) {
    console.error('Error fetching member:', error);
    throw error;
  }
};

// Create new member
export const createMember = async (memberData) => {
  try {
    const response = await api.post('/members', memberData);
    return response;
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
};

// Update member
export const updateMember = async (memberId, memberData) => {
  try {
    const response = await api.put(`/members/${memberId}`, memberData);
    return response;
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
};

// Delete member
export const deleteMember = async (memberId) => {
  try {
    const response = await api.delete(`/members/${memberId}`);
    return response;
  } catch (error) {
    console.error('Error deleting member:', error);
    throw error;
  }
};

// Update member balance
export const updateMemberBalance = async (memberId, amount, type) => {
  try {
    const response = await api.patch(`/members/${memberId}/balance`, { amount, type });
    return response;
  } catch (error) {
    console.error('Error updating member balance:', error);
    throw error;
  }
};

// Get member transaction history
export const getMemberTransactions = async (memberId) => {
  try {
    const response = await api.get(`/members/${memberId}/transactions`);
    return response;
  } catch (error) {
    console.error('Error fetching member transactions:', error);
    throw error;
  }
};

export default {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  updateMemberBalance,
  getMemberTransactions,
};
