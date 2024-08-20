// src/App.jsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import Router from './router';
import Header from './components/Header';
import Footer from './components/Footer';
import { Box } from '@mui/material';



function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: 0, m:0 }}>
        <Router />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

