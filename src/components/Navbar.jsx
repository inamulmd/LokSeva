import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-green-700 text-white p-4">
    <div className="flex justify-center items-center gap-x-8 text-lg">
      <Link to="/">Home</Link>
      <Link to="/analytics">Analytics</Link>
      <Link to="/admin">User Dashboard</Link>
      <button>EN | বাংলা</button>
    </div>
  </nav>
);

export default Navbar;
