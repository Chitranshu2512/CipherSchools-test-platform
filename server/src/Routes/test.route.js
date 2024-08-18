import express from 'express';
import { createTest, getTests } from '../controllers/testController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createTest);
router.get('/', authMiddleware, getTests);

export default router;
