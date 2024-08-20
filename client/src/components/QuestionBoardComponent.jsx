import React from 'react';
import { Grid, Chip, Paper, Typography } from '@mui/material';

const QuestionBoardComponent = ({ questionStates, onQuestionClick }) => (
  <Paper sx={{ px: 2, py: 3, borderRadius: 2, boxShadow: 3, bgcolor: '#1976d2'  }}>
    <Typography variant="h6" sx={{ mb: 2, fontSize: '1.1rem', fontWeight: 'medium', color: 'white' }}>
      Navigate:
    </Typography>
    <Grid container spacing={1}>
      {questionStates.map((state, index) => (
        <Grid item key={index}>
          <Chip
            label={index + 1}
            onClick={() => onQuestionClick(index)}
            sx={{
              cursor: 'pointer',
              backgroundColor: getChipColor(state),
              color: '#f5f5f5 ',
              border: 1,
              borderColor: '#035096 ',
              borderTopLeftRadius: 25,
              borderBottomRightRadius: 5,
              borderTopRightRadius: 5,
              borderBottomLeftRadius: 5,
              width: 44,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              fontWeight: 'bold',
              boxShadow: 1,
            }}
          />
        </Grid>
      ))}
    </Grid>
  </Paper>
);

const getChipColor = (state) => {
  switch (state) {
    case 'answered':
      return '#006E33'; // Green for answered
    case 'review':
      return '#FF9800'; // Orange for marked for review
    case 'visited':
      return '#CD001A'; // Red for visited but not answered
    default:
      return '#b0aade '; // Gray for not visited
  }
};

export default QuestionBoardComponent;
