import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button, Box, Paper, Divider, Grid, FormControlLabel, Checkbox } from '@mui/material';
import testService from '../services/testService';
import CameraPermissionModal from '../components/CameraPermissionModal';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

const TestDashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [test, setTest] = useState();
  const [cameraPermissionOpen, setCameraPermissionOpen] = useState(false);
  const [instructionsRead, setInstructionsRead] = useState(false);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const testId = new URLSearchParams(location.search).get('testId');
        const data = await testService.getTests(testId);
        setTest(data);
      } catch (error) {
        console.error('Failed to fetch tests', error);
      }
    };

    fetchTests();
  }, [location.search]);

  const handleStartTest = () => {
    setCameraPermissionOpen(true);
  };

  const handlePermissionsGranted = () => {
    setCameraPermissionOpen(false);
    navigate(`/test-environment?testId=${test._id}`);
  };

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
          maxWidth: '1200px', 
          padding: 4, 
          backgroundColor: '#ffffff', 
          borderRadius: 4, 
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflowY: 'auto'
        }}
      >
        <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ fontWeight: 'medium', mb: 4, color: '#1976d2' }}>
          {test?.title || 'Test Instructions'}
        </Typography>
        
        <Grid container spacing={4} mt={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '100%',  overflowY: 'auto' }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> General Instructions
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ textAlign: 'justify' }}>
                Please read the following instructions carefully before starting the test:
              </Typography>
              <Box sx={{ mb: 4 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  1. Ensure you are in a quiet and well-lit environment.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  2. Make sure your camera and microphone are functioning properly.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  3. Avoid any distractions during the test.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '100%', overflowY: 'auto' }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                <WarningIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Safety and Warnings
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ textAlign: 'justify' }}>
                1. Follow all safety guidelines provided by your institution.
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ textAlign: 'justify' }}>
                2. Report any technical issues immediately to the support team.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: '#e0e0e0' }} />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={instructionsRead} 
                onChange={(e) => setInstructionsRead(e.target.checked)} 
                color="primary" 
              />
            }
            label="I have read all the instructions"
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleStartTest} 
            disabled={!instructionsRead}
            sx={{ py: 1.5, px: 6, fontSize: '1.2rem', boxShadow: 4, borderRadius: 2, mt: 2 }}
          >
            Start Test
          </Button>
        </Box>
      </Paper>

      <CameraPermissionModal
        open={cameraPermissionOpen}
        onGrantPermission={handlePermissionsGranted}
        onClose={() => setCameraPermissionOpen(false)}
      />
    </Box>
  );
};

export default TestDashboardPage;
