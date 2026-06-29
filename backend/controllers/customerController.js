import Customer from '../models/Customer.js';
import asyncHandler from '../middleware/asyncHandler.js';

const VALID_TRANSITIONS = {
  waiting: 'serving',
  serving: 'completed',
};

export const getCustomers = asyncHandler(async (_req, res) => {
  const customers = await Customer.find().sort({ createdAt: 1 });
  res.status(200).json({ success: true, data: customers });
});

export const createCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.create({
    name: req.body.name.trim(),
    status: 'waiting',
  });
  res.status(201).json({ success: true, data: customer });
});

export const updateCustomerStatus = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(404).json({ success: false, error: 'Customer not found' });
  }

  const newStatus = req.body.status;
  const allowedNextStatus = VALID_TRANSITIONS[customer.status];

  if (allowedNextStatus !== newStatus) {
    return res.status(409).json({ success: false, error: 'Invalid status transition' });
  }

  customer.status = newStatus;
  await customer.save();

  res.status(200).json({ success: true, data: customer });
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer) {
    return res.status(404).json({ success: false, error: 'Customer not found' });
  }

  res.status(200).json({
    success: true,
    data: { id: customer.id, message: 'Customer removed successfully' },
  });
});
