import React from 'react';
import { Grid, Button, Typography, Paper } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const QuestionCard = ({ question, currentQuestionIndex, onPrevious, onNext, onMarkForReview }) => {
  return (
    <>
      <Typography variant="h5">Question {currentQuestionIndex + 1}</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {question.question}
      </Typography>
      <Grid container spacing={2}>
        {question.options.map((option, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper sx={{ p: 2, cursor: 'pointer', '&:hover': { backgroundColor: '#f0f0f0' } }}>
              {option}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <Button variant="outlined" onClick={onPrevious} startIcon={<ArrowBack />}>
            Previous
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={onMarkForReview}>
            Mark for Review
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={onNext} endIcon={<ArrowForward />}>
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default QuestionCard;
