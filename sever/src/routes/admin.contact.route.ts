import express from 'express';
import { getAllContacts, getContactById, deleteContact, getContactsStats } from '../controllers/admin.contact.controller.js';
import { authMiddleware, adminMiddleware } from '../utils/configs/middlewares/auth.middleware.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(authMiddleware);
router.use(adminMiddleware);

// Contact management routes
router.get('/', getAllContacts);
router.get('/stats', getContactsStats);
router.get('/:id', getContactById);
router.delete('/:id', deleteContact);

export default router;
