// src/pages/TestDashboardPage.jsx

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import TestCard from '../components/TestCard';
import testService from '../services/testService';
import CameraPermissionModal from '../components/CameraPermissionModal';

const TestDashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [test, setTest] = useState();
  const [cameraPermissionOpen, setCameraPermissionOpen] = useState(false);

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
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {test?.title || 'Test Dashboard'}
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        {test?.description || 'Please follow the instructions carefully before starting the test.'}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleStartTest}>
        Start Test
      </Button>
      
      <CameraPermissionModal
        open={cameraPermissionOpen}
        onGrantPermission={handlePermissionsGranted}
        onClose={() => setCameraPermissionOpen(false)}
      />
    </Container>
  );
};

export default TestDashboardPage;
