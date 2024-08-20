import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const TestHeader = ({ test, onSubmit }) => (
  <AppBar position="fixed" sx={{ width: '100%', mb: 2, bgcolor: '#1976ff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
    <Container maxWidth="lg">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', color: 'white' }}>
          {test.title}
        </Typography>
        <Typography variant="subtitle1" component="div" sx={{ mr: 2, color: 'white' }}>
          Test ID: {test._id}
        </Typography>
        
        <Button color="inherit" sx={{ ml: 3, borderRadius: '30px', bgcolor: '#FF5722', '&:hover': { bgcolor: '#E64A19' } }} onClick={onSubmit}>
          Submit Test
        </Button>
      </Toolbar>
    </Container>
  </AppBar>
);

export default TestHeader;
