import express from 'express';
import { adminLogin, adminLogout, getCurrentAdmin, verifyToken, sendOtp, resetPasswordWithOtp, sendOtpByEmail, resetPasswordByEmail } from '../controllers/admin.auth.controller.js';
import { authMiddleware } from '../utils/configs/middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/login', adminLogin);
router.post('/forgot-send-otp', sendOtpByEmail);
router.post('/forgot-reset', resetPasswordByEmail);

// Protected routes (require authentication)
router.post('/logout', authMiddleware, adminLogout);
router.get('/me', authMiddleware, getCurrentAdmin);
router.get('/verify', authMiddleware, verifyToken);
router.post('/send-otp', authMiddleware, sendOtp);
router.post('/reset-password', authMiddleware, resetPasswordWithOtp);

export default router;
