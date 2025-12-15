import express from 'express';
import { authMiddleware } from '../utils/configs/middlewares/auth.middleware.js';
import { listAdminBlogs, createAdminBlog, updateAdminBlog, deleteAdminBlog } from '../controllers/admin.blog.controller.js';

const router = express.Router();

router.get('/', authMiddleware, listAdminBlogs);
router.post('/', authMiddleware, createAdminBlog);
router.patch('/:id', authMiddleware, updateAdminBlog);
router.delete('/:id', authMiddleware, deleteAdminBlog);

export default router;