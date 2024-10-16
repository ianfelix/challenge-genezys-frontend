import { User } from '@/types/session';
import { cookies } from 'next/headers';

const EMAIL_COOKIE_NAME = 'USER_EMAIL';
const PASSWORD_COOKIE_NAME = 'USER_PASSWORD';
const USER_DATA_COOKIE_NAME = 'USER_DATA';

export async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cookieStore = cookies();
      const storedEmail = cookieStore.get(EMAIL_COOKIE_NAME)?.value;
      const storedPassword = cookieStore.get(PASSWORD_COOKIE_NAME)?.value;

      const isValid =
        credentials.email === storedEmail &&
        credentials.password === storedPassword;

      if (isValid) {
        cookieStore.set(EMAIL_COOKIE_NAME, credentials.email, {
          maxAge: 7 * 24 * 60 * 60,
        }); // 7 days
        cookieStore.set(PASSWORD_COOKIE_NAME, credentials.password, {
          maxAge: 7 * 24 * 60 * 60,
        }); // 7 days
      }

      resolve(isValid);
    }, 1000);
  });
}

export async function getUser(): Promise<User | null> {
  const user = cookies().get(USER_DATA_COOKIE_NAME)?.value;
  return user ? JSON.parse(user) : null;
}

export async function clearUserSession() {
  cookies().delete(EMAIL_COOKIE_NAME);
  cookies().delete(PASSWORD_COOKIE_NAME);
  cookies().delete(USER_DATA_COOKIE_NAME);
}

export async function registerUser(userData: {
  name: string;
  email: string;
  password: string;
  cep: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: string;
}): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cookieStore = cookies();
      cookieStore.set(EMAIL_COOKIE_NAME, userData.email, {
        maxAge: 7 * 24 * 60 * 60,
      }); // 7 days
      cookieStore.set(PASSWORD_COOKIE_NAME, userData.password, {
        maxAge: 7 * 24 * 60 * 60,
      }); // 7 days
      cookieStore.set(USER_DATA_COOKIE_NAME, JSON.stringify(userData), {
        maxAge: 7 * 24 * 60 * 60,
      }); // 7 days

      resolve(true);
    }, 1000);
  });
}
