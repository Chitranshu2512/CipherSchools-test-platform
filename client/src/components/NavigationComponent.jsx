import React from 'react';
import { Box, Button } from '@mui/material';

const NavigationComponent = ({ onPrevious, onNext, onMarkForReview }) => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center'
    }}
  >
    <Button 
      variant="contained" 
      color="warning" 
      sx={{ 
        borderTopLeftRadius: 10, 
        borderBottomLeftRadius: 25, 
        borderTopRightRadius: 25, 
        borderBottomRightRadius: 10, 
        textTransform: 'none', 
        fontWeight: 'bold', 
        boxShadow: 1, 
        fontSize: '1.1rem',
        '&:hover': { 
          boxShadow: 6 
        } 
      }} 
      onClick={onMarkForReview}
    >
      Mark for Review
    </Button>
    <Box>
      <Button 
        variant="contained" 
        color="secondary" 
        sx={{ 
          borderTopLeftRadius: 25, 
          borderBottomLeftRadius: 10, 
          borderTopRightRadius: 5, 
          borderBottomRightRadius: 5, 
          textTransform: 'none', 
          fontWeight: 'bold', 
          boxShadow: 1, 
          px: 3,
          fontSize: '1.1rem',
          '&:hover': { 
            boxShadow: 6 
          } 
        }} 
        onClick={onPrevious}
      >
        Previous
      </Button>
      <Button 
        variant="contained" 
        color="success" 
        sx={{ 
          borderTopLeftRadius: 5, 
          borderBottomLeftRadius: 5, 
          borderTopRightRadius: 10, 
          borderBottomRightRadius: 25, 
          textTransform: 'none', 
          fontWeight: 'bold', 
          boxShadow: 1, 
          ml: 1,
          px: 4.5, 
          fontSize: '1.1rem',
          '&:hover': { 
            boxShadow: 6 
          } 
        }} 
        onClick={onNext}
      >
        Next
      </Button>
    </Box>
  </Box>
);

export default NavigationComponent;
