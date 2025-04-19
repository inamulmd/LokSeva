import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-green-700 text-white p-4">
      <div className="flex justify-center items-center gap-x-8 text-lg">
        <Link to="/">Home</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/admin">User Dashboard</Link>
        <button>EN | বাংলা</button>
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
