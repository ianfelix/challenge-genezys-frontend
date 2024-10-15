import LoginForm from '@/screens/LoginForm';
import { LoginFormValues } from '@/schemas/LoginFormSchema';
import { loginUser } from '@/services/session';

export default function Login() {
  async function loginAction(data: LoginFormValues) {
    'use server';
    return loginUser(data);
  }

  return <LoginForm loginAction={loginAction} />;
}
