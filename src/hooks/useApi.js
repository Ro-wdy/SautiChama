import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/Toast';

/**
 * Custom hook for API calls with loading, error handling, and toast notifications
 * 
 * @param {Function} apiFunction - The API service function to call
 * @param {Object} options - Configuration options
 * @returns {Object} - { data, loading, error, execute, reset }
 */
export const useApi = (apiFunction, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToast();

  const {
    onSuccess,
    onError,
    successMessage,
    errorMessage,
    showSuccessToast = true,
    showErrorToast = true,
  } = options;

  const execute = useCallback(
    async (...params) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFunction(...params);
        setData(result);

        // Call success callback if provided
        if (onSuccess) {
          onSuccess(result);
        }

        // Show success toast
        if (showSuccessToast && successMessage) {
          addToast(successMessage, 'success');
        }

        return result;
      } catch (err) {
        const errorMsg = err.message || errorMessage || 'An error occurred';
        setError(errorMsg);

        // Call error callback if provided
        if (onError) {
          onError(err);
        }

        // Show error toast
        if (showErrorToast) {
          addToast(errorMsg, 'error');
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, onSuccess, onError, successMessage, errorMessage, showSuccessToast, showErrorToast, addToast]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};

/**
 * Hook specifically for fetching data on component mount
 * 
 * @param {Function} apiFunction - The API service function to call
 * @param {Array} dependencies - Dependencies array for re-fetching
 * @param {Object} options - Configuration options
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useFetch = (apiFunction, dependencies = [], options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiFunction();
      setData(result);
      return result;
    } catch (err) {
      const errorMsg = err.message || 'Failed to fetch data';
      setError(errorMsg);
      
      if (options.showErrorToast !== false) {
        // Could add toast here if needed
        console.error('Fetch error:', errorMsg);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, options.showErrorToast]);

  // Fetch on mount and when dependencies change
  useState(() => {
    if (options.fetchOnMount !== false) {
      fetchData();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useApi;
