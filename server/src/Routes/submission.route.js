import express from 'express';
import { submitTest, getSubmissions } from '../controllers/submissionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, submitTest);
router.get('/:userId', authMiddleware, getSubmissions);

export default router;
