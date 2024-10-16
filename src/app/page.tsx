import { getUser } from '@/services/session';
import { redirect } from 'next/navigation';

export default async function Index() {
  const user = await getUser();

  if (user) {
    redirect('/home');
  }

  if (!user) {
    redirect('/login');
  }

  return;
}
