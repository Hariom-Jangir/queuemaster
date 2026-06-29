import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchCustomers = () => api.get('/customers');

export const createCustomer = (name) =>
  api.post('/customers', { name });

export const updateCustomerStatus = (id, status) =>
  api.patch(`/customers/${id}/status`, { status });

export const deleteCustomer = (id) =>
  api.delete(`/customers/${id}`);

export default api;
