'use server';

import { clearUserSession } from '@/services/session';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  await clearUserSession();
  redirect('/login');
}
