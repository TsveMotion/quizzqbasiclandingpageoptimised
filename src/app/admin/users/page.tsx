'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const searchParams = useSearchParams();
  const isSuperAdmin = session?.user?.email?.toLowerCase() === 'tsvetozarkt@gmail.com';
  const success = searchParams.get('success');
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch admin users on component mount
  const fetchAdmins = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      if (response.ok) {
        setAdmins(data.users);
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdmin) return;

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/users/${selectedAdmin.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to reset password');
        return;
      }

      setIsResetModalOpen(false);
      setNewPassword('');
      setSelectedAdmin(null);
      // Show success message or notification
    } catch (error) {
      setError('An error occurred while resetting the password');
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="p-8">
        <p>Please sign in to access this page.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Administrator Accounts</h1>
          {isSuperAdmin && (
            <Link
              href="/admin/users/create"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Create Admin
            </Link>
          )}
        </div>

        {success && (
          <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-lg">
            Administrator account created successfully!
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                {isSuperAdmin && (
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      {admin.role}
                    </span>
                  </td>
                  {isSuperAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-4">
                      <button
                        onClick={() => {
                          setSelectedAdmin(admin);
                          setIsResetModalOpen(true);
                        }}
                        className="text-purple-600 hover:text-purple-900 font-medium"
                      >
                        Reset Password
                      </button>
                      {admin.email.toLowerCase() !== 'tsvetozarkt@gmail.com' && (
                        <button
                          onClick={async () => {
                            if (window.confirm(`Are you sure you want to delete ${admin.name}?`)) {
                              try {
                                const response = await fetch(`/api/admin/users/${admin.id}`, {
                                  method: 'DELETE',
                                });
                                
                                if (response.ok) {
                                  // Remove the admin from the list
                                  setAdmins(admins.filter(a => a.id !== admin.id));
                                } else {
                                  const data = await response.json();
                                  alert(data.error || 'Failed to delete administrator');
                                }
                              } catch (error) {
                                alert('An error occurred while deleting the administrator');
                              }
                            }
                          }}
                          className="text-red-600 hover:text-red-900 font-medium"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reset Password Modal */}
      {isResetModalOpen && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Reset Password</h2>
              <button
                onClick={() => {
                  setIsResetModalOpen(false);
                  setSelectedAdmin(null);
                  setNewPassword('');
                  setError('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="mb-4 text-gray-600">
              Resetting password for {selectedAdmin.name} ({selectedAdmin.email})
            </p>

            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                  minLength={6}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsResetModalOpen(false);
                    setSelectedAdmin(null);
                    setNewPassword('');
                    setError('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
