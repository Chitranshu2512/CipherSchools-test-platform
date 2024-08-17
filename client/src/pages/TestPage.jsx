import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TestPage() {
  const [cameraGranted, setCameraGranted] = useState(false);
  const [microphoneGranted, setMicrophoneGranted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setCameraGranted(true);
        setMicrophoneGranted(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Permissions not granted", error);
      });

    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/api/tests/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Failed to fetch questions", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmitTest = async () => {
    try {
      // Assuming you have collected the answers in a state
      const answers = {}; // Replace with actual answers state
      await axios.post("/api/tests/submit", { answers });
      navigate("/finish");
    } catch (error) {
      console.error("Failed to submit test", error);
      alert("Submission failed");
    }
  };

  if (!cameraGranted || !microphoneGranted) {
    return <div>Error: Camera and Microphone permissions are required.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Test Environment</h1>
      <video ref={videoRef} autoPlay className="w-full mb-4 rounded shadow-md"></video>
      {/* Render questions */}
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <p>{question.text}</p>
          {/* Render options here */}
        </div>
      ))}
      <button onClick={handleSubmitTest} className="bg-blue-500 text-white p-3 rounded">
        Submit Test
      </button>
    </div>
  );
}

export default TestPage;
