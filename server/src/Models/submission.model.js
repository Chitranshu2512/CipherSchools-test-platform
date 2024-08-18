// this is submission.model.js

import mongoose, { Schema } from 'mongoose';

const submissionSchema = new Schema({
  
  testId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Test', 
    required: true 
  },

  userID: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  selections: [
    { 
      questionID: { 
        type: Schema.Types.ObjectId, 
        ref: 'Question' 
      }, 

      option: String, 

      savedAt: {
         type: Date, 
         default: Date.now 
        } 
    }
  ],

  endedAt: { 
    type: Date 
  },
  
  isDeleted: { 
    type: Boolean, 
    default: false 
  },

  
}, {timestamps: true});

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;
