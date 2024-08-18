import Test from '../models/Test.js';

export const createTest = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const test = new Test({ title, description, questions, createdBy: req.user.userId });
    await test.save();
    res.status(201).json({ message: 'Test created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating test', error });
  }
};

export const getTests = async (req, res) => {
  try {
    const tests = await Test.find().populate('questions');
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tests', error });
  }
};
