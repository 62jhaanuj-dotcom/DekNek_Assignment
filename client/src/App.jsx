import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

// Jo 5 pages tumne structure mein diye hain:
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* 1. Home Page */}
            <Route path="/" element={<Home />} />
            
            {/* 2. Login Page (Isi ke andar ForgotPassword ka component toggle kar sakte ho) */}
            <Route 
              path="/login" 
              element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} 
            />

            {/* 3. Signup Page */}
            <Route 
              path="/signup" 
              element={!user ? <SignupPage /> : <Navigate to="/dashboard" />} 
            />

            {/* 4. Dashboard Page (Protected) */}
            <Route 
              path="/dashboard" 
              element={user ? <DashboardPage /> : <Navigate to="/login" />} 
            />

            {/* 5. Profile Page (Protected) */}
            <Route 
              path="/profile" 
              element={user ? <ProfilePage /> : <Navigate to="/login" />} 
            />

            {/* Redirect any other route to Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;