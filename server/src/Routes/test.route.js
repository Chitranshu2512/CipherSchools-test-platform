// this is test.route.js


import { Router } from 'express';
import { getTests } from '../controllers/test.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();
router.route('/').get(authMiddleware, getTests);

export default router;
