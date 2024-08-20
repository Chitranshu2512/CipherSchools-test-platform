import React from 'react';
import {  Box, Chip } from '@mui/material';
import { Container } from '@mui/material';

const chipStyles = {
  answered: {
    backgroundColor: '#006E33', // Green for answered
    color: '#fff',
  },
  review: {
    backgroundColor: '#FF9800', // Orange for marked for review
    color: '#fff',
  },
  visited: {
    backgroundColor: '#CD001A', // Red for visited but not answered
    color: '#fff',
  },
  default: {
    backgroundColor: '#b0aade ', // Gray for not visited
    color: '#fff',
  },
};

const chipData = [
  { label: 'Answered', style: chipStyles.answered },
  { label: 'Review', style: chipStyles.review },
  { label: 'Visited', style: chipStyles.visited },
  { label: 'Not Visited', style: chipStyles.default },
];

const TestFooter = () => {
  return (
    

<Container maxWidth="xl">
<Box
      component="footer"
      sx={{
        padding: 1,
        backgroundColor: '#1E2A38',
        color: 'white',
        textAlign: 'center',
        boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        bottom: 0,
        width: '100%',
        mt: 9
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 35 }}>
        {chipData.map((chip, index) => (
          <Chip
            key={index}
            label={chip.label}
            sx={{ ...chip.style, margin: '0 4px' }}
          />
        ))}
      </Box>
    </Box>
</Container>

  );
};

export default TestFooter;
