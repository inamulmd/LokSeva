// src/components/IssueCard.jsx
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const IssueCard = ({ issue }) => (
  <div className="border p-4 rounded shadow-sm my-2">
    <h2 className="font-bold">{issue.title}</h2>
    <p>{issue.description}</p>
    <StatusBadge status={issue.status} />
    <Link to={`/issue/${issue.id}`} className="text-blue-600 underline">View Details</Link>
  </div>
);

export default IssueCard;
