import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import testService from "../services/testService";
import submissionService from "../services/submissionService";
import TestHeader from "../components/TestHeader";
import TestFooter from "../components/TestFooter";
import QuestionComponent from "../components/QuestionComponent";
import NavigationComponent from "../components/NavigationComponent";
import QuestionBoardComponent from "../components/QuestionBoardComponent";
import TimerComponent from "../components/TimerComponent";
import LoaderComponent from "../components/LoaderComponent";
import { Container, Divider, Grid, Box } from "@mui/material";

const TestEnvironment = () => {
  const [test, setTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStates, setQuestionStates] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timer, setTimer] = useState(0);
  const [user, setUser] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTest = async () => {
      const testId = new URLSearchParams(location.search).get("testId");
      const { data, user } = await testService.attemptTest(testId);
      setTest(data);
      setUser(user);
      if (data && data.questions) {
        setQuestionStates([
          "visited",
          ...new Array(data.questions.length - 1).fill("not visited"),
        ]);
        setSelectedAnswers(new Array(data.questions.length).fill(null));
        setTimer(data.questions.length * 2 * 60); // Assuming 2 minutes per question
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
      handleSubmit();
    }
  }, [timer]);

  const handleAnswerSelection = (index) => {
    const updatedStates = [...questionStates];
    updatedStates[currentQuestionIndex] = "answered";
    setQuestionStates(updatedStates);

    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] =
      test.questions[currentQuestionIndex].options[index];
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
    updatedStates[currentQuestionIndex] = "review";
    setQuestionStates(updatedStates);
  };

  const handleQuestionClick = (index) => {
    updateStateOnNavigation(index);
    setCurrentQuestionIndex(index);
  };

  const updateStateOnNavigation = (index) => {
    if (questionStates[index] === "not visited") {
      const updatedStates = [...questionStates];
      updatedStates[index] = "visited";
      setQuestionStates(updatedStates);
    }
  };

  const handleSubmit = async () => {
    const submissionData = {
      testId: test._id,
      userID: user._id,
      selections: test.questions.map((question, index) => ({
        questionID: question._id,
        option: selectedAnswers[index],
      })),
      endedAt: new Date(),
    };

    const response = await submissionService.submitTest(submissionData);
    if (response) {
      navigate("/finish"); // Navigate to finish page
    }
  };

  if (!test) return <LoaderComponent />;

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        p: 0,
        m: 0,
        bgcolor: "#fefefa",
      }}
    >
      <TestHeader
        test={test}
        onSubmit={handleSubmit}
        sx={{ bgcolor: "transparent", fontSize: "1.5rem" }}
      />
      <Grid
        container
        sx={{ flexGrow: 1, height: "calc(100% - 64px)", p: 0, m: 0 }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            p: 0,
            m: 0,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              width: '90%',
              display: "flex",
              flexDirection: "column",
              p: 0,
              m: 0,
              bgcolor: "transparent",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                p: 2,
                bgcolor: "transparent",
              }}
            >
              <QuestionComponent
                question={test.questions[currentQuestionIndex]}
                index={currentQuestionIndex}
                selectedAnswer={selectedAnswers[currentQuestionIndex]}
                onAnswerSelection={handleAnswerSelection}
                sx={{ width: '50%', bgcolor: "transparent", fontSize: "1.2rem" }}
              />
              <br />
              <NavigationComponent
                onPrevious={handlePrevious}
                onNext={handleNext}
                onMarkForReview={handleMarkForReview}
                sx={{ width: "100%", bgcolor: "transparent", fontSize: "1rem" }}
              />
            </Box>
          </Box>     
        </Grid>


        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            p: 2,
            bgcolor: "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              p: 0,
              m: 0,
              bgcolor: "transparent",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
                bgcolor: "",
              }}
            >
              <TimerComponent timer={timer} />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                p: 0,
                mt: 1,
                bgcolor: "transparent",
              }}
            >
              <QuestionBoardComponent
                questionStates={questionStates}
                onQuestionClick={handleQuestionClick}
                sx={{ bgcolor: "transparent", fontSize: "1rem" }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* <TestFooter sx={{ bgcolor: "transparent", fontSize: "1.5rem" }} /> */}
    </Container>
  );
};

export default TestEnvironment;
