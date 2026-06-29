import { body, param, validationResult } from 'express-validator';
import { STATUSES } from '../models/Customer.js';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0].msg;
    return res.status(400).json({ success: false, error });
  }
  next();
};

const validateName = (value) => {
  if (value === undefined || value === null || value === '') {
    throw new Error('Customer name is required');
  }

  if (typeof value !== 'string') {
    throw new Error('Customer name is required');
  }

  if (value.trim() === '') {
    throw new Error('Customer name cannot be whitespace only');
  }

  if (value.trim().length > 50) {
    throw new Error('Customer name cannot exceed 50 characters');
  }

  return true;
};

export const validateCreateCustomer = [
  body('name').custom(validateName).trim(),
  handleValidationErrors,
];

export const validateCustomerId = [
  param('id').isMongoId().withMessage('Invalid customer ID'),
  handleValidationErrors,
];

export const validateUpdateStatus = [
  param('id').isMongoId().withMessage('Invalid customer ID'),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(STATUSES)
    .withMessage('Status must be waiting, serving, or completed'),
  handleValidationErrors,
];
