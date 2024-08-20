import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: 'auto',
        backgroundColor: '#2c3e50',
        color: '#ffffff',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} CipherSchools Tests. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
