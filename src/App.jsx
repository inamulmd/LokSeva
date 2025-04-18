// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import IssueDetailPage from './pages/IssueDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import AnalyticsPage from './pages/AnalyticsPage';
import './utils/leafletConfig';
import IssueReportForm from './components/IssueReportForm';
import * as connector from '../dataconnect-generated/js/default-connector/react';



function App() {
  return (
    <Router>
      {/* Navbar for navigation */}
      
      <Navbar />
      {/* Define all the routes for the pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/issue/:id" element={<IssueDetailPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/report" element={<IssueReportForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
