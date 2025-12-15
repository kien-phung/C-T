import express from 'express';
import { authMiddleware } from '../utils/configs/middlewares/auth.middleware.js';
import { listAdminCustomers, getAdminCustomerById, createAdminCustomer, updateAdminCustomer, deleteAdminCustomer } from '../controllers/admin.customer.controller.js';

const router = express.Router();

router.get('/', authMiddleware, listAdminCustomers);
router.get('/:id', authMiddleware, getAdminCustomerById);
router.post('/', authMiddleware, createAdminCustomer);
router.patch('/:id', authMiddleware, updateAdminCustomer);
router.delete('/:id', authMiddleware, deleteAdminCustomer);

export default router;