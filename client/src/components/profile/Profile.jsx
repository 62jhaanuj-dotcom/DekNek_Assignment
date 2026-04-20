import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {user?.name?.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>
      <div className="border-t pt-4 mt-4">
        <p><strong>Member Since:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
        <p><strong>Account Type:</strong> {user?.role || "Standard User"}</p>
      </div>
    </div>
  );
};

export default Profile;