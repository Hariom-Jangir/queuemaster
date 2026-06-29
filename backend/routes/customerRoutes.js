import { Router } from 'express';
import {
  getCustomers,
  createCustomer,
  updateCustomerStatus,
  deleteCustomer,
} from '../controllers/customerController.js';
import {
  validateCreateCustomer,
  validateCustomerId,
  validateUpdateStatus,
} from '../middleware/validateCustomer.js';

const router = Router();

router.get('/', getCustomers);
router.post('/', validateCreateCustomer, createCustomer);
router.patch('/:id/status', validateUpdateStatus, updateCustomerStatus);
router.delete('/:id', validateCustomerId, deleteCustomer);

export default router;
