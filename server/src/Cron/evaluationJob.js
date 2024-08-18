// this is evaluationJob.js


import cron from 'node-cron';
import Submission from '../models/submission.model.js';

cron.schedule('0 0 * * *', async () => {
  console.log('Running daily evaluation job');
  // Example logic for processing submissions
  const submissions = await Submission.find({ isDeleted: false });
  submissions.forEach(async (submission) => {
    // Evaluate submission and mark as processed
    submission.isDeleted = true; // Example update
    await submission.save();
  });
});
