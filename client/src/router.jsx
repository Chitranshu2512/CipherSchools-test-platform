// src/router.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TestDashboardPage from './pages/TestDashboardPage';
import TestEnvironmentPage from './pages/TestEnvironmentPage';
import NotFoundPage from './pages/NotFoundPage';
import FinishPage from './pages/FinishPage';

function AppRouter() {
  const [user, setUser] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setUser = {setUser} />} />
        <Route path="/dashboard" element={user ? <TestDashboardPage /> : <LoginPage setUser = {setUser} />} />
        <Route path="/test-environment" element={user ? <TestEnvironmentPage /> : <LoginPage setUser = {setUser} />} />
        <Route path="/finish" element={<FinishPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
