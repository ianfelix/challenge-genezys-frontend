import { z } from 'zod';
import { useTranslations } from 'next-intl';

export type LoginFormValues = z.infer<ReturnType<typeof LoginFormSchema>>;

export const LoginFormSchema = () => {
  const translate = useTranslations('LoginForm');

  return z.object({
    email: z.string({ required_error: translate('emailRequired') }).email({
      message: translate('invalidEmail'),
    }),
    password: z
      .string({ required_error: translate('passwordRequired') })
      .min(6, {
        message: translate('passwordMinLength'),
      }),
  });
};
