// src/pages/AdminDashboard.jsx
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setIssues } from '../features/issues/issuesSlice';
import { fetchIssues } from '../features/issues/issuesAPI';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const issues = useSelector(state => state.issues.items);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    dispatch(fetchIssues()); // Fetch issues from Firebase
  }, [dispatch]);

  const filteredIssues = issues.filter(issue => 
    statusFilter === 'All' || issue.status === statusFilter
  );

  const handleStatusChange = (id, newStatus) => {
    // Update issue status here (you can also update in Firebase)
    dispatch(setIssues(issues.map(issue => 
      issue.id === id ? { ...issue, status: newStatus } : issue
    )));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div>
        <label>Filter by Status:</label>
        <select onChange={(e) => setStatusFilter(e.target.value)} className="p-2">
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div>
        <h2 className="font-semibold">Reported Issues</h2>
        {filteredIssues.map(issue => (
          <div key={issue.id} className="border p-4 rounded mb-4">
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <p>Status: {issue.status}</p>
            <button 
              onClick={() => handleStatusChange(issue.id, 'Resolved')} 
              className="bg-green-500 text-white p-2 rounded">
              Mark as Resolved
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
