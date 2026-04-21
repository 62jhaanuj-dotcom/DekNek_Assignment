import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import Input from '../common/Input';
import Button from '../common/Button';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    otp: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setMessageType('error');
      setMessage('Name, email and password are required');
      return;
    }

    if (formData.password.length < 6) {
      setMessageType('error');
      setMessage('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/sendotp', {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
      });
      setOtpSent(true);
      setMessageType('success');
      setMessage('OTP sent successfully. Please check your email.');
    } catch (err) {
      setMessageType('error');
      setMessage(err.response?.data?.message || 'Could not send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!formData.otp.trim()) {
      setMessageType('error');
      setMessage('Please enter the OTP sent to your email');
      return;
    }

    setLoading(true);

    try {
      const res = await api.post('/auth/signup', {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        otp: formData.otp.trim(),
      });

      // Auto-login: Store token
      localStorage.setItem('token', res.data.token);
      
      // Update api default header with token for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

      // Redirect to dashboard - AuthContext will fetch user on next render
      navigate('/dashboard');
    } catch (err) {
      setMessageType('error');
      setMessage(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={otpSent ? handleSignup : handleSendOtp} className="max-w-md mx-auto mt-10">
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        disabled={otpSent}
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        disabled={otpSent}
      />
      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        minLength={6}
        disabled={otpSent}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Signup As</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          disabled={otpSent}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {otpSent && (
        <Input
          label="Email OTP"
          value={formData.otp}
          onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
          placeholder="Enter 6 digit OTP"
          required
          inputMode="numeric"
          autoComplete="one-time-code"
        />
      )}

      {message && (
        <p className={`mb-4 text-sm ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}

      <Button type="submit" className="w-full" loading={loading}>
        {otpSent ? 'Verify OTP & Register' : 'Send Email OTP'}
      </Button>

      {otpSent && (
        <button
          type="button"
          className="mt-3 w-full text-sm text-blue-600 hover:underline"
          onClick={handleSendOtp}
          disabled={loading}
        >
          Resend OTP
        </button>
      )}
    </form>
  );
};
export default Signup;
