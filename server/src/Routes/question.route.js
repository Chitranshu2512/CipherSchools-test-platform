import express from 'express';
import { addQuestion, getQuestions } from '../controllers/questionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, addQuestion);
router.get('/:testId', authMiddleware, getQuestions);

export default router;
