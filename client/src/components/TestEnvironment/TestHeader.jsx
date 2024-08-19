import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const TestHeader = ({ title, testId, onSubmit }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Test Name: {title}
        </Typography>
        <Typography variant="subtitle1" sx={{ mr: 2 }}>
          Test ID: {testId}
        </Typography>
        <Typography variant="subtitle1">
          Username: User
        </Typography>
        <Button color="inherit" sx={{ ml: 2 }} onClick={onSubmit}>
          Submit Test
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TestHeader;
