import Question from '../models/Question.js';

export const addQuestion = async (req, res) => {
  try {
    const { text, options, testId } = req.body;
    const question = new Question({ text, options, test: testId });
    await question.save();
    res.status(201).json({ message: 'Question added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding question', error });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const { testId } = req.params;
    const questions = await Question.find({ test: testId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};
