import * as z from 'zod';
import { useTranslations } from 'next-intl';

export type RegisterFormValues = z.infer<ReturnType<typeof RegisterFormSchema>>;

export const RegisterFormSchema = () => {
  const translate = useTranslations('RegisterForm');

  return z
    .object({
      name: z.string().min(2, translate('nameMinLength')),
      email: z.string().email(translate('invalidEmail')),
      password: z.string().min(6, translate('passwordMinLength')),
      confirmPassword: z.string().min(1, translate('confirmPasswordRequired')),
      cep: z.string().length(8, translate('cepLength')),
      street: z.string().min(1, translate('streetRequired')),
      neighborhood: z.string().min(1, translate('neighborhoodRequired')),
      number: z.string().min(1, translate('numberRequired')),
      city: z.string().min(1, translate('cityRequired')),
      state: z.string().min(1, translate('stateRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: translate('passwordMismatch'),
      path: ['confirmPassword'],
    });
};
