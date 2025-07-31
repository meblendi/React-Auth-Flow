
import React from 'react';
import { useAuth } from '../App';
import { Button } from '../components/ui';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null; // Or a loading spinner, though ProtectedRoute should prevent this state
  }

  const { name, email, pictureUrl, phone } = user;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
            <div className="flex justify-end px-4 pt-4">
                <Button 
                  onClick={logout} 
                  className="w-auto py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500"
                >
                  Logout
                </Button>
            </div>
            <div className="flex flex-col items-center pb-10 px-4">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg border-2 border-indigo-500" src={pictureUrl} alt={`${name.first} ${name.last}`} />
                <h1 className="mb-1 text-2xl font-bold text-white">
                  Welcome, {name.first}!
                </h1>
                <h2 className="mb-4 text-xl font-medium text-white">
                  {name.first} {name.last}
                </h2>
                <span className="text-sm text-gray-400">{email}</span>
                <span className="text-sm text-gray-400 mt-1">{phone}</span>
            </div>
        </div>
    </div>
  );
};

export default DashboardPage;
