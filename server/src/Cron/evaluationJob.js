import cron from 'node-cron';
import Submission from '../models/submission.model.js';
import Question from '../models/question.model.js';

// Function to fetch questions for a given list of question IDs
const fetchQuestions = async (questionIds) => {
  return Question.find(
    { 
      _id: { $in: questionIds } 
    });
};

// Function to evaluate a submission and return the score and max marks
const evaluateSubmission = async (submission) => {
  let score = 0;
  let maxMarks = 0;
  
  // Fetch questions related to the submission
  const questionIds = submission.selections.map(s => s.questionID);

  const questions = await fetchQuestions(questionIds);

  // Calculate the score and max marks based on user's selections
  submission.selections.forEach(selection => {
    const question = questions.find(q => q._id.toString() === selection.questionID.toString());

    if (question) {
      // Update maxMarks with the total marks of all questions
      maxMarks += question.marks;

      // Calculate the score based on user's selection
      if (question.correctOption === selection.option) {
        score += question.marks;
      }
    }
  });

  return { score, maxMarks };
};

// Function to process and evaluate all submissions
const processSubmissions = async () => {
  try {
    // Fetch all non-deleted submissions
    const submissions = await Submission.find({ isDeleted: false });

    let totalMaxMarks = 0; // Initialize totalMaxMarks

    // Iterate over each submission and update the result score
    for (const submission of submissions) {
      const { score, maxMarks } = await evaluateSubmission(submission);
      submission.resultScore = score;

      // Update the total max marks
      totalMaxMarks += maxMarks;

      await submission.save();
    }

    console.log('Evaluation and result storage complete');
    console.log('Total maximum marks across all submissions:', totalMaxMarks); // Log the total max marks
  } catch (error) {
    console.error('Error processing submissions:', error);
  }
};

// Schedule the cron job to run every hour
cron.schedule('0 * * * *', () => {
  console.log('Running hourly evaluation job');
  processSubmissions();
});
