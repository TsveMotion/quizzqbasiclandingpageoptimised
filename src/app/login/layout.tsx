import { getServerAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
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
  const session = await getServerAuthSession();

  if (session) {
    redirect('/dashboard');
  }

  return children;
}
