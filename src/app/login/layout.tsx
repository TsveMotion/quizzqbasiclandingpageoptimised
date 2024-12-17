import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Quiz QB',
  description: 'Login to your Quiz QB account',
};

export default async function LoginLayout({
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
