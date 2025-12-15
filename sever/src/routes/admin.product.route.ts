import express from 'express';
import { authMiddleware } from '../utils/configs/middlewares/auth.middleware.js';
import { listAdminProducts, createAdminProduct, updateAdminProduct, deleteAdminProduct } from '../controllers/admin.product.controller.js';

const router = express.Router();

router.get('/', authMiddleware, listAdminProducts);
router.post('/', authMiddleware, createAdminProduct);
router.patch('/:id', authMiddleware, updateAdminProduct);
router.delete('/:id', authMiddleware, deleteAdminProduct);

export default router;