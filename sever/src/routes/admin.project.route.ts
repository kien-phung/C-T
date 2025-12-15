import express from 'express';
import { authMiddleware } from '../utils/configs/middlewares/auth.middleware.js';
import { listAdminProjects, createAdminProject, updateAdminProject, deleteAdminProject } from '../controllers/admin.project.controller.js';

const router = express.Router();

router.get('/', authMiddleware, listAdminProjects);
router.post('/', authMiddleware, createAdminProject);
router.patch('/:id', authMiddleware, updateAdminProject);
router.delete('/:id', authMiddleware, deleteAdminProject);

export default router;