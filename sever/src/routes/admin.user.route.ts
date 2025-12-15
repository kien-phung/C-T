import express from 'express';
import { authMiddleware, adminMiddleware } from '../utils/configs/middlewares/auth.middleware.js';
import { 
  getAllAdminUsers,
  getAdminUserById,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
} from '../controllers/admin.user.controller.js';

const router = express.Router();

// Protect all admin users routes
router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/', getAllAdminUsers);
router.get('/:id', getAdminUserById);
router.post('/', createAdminUser);
router.patch('/:id', updateAdminUser);
router.delete('/:id', deleteAdminUser);

export default router;