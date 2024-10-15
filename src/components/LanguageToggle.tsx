'use client';

import * as React from 'react';
import { LanguagesIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Locale } from '@/lib/i18n/config';
import { useTranslations } from 'next-intl';
import { setUserLocale } from '@/utils/locale';

export function LanguageToggle() {
  const translate = useTranslations('LanguageToggle');

  const switchLanguage = (locale: Locale) => {
    setUserLocale(locale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <LanguagesIcon className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>{translate('toggleLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => switchLanguage('en-US')}>
          {translate('english')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage('pt-BR')}>
          {translate('portuguese')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
