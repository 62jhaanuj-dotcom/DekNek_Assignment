import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../utils/api';
import Input from '../common/Input';

const EditProfile = ({ setEditMode }) => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/profile', { name });
      alert("Profile updated! Please refresh to see changes.");
      setEditMode(false);
    } catch (err) {
      alert("Error updating profile");
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <Input 
        label="Full Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
        Save Changes
      </button>
    </form>
  );
};

export default EditProfile;