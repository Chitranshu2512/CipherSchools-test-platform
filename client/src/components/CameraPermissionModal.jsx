// src/components/CameraPermissionModal.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const CameraPermissionModal = ({ open, onClose, onGrantPermission }) => {
  const [cameraStream, setCameraStream] = useState(null);
  const [error, setError] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    if (open) {
      requestPermissions();
    } else {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    }
  }, [open]);

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setCameraStream(stream);
      setError('');
    } catch (err) {
      setError('Camera or microphone access is required to start the test.');
    }
  };

  const handleGrantPermission = () => {
    if (cameraStream) {
      onGrantPermission();
    } else {
      setError('Please grant camera and microphone permissions to proceed.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 400, margin: 'auto', p: 4, bgcolor: 'background.paper' }}>
        <Typography variant="h6" gutterBottom>
          Camera & Microphone Permission
        </Typography>
        {error && (
          <Typography variant="body2" color="error" paragraph>
            {error}
          </Typography>
        )}
        {!error && cameraStream && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: '100%', height: 'auto', marginBottom: '16px' }}
          />
        )}
        <Button variant="contained" color="primary" onClick={handleGrantPermission}>
          Grant Permission
        </Button>
      </Box>
    </Modal>
  );
};

export default CameraPermissionModal;
