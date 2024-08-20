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
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', p: 2 }}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: 500,
          bgcolor: 'background.paper',
          borderRadius: 3,
          p: 4,
          boxShadow: 12,
          position: 'absolute',
          top: '5%', // Adjusted to be closer to the top
          left: '50%',
          transform: 'translate(-50%, 0%)', // Center horizontally and adjust vertical position
          transition: 'transform 0.3s ease-in-out',
          background: 'linear-gradient(135deg, #ffffff 0%, #f2f2f2 100%)',
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}
        >
          Camera & Microphone Permission
        </Typography>
        {error && (
          <Typography variant="body2" color="error" paragraph sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {!error && cameraStream && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              marginBottom: '16px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
            }}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleGrantPermission}
          sx={{ py: 1.5 }}
        >
          Grant Permission
        </Button>
      </Box>
    </Modal>
  );
};

export default CameraPermissionModal;
