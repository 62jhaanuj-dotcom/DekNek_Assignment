import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <Link to="/" className="font-bold">MyBrand</Link>
      <div>
        {user ? (
          <>
            <Link className="mx-2" to="/dashboard">Dashboard</Link>
            <Link className="mx-2" to="/profile">Profile</Link>
            <button onClick={logout} className="ml-4 bg-red-500 px-2 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link className="mx-2" to="/login">Login</Link>
            <Link className="mx-2" to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;