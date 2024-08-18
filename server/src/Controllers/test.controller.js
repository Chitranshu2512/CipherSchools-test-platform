// this is test.controller.js

import Test from '../models/test.model.js';
import { asyncHandler } from '../Utils/asyncHandler.js';
import { ApiError } from '../Utils/ApiError.js'
import { ApiResponse } from '../Utils/ApiResponse.js';


export const getTests = asyncHandler(async(req, res) => {
    const testId = req.param

    try {
      
      const test = await Test.findOne({
        $and: [{testId}, {isDeleted: false}]
    }).select("-questions")

    return res.status(200)
    .json(new ApiResponse(200, test, "test is available"))


    } catch (error) {
      throw new ApiError(500, "Test is not available")
    }

})



export const attempTests = asyncHandler(async(req, res) => {
  const testId = req.param

  try {
    
    const test = await Test.findOne({
      $and: [{testId}, {isDeleted: false}]
  }).populate('questions');

  return res.status(200)
  .json(new ApiResponse(200, test, "Start attempting your test"))


  } catch (error) {
    throw new ApiError(500, "Test is not available")
  }

})
