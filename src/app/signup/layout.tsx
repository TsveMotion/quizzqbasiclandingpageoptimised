import { getServerAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
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
  const session = await getServerAuthSession();

  if (session) {
    redirect('/dashboard');
  }

  return children;
}
