import React from 'react';
import { Typography } from '@mui/material';

const Timer = ({ time }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Typography variant="h6">Time Remaining: {formatTime(time)}</Typography>
  );
};

export default Timer;
