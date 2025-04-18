// src/components/StatusBadge.jsx
const statusColors = {
    Pending: 'bg-yellow-200 text-yellow-800',
    'In Progress': 'bg-blue-200 text-blue-800',
    Resolved: 'bg-green-200 text-green-800',
  };
  
  const StatusBadge = ({ status }) => (
    <span className={`px-2 py-1 rounded-full text-sm ${statusColors[status] || 'bg-gray-200 text-gray-800'}`}>
      {status}
    </span>
  );
  
  export default StatusBadge;
  