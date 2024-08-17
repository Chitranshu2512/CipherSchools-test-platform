import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function TestDashboard() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const startTest = () => {
    navigate("/test");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Welcome, {user?.email}</h1>
      <div className="flex space-x-4">
        <button
          onClick={startTest}
          className="bg-green-500 text-white p-3 rounded"
        >
          Start Test
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-3 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default TestDashboard;
