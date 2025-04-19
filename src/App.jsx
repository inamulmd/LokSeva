import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './components/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import IssueDetailPage from './pages/IssueDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import AnalyticsPage from './pages/AnalyticsPage';
import IssueReportForm from './components/IssueReportForm';
import Auth from './page/Auth';
import './utils/leafletConfig';
import * as connector from '../dataconnect-generated/js/default-connector/react';

const App = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const showNavbar = location.pathname !== '/auth';

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* Public Route */}
        <Route path="/auth" element={<Auth />} />

        {/* Modified Home Route */}
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" />}
        />

        {/* Other Protected Routes */}
        <Route
          path="/issue/:id"
          element={user ? <IssueDetailPage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/admin"
          element={user ? <AdminDashboard /> : <Navigate to="/auth" />}
        />
        <Route
          path="/analytics"
          element={user ? <AnalyticsPage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/report"
          element={user ? <IssueReportForm /> : <Navigate to="/auth" />}
        />
      </Routes>
    </>
  );
};

export default App;
