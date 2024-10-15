'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  ForgotPasswordSchema,
  ForgotPasswordFormValues,
} from '@/schemas/ForgotPasswordSchema';
import { useTranslations } from 'next-intl';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordForm() {
  const { toast } = useToast();
  const translate = useTranslations('ForgotPasswordForm');
  const forgotPasswordSchema = ForgotPasswordSchema();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    console.log(values);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast({
      title: translate('emailSent'),
      description: translate('emailSentDescription'),
      variant: 'default',
    });
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='p-4 sm:p-6 lg:p-8'>
        <Link href='/login' passHref legacyBehavior>
          <Button variant='link' size='icon'>
            <ArrowLeft />
            <span className='sr-only'>{translate('backToLogin')}</span>
          </Button>
        </Link>
      </div>
      <div className='flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <h2 className='text-center text-2xl font-bold'>
            {translate('forgotPassword')}
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate('email')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='email'
                        autoComplete='email'
                        placeholder={translate('emailPlaceholder')}
                        className='w-full'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
                isLoading={form.formState.isSubmitting}
                className='w-full'
              >
                {form.formState.isSubmitting
                  ? translate('sending')
                  : translate('sendLink')}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
