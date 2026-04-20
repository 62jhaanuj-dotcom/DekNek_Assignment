import { useState } from 'react';
import api from '../../utils/api';
import Input from '../common/Input';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', formData);
      alert("Registration successful! Please login.");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto mt-10">
      <Input label="Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
      <Input label="Email" type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
      <Input label="Password" type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
      <button className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
    </form>
  );
};
export default Signup;