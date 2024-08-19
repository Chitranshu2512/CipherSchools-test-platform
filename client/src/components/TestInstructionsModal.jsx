// src/component/TestInstructionsModal.jsx


import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const TestInstructionsModal = ({ open, onClose, onStart }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 400, margin: 'auto', p: 4, bgcolor: 'background.paper' }}>
        <Typography variant="h6" gutterBottom>
          Test Instructions
        </Typography>
        <Typography variant="body2" paragraph>
          Please read the following instructions carefully before starting the test.
        </Typography>
        <Button variant="contained" color="primary" onClick={onStart}>
          Start Test
        </Button>
      </Box>
    </Modal>
  );
};

export default TestInstructionsModal;
