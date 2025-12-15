import express from 'express';
import { authMiddleware } from '../utils/configs/middlewares/auth.middleware.js';
import { listAdminSolutions, createAdminSolution, updateAdminSolution, deleteAdminSolution } from '../controllers/admin.solution.controller.js';

const router = express.Router();

router.get('/', authMiddleware, listAdminSolutions);
router.post('/', authMiddleware, createAdminSolution);
router.patch('/:id', authMiddleware, updateAdminSolution);
router.delete('/:id', authMiddleware, deleteAdminSolution);

export default router;