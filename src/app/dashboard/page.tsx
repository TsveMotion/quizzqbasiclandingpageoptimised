import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import TeacherDashboard from '@/components/dashboard/TeacherDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import LogoutButton from '@/components/auth/LogoutButton';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const userRole = session.user?.role || 'STUDENT';

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {session.user?.name}!
              </h1>
              <LogoutButton />
            </div>
            
            {userRole === 'STUDENT' && <StudentDashboard />}
            {userRole === 'TEACHER' && <TeacherDashboard />}
            {userRole === 'ADMIN' && <AdminDashboard />}
          </div>
        </div>
      </div>
    </main>
  );
}
