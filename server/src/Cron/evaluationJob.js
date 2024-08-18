import cron from 'node-cron';
import Submission from '../models/Submission.js';

cron.schedule('0 0 * * *', async () => {
  console.log('Running daily evaluation job');
  // Example logic for processing submissions
  const submissions = await Submission.find({ processed: false });
  submissions.forEach(submission => {
    // Evaluate submission and mark as processed
    submission.processed = true;
    submission.save();
  });
});
