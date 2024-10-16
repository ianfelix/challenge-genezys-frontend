import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import LoginForm from '../LoginForm';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/translations/en-US.json';
import '@testing-library/jest-dom/vitest';

// Mock the next/navigation module
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock the useToast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

const mockLoginAction = vi.fn();

describe('LoginForm', () => {
  beforeEach(() => {
    render(
      <NextIntlClientProvider messages={messages} locale='en'>
        <LoginForm loginAction={mockLoginAction} />
      </NextIntlClientProvider>
    );
  });

  it('renders the login form', () => {
    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByLabelText(/password/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /login/i })).toBeDefined();
  });

  it('should button be disabled if form is invalid', async () => {
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeDisabled();
  });
});
