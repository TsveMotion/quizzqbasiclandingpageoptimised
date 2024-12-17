'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
  totalUsers: number;
  totalQuizzes: number;
  totalAssignments: number;
  activeUsers: number;
}

interface RecentActivity {
  id: string;
  type: 'USER_JOINED' | 'QUIZ_CREATED' | 'ASSIGNMENT_CREATED';
  description: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalQuizzes: 0,
    totalAssignments: 0,
    activeUsers: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  // TODO: Fetch real data from API
  useEffect(() => {
    setStats({
      totalUsers: 150,
      totalQuizzes: 25,
      totalAssignments: 30,
      activeUsers: 45,
    });

    setRecentActivity([
      {
        id: '1',
        type: 'USER_JOINED',
        description: 'New student registered: John Doe',
        timestamp: '2024-01-15T10:00:00Z',
      },
      {
        id: '2',
        type: 'QUIZ_CREATED',
        description: 'New quiz created: Introduction to QB',
        timestamp: '2024-01-14T15:30:00Z',
      },
    ]);
  }, []);

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <section className="flex gap-4">
        <Link
          href="/admin/users"
          className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg text-center hover:bg-indigo-700 transition-colors"
        >
          Manage Users
        </Link>
        <Link
          href="/admin/settings"
          className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg text-center hover:bg-indigo-700 transition-colors"
        >
          System Settings
        </Link>
      </section>

      {/* Stats Overview */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">System Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-sm text-gray-500">Total Quizzes</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalQuizzes}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-sm text-gray-500">Total Assignments</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalAssignments}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-sm text-gray-500">Active Users</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.activeUsers}</p>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="bg-white border rounded-lg divide-y">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-4">
              <p className="font-medium text-gray-900">{activity.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
