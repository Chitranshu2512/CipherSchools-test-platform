import React, { useState, useEffect } from 'react';
import testService from '../services/testService'; // Adjust the path if needed
import submissionService from '../services/submissionService'; // New import for submission service
import { Container, Typography, Button, AppBar, Toolbar, Grid, Paper, Chip, CircularProgress } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const TestEnvironment = () => {
  const [test, setTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStates, setQuestionStates] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timer, setTimer] = useState(0);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchTest = async () => {
      const testId = '66c24be05c552c76d02ace93'; // Replace with actual testId
      const {data, user} = await testService.attemptTest(testId);
      setTest(data);
      setUser(user)
      if (data && data.questions) {
        setQuestionStates(['visited', ...new Array(data.questions.length - 1).fill('not visited')]); // First question marked as visited
        setSelectedAnswers(new Array(data.questions.length).fill(null)); // Initialize selected answers as null
        setTimer(data.questions.length * 2 * 60); // Total time in seconds (2 minutes per question)
      }
    };

    fetchTest();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      handleSubmit(); // Automatically submit when time is over
    }
  }, [timer]);

  const handleAnswerSelection = (index) => {
    const updatedStates = [...questionStates];
    updatedStates[currentQuestionIndex] = 'answered';
    setQuestionStates(updatedStates);

    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = test.questions[currentQuestionIndex].options[index];
    setSelectedAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      updateStateOnNavigation(currentQuestionIndex + 1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      updateStateOnNavigation(currentQuestionIndex - 1);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleMarkForReview = () => {
    const updatedStates = [...questionStates];
    updatedStates[currentQuestionIndex] = 'review';
    setQuestionStates(updatedStates);
  };

  const handleQuestionClick = (index) => {
    updateStateOnNavigation(index);
    setCurrentQuestionIndex(index);
  };

  const updateStateOnNavigation = (index) => {
    if (questionStates[index] === 'not visited') {
      const updatedStates = [...questionStates];
      updatedStates[index] = 'visited';
      setQuestionStates(updatedStates);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = async () => {
    console.log(user._id)
    const submissionData = {
      testId: test._id,
      userID: user._id,
      selections: test.questions.map((question, index) => ({
        questionID: question._id,
        option: selectedAnswers[index],
      })),
      endedAt: new Date(),
    };

    await submissionService.submitTest(submissionData); // Submitting test data
  };

  if (!test) return <CircularProgress />;

  return (
    <Container>
      {/* Header Section */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Test Name: {test.title}
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ mr: 2 }}>
            Test ID: {test._id}
          </Typography>
          <Typography variant="subtitle1" component="div">
            Username: User
          </Typography>
          <Button color="inherit" sx={{ ml: 2 }} onClick={handleSubmit}>Submit Test</Button>
        </Toolbar>
      </AppBar>

      {/* Questions Section */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5">Question {currentQuestionIndex + 1}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>{test.questions[currentQuestionIndex].question}</Typography>
        <Grid container spacing={2}>
          {test.questions[currentQuestionIndex].options.map((option, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  backgroundColor: selectedAnswers[currentQuestionIndex] === option ? '#d1e7dd' : '#f0f0f0',
                  '&:hover': { backgroundColor: '#e0e0e0' },
                }}
                onClick={() => handleAnswerSelection(index)}
              >
                {option}
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <Button variant="outlined" onClick={handlePrevious} startIcon={<ArrowBack />}>Previous</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleMarkForReview}>Mark for Review</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleNext} endIcon={<ArrowForward />}>Next</Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Timer and Question Board Section */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6">Time Remaining: {formatTime(timer)}</Typography>
        <Grid container spacing={1} sx={{ mt: 2 }}>
          {test.questions.map((_, index) => (
            <Grid item key={index}>
              <Chip
                label={index + 1}
                clickable
                color={
                  questionStates[index] === 'visited' ? 'primary'
                    : questionStates[index] === 'answered' ? 'success'
                    : questionStates[index] === 'review' ? 'warning'
                    : 'default'
                }
                onClick={() => handleQuestionClick(index)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <Chip label="Current" color="primary" />
          </Grid>
          <Grid item>
            <Chip label="Not Visited" color="default" />
          </Grid>
          <Grid item>
            <Chip label="Answered" color="success" />
          </Grid>
          <Grid item>
            <Chip label="Review" color="warning" />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TestEnvironment;
