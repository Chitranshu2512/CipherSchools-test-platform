// src/component/TestCard.jsx

import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const TestCard = ({ test, onStart }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {test.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {test.description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => onStart(test._id)}
        >
          Start Test
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestCard;
