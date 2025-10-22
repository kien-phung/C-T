import express from 'express';
import { adminLogin, adminLogout, getCurrentAdmin, verifyToken } from '../controllers/admin.auth.controller.js';
import { authMiddleware } from '../utils/configs/middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/login', adminLogin);

// Protected routes (require authentication)
router.post('/logout', authMiddleware, adminLogout);
router.get('/me', authMiddleware, getCurrentAdmin);
router.get('/verify', authMiddleware, verifyToken);

export default router;
