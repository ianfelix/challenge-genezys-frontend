import { RegisterFormValues } from '@/schemas/registerFormSchema';
import RegisterForm from '@/screens/RegisterForm';
import { registerUser } from '@/services/session';

export default function Register() {
  async function registerAction(data: RegisterFormValues) {
    'use server';
    return registerUser(data);
  }

  return <RegisterForm registerAction={registerAction} />;
}
