import { useState } from 'react';
import Profile from '../components/profile/Profile';
import EditProfile from '../components/profile/EditProfile';
import ChangePassword from '../components/profile/ChangePassword';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md mt-10 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300 transition"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {isEditing ? (
        <EditProfile setEditMode={setIsEditing} />
      ) : (
        <>
          <Profile />
          <ChangePassword />
        </>
      )}
    </div>
  );
};

export default ProfilePage;