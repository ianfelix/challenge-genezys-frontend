'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

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
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LoginFormSchema, LoginFormValues } from '@/schemas/LoginFormSchema';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useToast } from '@/hooks/use-toast';

type LoginFormProps = {
  loginAction: (data: LoginFormValues) => Promise<boolean>;
};

export default function LoginForm({ loginAction }: LoginFormProps) {
  const translate = useTranslations('LoginForm');
  const loginSchema = LoginFormSchema();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      const result = await loginAction(data);

      if (result) {
        router.push('/home');
      } else {
        toast({
          title: translate('loginError'),
          description: translate('loginErrorDescription'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: translate('loginError'),
        description: translate('loginErrorDescription'),
        variant: 'destructive',
      });
      console.error(error);
    }
  }

  return (
    <main>
      <div className='flex justify-end p-4 space-x-2'>
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <div className='flex flex-col justify-center items-center min-h-[calc(100vh-80px)]'>
        <h1 className='text-3xl font-bold text-center mb-8'>
          {translate('welcome')}
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 w-full max-w-[400px] px-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('email')}</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      autoComplete='email'
                      placeholder={translate('emailPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('password')}</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      autoComplete='current-password'
                      placeholder={translate('passwordPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className='w-full'
              type='submit'
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              isLoading={form.formState.isSubmitting}
            >
              {translate('login')}
            </Button>
            <div className='flex flex-col space-y-4'>
              <div className='flex justify-end'>
                <Link href='/forgot-password' passHref legacyBehavior>
                  <Button
                    variant='link'
                    className='p-0 h-auto font-normal'
                    disabled={form.formState.isSubmitting}
                  >
                    {translate('forgotPassword')}
                  </Button>
                </Link>
              </div>
              <div className='flex justify-end items-center'>
                <span className='text-center text-sm mr-2'>
                  {translate('noAccount')}
                </span>
                <Link href='/register' passHref legacyBehavior>
                  <Button
                    disabled={form.formState.isSubmitting}
                    variant='outline'
                  >
                    {translate('register')}
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
