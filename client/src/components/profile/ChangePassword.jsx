import { useState } from 'react';
import api from '../../utils/api';
import Input from '../common/Input';

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (passwords.newPassword !== passwords.confirmPassword) {
      return alert("New passwords do not match!");
    }
    if (passwords.newPassword.length < 6) {
      return alert("Password must be at least 6 characters long.");
    }

    setLoading(true);
    try {
      await api.put('/auth/change-password', {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });
      
      alert("Password updated successfully!");
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      alert(err.response?.data?.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 border-t">
      <h3 className="text-lg font-semibold mb-4">Change Password</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          label="Current Password"
          type="password"
          name="oldPassword"
          value={passwords.oldPassword}
          onChange={handleChange}
          placeholder="Enter current password"
        />
        <Input
          label="New Password"
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
          placeholder="Minimum 6 characters"
        />
        <Input
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handleChange}
          placeholder="Re-type new password"
        />
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;