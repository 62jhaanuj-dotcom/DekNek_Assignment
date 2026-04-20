import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data - ise baad mein api.js se replace kar sakte ho
  const stats = [
    { label: "Total Projects", value: "12", color: "bg-blue-500" },
    { label: "Active Tasks", value: "05", color: "bg-green-500" },
    { label: "Pending Reviews", value: "02", color: "bg-yellow-500" },
    { label: "Hours Worked", value: "120h", color: "bg-purple-500" },
  ];

  const recentActivity = [
    { id: 1, task: "Updated Landing Page", status: "Completed", date: "2026-04-18" },
    { id: 2, task: "Fixed Auth Bug", status: "In Progress", date: "2026-04-19" },
    { id: 3, task: "Firebase Integration", status: "Pending", date: "2026-04-20" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Hi, {user?.name || 'Developer'}! 👋</h2>
        <p className="text-gray-500">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500 uppercase">{stat.label}</p>
            <p className={`text-3xl font-bold mt-2 text-gray-800`}>{stat.value}</p>
            <div className={`h-1 w-12 mt-4 ${stat.color} rounded`}></div>
          </div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Recent Activity</h3>
          <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Task Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentActivity.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-700">{item.task}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                      item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;