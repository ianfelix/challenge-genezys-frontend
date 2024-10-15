'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  RegisterFormSchema,
  RegisterFormValues,
} from '@/schemas/registerFormSchema';
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
import { getAddressByCep } from '@/services/cepService';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

type RegisterFormProps = {
  registerAction: (data: RegisterFormValues) => Promise<boolean>;
};

export default function RegisterForm({ registerAction }: RegisterFormProps) {
  const [isCepLoading, setIsCepLoading] = useState(false);
  const { toast } = useToast();
  const translate = useTranslations('RegisterForm');
  const registerSchema = RegisterFormSchema();
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      cep: '',
      street: '',
      neighborhood: '',
      number: '',
      city: '',
      state: '',
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    try {
      const result = await registerAction(data);

      if (result) {
        router.push('/home');
      } else {
        toast({
          title: translate('registerError'),
          description: translate('registerErrorDescription'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: translate('registerError'),
        description: translate('registerErrorDescription'),
        variant: 'destructive',
      });
      console.error(error);
    }
  }

  async function handleCepBlur(e: React.FocusEvent<HTMLInputElement>) {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      setIsCepLoading(true);
      try {
        const address = await getAddressByCep(cep);
        if (address) {
          form.setValue('street', address.logradouro);
          form.setValue('neighborhood', address.bairro);
          form.setValue('city', address.localidade);
          form.setValue('state', address.uf);
        }
      } catch (error) {
        console.error(error);
      }
      setIsCepLoading(false);
    }
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
      <div className='flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12'>
        <div className='w-full max-w-md space-y-8'>
          <h2 className='text-center text-2xl font-bold'>
            {translate('register')}
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate('fullName')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={translate('fullNamePlaceholder')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        placeholder={translate('emailPlaceholder')}
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
                        {...field}
                        type='password'
                        autoComplete='new-password'
                        placeholder={translate('passwordPlaceholder')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate('confirmPassword')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='password'
                        autoComplete='new-password'
                        placeholder={translate('confirmPasswordPlaceholder')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='cep'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate('cep')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onBlur={handleCepBlur}
                        placeholder={translate('cepPlaceholder')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='street'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate('street')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={translate('streetPlaceholder')}
                        disabled={isCepLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='neighborhood'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate('neighborhood')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={translate('neighborhoodPlaceholder')}
                        disabled={isCepLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate('number')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={translate('numberPlaceholder')}
                        disabled={isCepLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate('city')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={translate('cityPlaceholder')}
                        disabled={isCepLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='state'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate('state')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={translate('statePlaceholder')}
                        disabled={isCepLoading}
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
                  ? translate('registering')
                  : translate('register')}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
