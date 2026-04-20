import { useState } from 'react';
import api from '../utils/api';
import { useAuth } from './useAuth';

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useAuth(); // AuthContext se setUser nikal rahe hain taaki UI update ho sake

  // 1. Profile Update karne ke liye
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.put('/user/update', userData);
      
      // Global state update karein taaki Navbar aur Profile page par naya naam dikhe
      setUser(prev => ({ ...prev, ...res.data.user }));
      
      alert("Profile updated successfully!");
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Profile update failed";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // 2. Password Change karne ke liye
  const changePassword = async (passwordData) => {
    setLoading(true);
    setError(null);
    try {
      await api.put('/auth/change-password', passwordData);
      alert("Password changed successfully!");
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Password change failed";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    changePassword,
    loading,
    error
  };
};