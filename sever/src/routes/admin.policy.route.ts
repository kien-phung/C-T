import express from 'express';
import { listAdminPolicies, getAdminPolicyById, createAdminPolicy, updateAdminPolicy, deleteAdminPolicy } from '../controllers/admin.policy.controller.js';
import { authMiddleware } from '../utils/configs/middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, listAdminPolicies);
router.get('/:id', authMiddleware, getAdminPolicyById);
router.post('/', authMiddleware, createAdminPolicy);
router.patch('/:id', authMiddleware, updateAdminPolicy);
router.delete('/:id', authMiddleware, deleteAdminPolicy);

export default router;