import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchIssues } from '../features/issues/issuesSlice'; 





const AdminDashboard = () => {
  const dispatch = useDispatch();
  const issues = useSelector(state => state.issues.items);
  const status = useSelector(state => state.issues.status);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

  const filteredIssues = issues.filter(issue =>
    statusFilter === 'All' || issue.status === statusFilter
  );

  console.log('Redux issues state:', issues);
  console.log('Redux status:', status);
  console.log('Filtered issues:', filteredIssues);

  if (status === 'loading') {
    return <p className="text-center">Loading issues...</p>;
  }

  if (status === 'failed') {
    return <p className="text-center text-red-500">Failed to load issues.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Filter by status */}
      <div className="mb-6 flex items-center gap-4">
        <label className="font-medium">Filter by Status:</label>
        <select onChange={(e) => setStatusFilter(e.target.value)} className="p-2 border rounded">
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Display issues */}
      <div className="space-y-4">
        <h2 className="font-semibold text-xl">Reported Issues</h2>
        {filteredIssues.length === 0 ? (
          <p>No issues reported</p>
        ) : (
          filteredIssues.map(issue => (
            <div key={issue.id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">{issue.title}</h3>
              <p className="text-sm text-gray-600">{issue.description}</p>
              <p className="mt-2 font-medium">Status: {issue.status}</p>

              {/* User Info */}
              <div className="mt-3">
                <h4 className="font-semibold">Reported by:</h4>
                <p>Name: {issue.user?.name || 'N/A'}</p>
              </div>

              {/* Mark Resolved */}
              <button
                onClick={() => console.log(`Marking ${issue.id} as resolved`)}
                className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                Mark as Resolved
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
