// src/router.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TestDashboardPage from './pages/TestDashboardPage';
import TestEnvironmentPage from './pages/TestEnvironmentPage';
import NotFoundPage from './pages/NotFoundPage';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<TestDashboardPage />} />
        <Route path="/test-environment" element={<TestEnvironmentPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
