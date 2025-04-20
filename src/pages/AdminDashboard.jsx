import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchIssues } from '../features/issues/issuesSlice'; 
import { motion } from 'framer-motion';

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

  if (status === 'loading') {
    return <p className="text-center text-white">Loading issues...</p>;
  }

  if (status === 'failed') {
    return <p className="text-center text-red-400">Failed to load issues.</p>;
  }

  return (
    <div className="w-full p-6 min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-green-400 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🛠️ Admin Dashboard
      </motion.h1>

      {/* Filter by status */}
      <motion.div 
        className="mb-8 flex flex-wrap items-center gap-4 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <label className="font-medium text-lg text-white">Filter by Status:</label>
        <select 
          onChange={(e) => setStatusFilter(e.target.value)} 
          className="p-2 border rounded-md shadow-sm bg-gray-900 text-white border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </motion.div>

      {/* Display issues */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <h2 className="font-semibold text-2xl text-white mb-4 text-center">Reported Issues</h2>
        {filteredIssues.length === 0 ? (
          <p className="text-center text-gray-400">No issues reported</p>
        ) : (
          filteredIssues.map((issue, index) => (
            <motion.div
              key={issue.id}
              className="border border-green-700 p-6 rounded-xl shadow-lg bg-gray-900 hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-green-400">{issue.title}</h3>
              <p className="text-gray-300 mt-1">{issue.description}</p>
              <p className="mt-3 text-sm text-green-300 font-medium">Status: <span className="text-white">{issue.status}</span></p>

              {/* User Info */}
              <div className="mt-4 text-sm text-gray-400">
                <h4 className="font-semibold text-md text-white">Reported by:</h4>
                <p>Name: {issue.user?.name || 'N/A'}</p>
              </div>

              {/* Mark Resolved */}
              <button
                onClick={() => console.log(`Marking ${issue.id} as resolved`)}
                className="mt-5 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md transition"
              >
                ✅ Mark as Resolved
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
