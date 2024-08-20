import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976ff', boxShadow: 'none' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            CipherSchools Tests
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
