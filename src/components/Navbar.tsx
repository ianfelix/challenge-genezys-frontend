'use client';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const translate = useTranslations('Navbar');
  const { user, logout } = useAuth();

  return (
    <nav className='bg-background text-foreground p-4 border-b'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href='/home' className='text-xl font-bold'>
          {translate('appName')}
        </Link>
        <div className='flex items-center space-x-4'>
          <LanguageToggle />
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src='https://github.com/shadcn.png'
                  alt={user?.name || 'User'}
                />
                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>
                <button onClick={logout} className='flex items-center w-full'>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>{translate('logout')}</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
