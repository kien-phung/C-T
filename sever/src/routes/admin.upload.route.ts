import express from 'express';
import { uploadPdfFiles } from '../controllers/admin.upload.controller.js';

const router = express.Router();

// Upload multiple PDFs (multipart parsing handled by global middleware)
router.post('/pdf', uploadPdfFiles);

export default router;
