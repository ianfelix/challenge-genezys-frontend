import { cookies } from 'next/headers';

const EMAIL_COOKIE_NAME = 'USER_EMAIL';
const PASSWORD_COOKIE_NAME = 'USER_PASSWORD';

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

export async function getUserEmail() {
  return cookies().get(EMAIL_COOKIE_NAME)?.value;
}

export async function setUserEmail(email: string) {
  cookies().set(EMAIL_COOKIE_NAME, email, { maxAge: 7 * 24 * 60 * 60 }); // 7 days
}

export async function clearUserSession() {
  cookies().delete(EMAIL_COOKIE_NAME);
  cookies().delete(PASSWORD_COOKIE_NAME);
}
