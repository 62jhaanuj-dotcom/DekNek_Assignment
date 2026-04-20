import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
      <p className="text-gray-600 mb-8 text-lg">
        {user ? `Hello ${user.name}, good to see you back!` : "Join us today to explore amazing features."}
      </p>
      
      <div className="flex gap-4">
        {user ? (
          <Link to="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded shadow">Go to Dashboard</Link>
        ) : (
          <>
            <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded shadow">Login</Link>
            <Link to="/signup" className="border border-blue-600 text-blue-600 px-6 py-2 rounded">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;