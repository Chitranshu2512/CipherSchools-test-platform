import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import LoginPage from "./pages/LoginPage";
import TestDashboard from "./pages/TestDashboard";
import TestPage from "./pages/TestPage";
import FinishPage from "./pages/FinishPage";

function App() {
  const { user } = useUser();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard" element = {<TestDashboard/>}
          // element={user ? <TestDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/test" element = {<TestPage/>}
          // element={user ? <TestPage /> : <Navigate to="/" />}
        />
        <Route
          path="/finish" element = {<FinishPage/>}
          // element={user ? <FinishPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
