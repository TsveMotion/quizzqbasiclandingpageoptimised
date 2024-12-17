'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const isSuperAdmin = session?.user?.email?.toLowerCase() === 'tsvetozarkt@gmail.com';

  if (!session) {
    return (
      <div className="p-8">
        <p>Please sign in to access the admin dashboard.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {session.user?.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Admin Management Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Management</h2>
            <p className="text-gray-600 mb-4">Manage administrator accounts and permissions.</p>
            <div className="space-y-3">
              <Link
                href="/admin/users"
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Admins
              </Link>
              {isSuperAdmin && (
                <Link
                  href="/admin/users/create"
                  className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Admin
                </Link>
              )}
            </div>
          </div>

          {/* User Management Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Management</h2>
            <p className="text-gray-600 mb-4">Manage student and teacher accounts.</p>
            <div className="space-y-3">
              <Link
                href="/admin/users?role=student"
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Manage Students
              </Link>
              <Link
                href="/admin/users?role=teacher"
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Manage Teachers
              </Link>
            </div>
          </div>

          {/* Quiz Management Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quiz Management</h2>
            <p className="text-gray-600 mb-4">Manage quizzes and submissions.</p>
            <div className="space-y-3">
              <Link
                href="/admin/quizzes"
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Quizzes
              </Link>
              <Link
                href="/admin/submissions"
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Submissions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
