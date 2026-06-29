import { useCallback, useEffect, useState } from 'react';
import {
  fetchCustomers,
  createCustomer,
  updateCustomerStatus,
  deleteCustomer,
} from '../api/customerApi.js';

const getErrorMessage = (error) =>
  error.response?.data?.error ||
  error.response?.data?.message ||
  error.message ||
  'Something went wrong';

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const isBusy = isLoading || isSubmitting;

  const loadCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await fetchCustomers();
      setCustomers(data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const addCustomer = async (name) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const { data } = await createCustomer(name);
      setCustomers((prev) => [...prev, data.data]);
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const changeStatus = async (id, status) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const { data } = await updateCustomerStatus(id, status);
      setCustomers((prev) =>
        prev.map((customer) => (customer.id === id ? data.data : customer))
      );
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeCustomer = async (id) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await deleteCustomer(id);
      setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    customers,
    isLoading,
    isSubmitting,
    isBusy,
    error,
    setError,
    loadCustomers,
    addCustomer,
    changeStatus,
    removeCustomer,
  };
};
