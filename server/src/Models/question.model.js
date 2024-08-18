import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ text: String, isCorrect: Boolean }],
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
});

const Question = mongoose.model('Question', questionSchema);
export default Question;
