import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import Input from '../common/Input';
import Button from '../common/Button';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!token || !email) {
      setMessageType('error');
      setMessage('Invalid reset link. Please request a new password reset.');
      return;
    }

    if (formData.password.length < 6) {
      setMessageType('error');
      setMessage('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessageType('error');
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/reset-password', {
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        token,
        email,
      });

      setMessageType('success');
      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setMessageType('error');
      setMessage(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4 border border-red-300 rounded bg-red-50">
        <p className="text-red-700 font-semibold">Invalid Reset Link</p>
        <p className="text-red-600 text-sm mt-2">
          This reset link is invalid or has expired. Please request a new password reset.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Reset Your Password</h2>

      <Input
        label="New Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Enter new password"
        required
        minLength={6}
      />

      <Input
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        placeholder="Confirm your password"
        required
        minLength={6}
      />

      {message && (
        <p className={`mb-4 text-sm ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}

      <Button type="submit" className="w-full" loading={loading}>
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPassword;
