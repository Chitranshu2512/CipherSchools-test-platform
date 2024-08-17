import { useNavigate } from "react-router-dom";

function FinishPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl mb-4">Test Completed</h2>
        <p className="mb-6">Thank you for completing the test. Your results will be processed soon.</p>
        <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default FinishPage;
