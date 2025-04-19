import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IssueCard from '../components/IssueCard';
import Navbar from '../components/Navbar';

const categories = [
  {
    name: '🏙️ Civic & Infrastructure Issues',
    description: 'Report local infrastructure issues like potholes, broken roads, and more.',
    link: '/report',
    color: 'bg-green-100',
  },
  {
    name: '🌳 Environmental Complaints',
    description: 'Submit complaints related to environmental concerns such as pollution and illegal tree cutting.',
    link: '/report',
    color: 'bg-green-200',
  },
  {
    name: '🛡️ Public Safety',
    description: 'Report issues related to safety such as theft, harassment, or any emergencies.',
    link: '/report',
    color: 'bg-yellow-100',
  },
  {
    name: '🧾 Administrative & Service Complaints',
    description: 'Report inefficiencies in government services like delays in document issuance, etc.',
    link: '/report',
    color: 'bg-blue-100',
  },
  {
    name: '🏥 Health & Sanitation',
    description: 'Report health hazards like unsanitary conditions, disease outbreaks, and more.',
    link: '/report',
    color: 'bg-red-100',
  },
  {
    name: '🏫 Education Related',
    description: 'Issues related to education like lack of teachers or school infrastructure problems.',
    link: '/report',
    color: 'bg-indigo-100',
  },
  {
    name: '📡 Digital/Online Service Complaints',
    description: 'Report issues with digital services, internet connectivity, or online fraud.',
    link: '/report',
    color: 'bg-teal-100',
  },
  {
    name: '🏘️ Welfare Scheme Related',
    description: 'Complaints related to welfare schemes, subsidies, pension delays, and more.',
    link: '/report',
    color: 'bg-purple-100',
  }
];

const HomePage = () => {
  const issues = useSelector(state => state.issues.items);

  return (
    <div className="space-y-12 px-4 py-8 max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-green-700">Welcome to LokSeva</h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          LokSeva empowers citizens to report local issues like potholes, waterlogging, garbage, and streetlight outages directly to municipal authorities. Make your area better by taking action.
        </p>
        <Link to="/report" className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
          Report a Problem
        </Link>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Choose a Category to Report</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`rounded-lg shadow-md ${category.color} p-4 space-y-4`}
            >
              <h3 className="font-bold text-xl text-gray-800">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
              <Link
                to={{
                  pathname: category.link,
                  state: { categoryTitle: category.name }, // Pass category title as state
                }}
                className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Report Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded p-4 border-t-4 border-green-500">
          <h3 className="font-bold text-lg mb-2">📍 Location-Based Reporting</h3>
          <p>Pin exact issue locations using GPS and attach photos for better clarity.</p>
        </div>
        <div className="bg-white shadow-md rounded p-4 border-t-4 border-yellow-500">
          <h3 className="font-bold text-lg mb-2">📈 Transparent Tracking</h3>
          <p>Track your issue's status: Pending, In Progress, or Resolved in real-time.</p>
        </div>
        <div className="bg-white shadow-md rounded p-4 border-t-4 border-blue-500">
          <h3 className="font-bold text-lg mb-2">🌐 Bilingual Support</h3>
          <p>Switch easily between English and বাংলা for accessibility.</p>
        </div>
      </section>

      {/* Recent Issues Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Issues Reported</h2>
        <div className="space-y-4">
          {issues.length > 0 ? (
            issues.map(issue => <IssueCard key={issue.id} issue={issue} />)
          ) : (
            <p className="text-gray-500">No issues reported yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
