import { AuthProvider } from '@/contexts/AuthContext';
import { getUser } from '@/services/session';
import { redirect } from 'next/navigation';
import { logoutAction } from '@/app/actions/logoutAction';

export default async function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <AuthProvider user={user} logoutAction={logoutAction}>
      {children}
    </AuthProvider>
  );
}
