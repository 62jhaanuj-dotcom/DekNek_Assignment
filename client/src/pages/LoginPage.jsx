import { useState } from 'react';
import Login from '../components/auth/Login';
import ForgotPassword from '../components/auth/ForgotPassword'; // Component import kiya

const LoginPage = () => {
  const [showForgot, setShowForgot] = useState(false);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {showForgot ? "Reset Your Password" : "Login to Your Account"}
        </h2>

        {/* State ke basis par component switch hoga */}
        {showForgot ? <ForgotPassword /> : <Login />}

        <div className="mt-6 text-center text-sm">
          <button 
            onClick={() => setShowForgot(!showForgot)} 
            className="text-blue-600 hover:underline"
          >
            {showForgot ? "← Back to Login" : "Forgot Password?"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;