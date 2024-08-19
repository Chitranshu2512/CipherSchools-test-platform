import React from 'react';
import { Grid, Chip } from '@mui/material';

const QuestionBoard = ({ questions, questionStates, onQuestionClick }) => {
  return (
    <Grid container spacing={1}>
      {questions.map((_, index) => (
        <Grid item key={index}>
          <Chip
            label={index + 1}
            clickable
            color={questionStates[index] === 'review' ? 'warning' : 'default'}
            onClick={() => onQuestionClick(index)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default QuestionBoard;
