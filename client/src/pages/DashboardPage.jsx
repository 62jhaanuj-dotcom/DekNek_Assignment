import { useAuth } from '../hooks/useAuth';
import Dashboard from '../components/dashboard/Dashboard';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user?.name}!</h1>
      <Dashboard />
    </div>
  );
};
export default DashboardPage;