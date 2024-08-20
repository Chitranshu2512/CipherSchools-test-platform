import React from 'react';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FinishPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        p: 4
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: '100%',
          maxWidth: '600px',
          padding: 4,
          backgroundColor: '#ffffff',
          borderRadius: 4,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          textAlign: 'center'
        }}
      >
        <CheckCircleIcon
          sx={{ fontSize: 60, color: '#4caf50', mb: 2 }}
        />
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 'bold', mb: 2, color: '#1976d2' }}
        >
          Test Submitted Successfully!
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ mb: 4 }}
        >
          Your test has been successfully submitted. Thank you for your participation.
        </Typography>
        
      </Paper>
    </Box>
  );
};

export default FinishPage;
