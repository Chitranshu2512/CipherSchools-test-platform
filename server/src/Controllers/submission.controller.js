import Submission from '../models/Submission.js';
import Test from '../models/Test.js';

export const submitTest = async (req, res) => {
  try {
    const { testId, answers } = req.body;
    const submission = new Submission({ user: req.user.userId, test: testId, answers });
    // Calculate score (example logic)
    const test = await Test.findById(testId).populate('questions');
    let score = 0;
    test.questions.forEach((question, index) => {
      if (question.options.some(option => option.isCorrect && option.text === answers[index].answer)) {
        score += 1;
      }
    });
    submission.score = score;
    await submission.save();
    res.status(201).json({ message: 'Test submitted successfully', score });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting test', error });
  }
};

export const getSubmissions = async (req, res) => {
  try {
    const { userId } = req.params;
    const submissions = await Submission.find({ user: userId }).populate('test');
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions', error });
  }
};
