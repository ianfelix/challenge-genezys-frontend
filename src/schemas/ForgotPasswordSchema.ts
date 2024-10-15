import { z } from 'zod';
import { useTranslations } from 'next-intl';

export type ForgotPasswordFormValues = z.infer<
  ReturnType<typeof ForgotPasswordSchema>
>;

export const ForgotPasswordSchema = () => {
  const translate = useTranslations('ForgotPasswordForm');

  return z.object({
    email: z.string({ required_error: translate('emailRequired') }).email({
      message: translate('invalidEmail'),
    }),
  });
};
