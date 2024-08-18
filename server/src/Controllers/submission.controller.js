// this is submission.controller.js

import Submission from "../models/submission.model.js";
import Test from "../models/test.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";



export const submitTest = asyncHandler(async (req, res) => {

  const { testId, selections, endedAt } = req.body;

  const submission = await Submission.create({
    userId: req.user.userId,
    testId,
    selections,
    endedAt,
  });

  const submittedResponse = await Submission.findById(submission._id);

  // check if submission registered ssuccessfully
  if (!submittedResponse) {
    throw new ApiError(500, "something went wrong while submitting the test");
  }

  return res.status(200)
  .json(new ApiResponse(200, null, "Test submitted successfully"))
});



export const evaluateTest = async (req, res) => {
  try {
    const { testId, answers } = req.body;
    const submission = new Submission({
      user: req.user.userId,
      test: testId,
      answers,
    });

    // Calculate score (example logic)
    const test = await Test.findById(testId).populate("questions");
    let score = 0;
    test.questions.forEach((question, index) => {
      if (
        question.options.some(
          (option) => option.isCorrect && option.text === answers[index].answer
        )
      ) {
        score += 1;
      }
    });
    submission.score = score;
    await submission.save();
    res.status(201).json({ message: "Test submitted successfully", score });
  } catch (error) {
    res.status(500).json({ message: "Error submitting test", error });
  }
};

export const getSubmissions = async (req, res) => {
  try {
    const { userId } = req.params;
    const submissions = await Submission.find({
      user: userId,
      isDeleted: false,
    }).populate("test");
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching submissions", error });
  }
};
