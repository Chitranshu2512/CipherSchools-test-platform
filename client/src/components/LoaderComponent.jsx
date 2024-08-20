import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoaderComponent = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

export default LoaderComponent;
