import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { useAuth } from './AuthContext';
import { motion } from 'framer-motion';

const navItemHover = {
  whileHover: {
    scale: 1.08,
    rotateX: 5,
    rotateY: -5,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  whileTap: {
    scale: 0.95,
    rotateX: 0,
    rotateY: 0,
  },
};

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
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand */}
        <motion.div {...navItemHover}>
          <Link to="/" className="text-2xl font-bold tracking-wide text-white hover:text-green-200 transition">
            LokSeva
          </Link>
        </motion.div>

        {/* Nav Links */}
        <div className="flex items-center gap-6 text-md font-medium">
          <motion.div {...navItemHover}>
            <Link to="/" className="hover:text-green-200 transition duration-200">
              Home
            </Link>
          </motion.div>

          <motion.div {...navItemHover}>
            <Link to="/analytics" className="hover:text-green-200 transition duration-200">
              Analytics
            </Link>
          </motion.div>

          <motion.div {...navItemHover}>
            <Link to="/admin" className="hover:text-green-200 transition duration-200">
              User Dashboard
            </Link>
          </motion.div>

          {/* Language Toggle */}
          <motion.div {...navItemHover}>
            <button className="bg-white text-green-700 px-3 py-1 rounded-md hover:bg-gray-100 transition">
              EN | বাংলা
            </button>
          </motion.div>

          {/* Logout Button */}
          {user && (
            <motion.div {...navItemHover}>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
