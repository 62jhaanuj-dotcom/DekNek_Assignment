import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">My App</h3>
            <p className="text-sm leading-relaxed">
              Building modern web experiences with the MERN stack. 
              Focusing on scalability and clean architecture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link></li>
              <li><Link to="/profile" className="hover:text-blue-400">Profile</Link></li>
            </ul>
          </div>

          {/* Contact/Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">GitHub</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
              <a href="#" className="hover:text-white">Twitter</a>
            </div>
            <p className="mt-4 text-xs">Email: support@myapp.com</p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs">
          <p>&copy; {currentYear} Anuj Jha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;