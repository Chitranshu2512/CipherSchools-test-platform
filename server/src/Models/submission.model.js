import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  answers: [{ question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, answer: String }],
  score: { type: Number, default: 0 },
  submittedAt: { type: Date, default: Date.now },
});

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;
