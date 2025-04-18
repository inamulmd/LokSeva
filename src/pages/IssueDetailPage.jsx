// src/pages/IssueDetailPage.jsx
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StatusBadge from '../components/StatusBadge';

const IssueDetailPage = () => {
  const { id } = useParams();
  const issue = useSelector(state => state.issues.items.find(i => i.id === id));

  if (!issue) return <div>Issue not found</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{issue.title}</h1>
      <StatusBadge status={issue.status} />
      <p>{issue.description}</p>
      <div className="my-4">
        <h3 className="font-semibold">Location:</h3>
        <p>{issue.location.lat}, {issue.location.lng}</p>
      </div>
      <div>
        <h3 className="font-semibold">Category:</h3>
        <p>{issue.category}</p>
      </div>
      {/* Add a section for upvotes or other actions */}
    </div>
  );
};

export default IssueDetailPage;
