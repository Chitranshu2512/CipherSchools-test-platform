import React, { useState, useEffect } from 'react';
import testService from '../../services/testService';
import submissionService from '../../services/submissionService';
import { Container, Paper, CircularProgress } from '@mui/material';
import TestHeader from './TestHeader';
import QuestionBoard from './QuestionBoard';
import QuestionCard from './QuestionCard';
import Timer from './Timer';

const TestEnvironment = () => {
  const [test, setTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStates, setQuestionStates] = useState([]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const fetchTest = async () => {
      const testId = '66c24be05c552c76d02ace93';
      const testData = await testService.attemptTest(testId);
      setTest(testData);
      if (testData && testData.questions) {
        setQuestionStates(new Array(testData.questions.length).fill('not attempted'));
        setTimer(testData.questions.length * 2 * 60); // 2 minutes per question
      }
    };

    fetchTest();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer => timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleMarkForReview = () => {
    const updatedStates = [...questionStates];
    updatedStates[currentQuestionIndex] = 'review';
    setQuestionStates(updatedStates);
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmitTest = async () => {
    await submissionService.submitTest(test._id, questionStates);
    alert('Test submitted successfully');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!test) return <CircularProgress />;

  return (
    <Container>
      <TestHeader
        title={test.title}
        testId={test._id}
        onSubmit={handleSubmitTest}
      />
      <Paper sx={{ p: 3, mt: 3 }}>
        <QuestionCard
          question={test.questions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onMarkForReview={handleMarkForReview}
        />
      </Paper>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Timer time={timer} />
        <QuestionBoard
          questions={test.questions}
          questionStates={questionStates}
          onQuestionClick={handleQuestionClick}
        />
      </Paper>
    </Container>
  );
};

export default TestEnvironment;
