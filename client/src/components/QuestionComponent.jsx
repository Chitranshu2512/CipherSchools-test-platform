import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';

const QuestionComponent = ({ question, index, selectedAnswer, onAnswerSelection }) => {
  if (!question) return null;

  return (
    <Paper 
      sx={{ 
        p: 4, 
        width: '100%',
        maxWidth: '1000px', 
        margin: '0 auto', 
        boxShadow: 0, 
        pb: 5,
        borderRadius: 5, 
        bgcolor: 'transparent', 
        border: '0px solid #ddd',
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 3, 
          fontWeight: 'small',
          fontSize: '1rem', 
          color: '#414a4c' 
        }}
      >
        <strong>Question {index+1}:</strong>
      </Typography>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 4, 
          color: '#414a4c',
          fontWeight: 'bold',
          fontSize: '1.5rem'
        }}
      >
        {question.question}
      </Typography>
      <Grid container spacing={2}>
        {question.options.map((option, index) => (
          <Grid item xs={12} sm={12} key={index}>
            <Paper
              sx={{
                p: 1,
                px: 2,
                width: '40%',
                cursor: 'pointer',
                backgroundColor: selectedAnswer === option ? '#00ab66' : '#fefefa',
                border: selectedAnswer === option ? '3px solid #1e88e5' : '2px solid #ddd',
                borderRadius: 25,
                transition: 'background-color 0.3s, border-color 0.3s',
                boxShadow: 1,
                '&:hover': { 
                  backgroundColor: '#e0e0e0',
                  boxShadow: 5
                },
                textAlign: 'center',
                color: 'black',
                fontSize: '1.2rem'
              }}
              onClick={() => onAnswerSelection(index)}
            >
              {option}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default QuestionComponent;
