import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | Quiz QB',
  description: 'Create a new Quiz QB account',
};

export default async function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return children;
}
