import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoutes from '../routes/authRoutes.js';
import testRoutes from '../routes/testRoutes.js';
import questionRoutes from '../routes/questionRoutes.js';
import submissionRoutes from '../routes/submissionRoutes.js';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/submissions', submissionRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
