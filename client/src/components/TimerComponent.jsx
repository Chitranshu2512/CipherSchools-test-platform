import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const TimerComponent = ({ timer }) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { hours, minutes, secs };
  };

  const { hours, minutes, secs } = formatTime(timer);

  return (
    <Paper sx={{ px: 8.5  , py: 4, borderRadius: 2, boxShadow: 3, textAlign: 'center', bgcolor: '#1976d2' }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 'medium', fontSize: '1.25rem', color: 'white' }}>
        Timer
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
        <Box sx={{ textAlign: 'center', mx: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {String(hours).padStart(2, '0')}
          </Typography>
          <Typography variant="body2">Hours</Typography>
        </Box>
        <Box sx={{ textAlign: 'center', mx: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {String(minutes).padStart(2, '0')}
          </Typography>
          <Typography variant="body2">Minutes</Typography>
        </Box>
        <Box sx={{ textAlign: 'center', mx: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {String(secs).padStart(2, '0')}
          </Typography>
          <Typography variant="body2">Seconds</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default TimerComponent;
