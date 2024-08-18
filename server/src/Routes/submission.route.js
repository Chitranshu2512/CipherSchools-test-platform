// this is submission.route.js

import { Router } from 'express';
import { submitTest, getSubmissions } from '../controllers/submission.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/submitTest').post(authMiddleware, submitTest);
router.route('/:userId').get(authMiddleware, getSubmissions);

export default router;


